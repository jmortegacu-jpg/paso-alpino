// Contador de visitas de Paso Alpino (función de Netlify).
// POST /api/visita        → el juego avisa cada 30 s que sigue abierto (y si es una visita nueva).
// GET  /api/estadisticas  → resumen para el panel: personas ahora, jugando, salas, visitas de hoy y totales.
// Los datos se guardan en Netlify Blobs; no se guarda información personal, solo un identificador al azar por navegador.
import { getStore } from "@netlify/blobs";

const ONLINE_MS = 75_000;          // sin señal por 75 s = ya no está conectado
const hoyCR = (t = Date.now()) => new Date(t).toLocaleDateString("en-CA", { timeZone: "America/Costa_Rica" });
const json = (o, status = 200) => new Response(JSON.stringify(o), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

function resumen(online, stats, now) {
  const act = Object.values(online).filter(v => v && now - v.t < ONLINE_MS);
  const salas = new Set(act.filter(v => v.s).map(v => v.s));
  const out = { ahora: act.length, jugando: act.filter(v => v.j).length, enLinea: act.filter(v => v.l).length, salas: salas.size, comoApp: act.filter(v => v.a).length };
  if (stats) {
    out.hoy = (stats.dias && stats.dias[hoyCR(now)]) || 0; out.total = stats.total || 0; out.dias = stats.dias || {};
    // instalaciones: la primera vez que un teléfono o computadora abre el juego como app instalada
    out.instalaciones = stats.inst || 0; out.instHoy = (stats.instDias && stats.instDias[hoyCR(now)]) || 0; out.instDias = stats.instDias || {};
    out.jugadores = stats.unicos || 0;
    // quién está conectado (solo el apodo que cada jugador escribió y qué está haciendo)
    out.quienes = act.sort((a, b) => (b.l - a.l) || (b.j - a.j) || (b.t - a.t)).slice(0, 60).map(v => ({ n: v.n || "", j: v.j, l: v.l, s: v.s, a: v.a || 0 }));
  }
  return out;
}

export async function handle(req, store, now = Date.now()) {
  const path = new URL(req.url).pathname;
  if (req.method === "POST" && path.endsWith("/visita")) {
    let b = {};
    try { b = await req.json(); } catch {}
    const id = String(b.id || "").replace(/[^a-z0-9]/gi, "").slice(0, 24);
    if (id.length < 8) return json({ ok: false }, 400);
    const online = (await store.get("online", { type: "json" })) || {};
    for (const k of Object.keys(online)) if (!online[k] || now - online[k].t > ONLINE_MS * 4) delete online[k];
    const apodo = typeof b.n === "string" ? b.n.replace(/[^\p{L}\p{N} ._'-]/gu, "").replace(/\s+/g, " ").trim().slice(0, 14) : "";
    online[id] = { t: now, n: apodo, j: b.jugando ? 1 : 0, l: b.enLinea ? 1 : 0, s: typeof b.sala === "string" ? b.sala.replace(/[^A-Z0-9]/g, "").slice(0, 4) : "", a: b.app ? 1 : 0 };
    await store.setJSON("online", online);
    if (b.nueva || b.instalada || b.primera) {
      const st = (await store.get("stats", { type: "json" })) || { total: 0, dias: {} };
      const d = hoyCR(now);
      const sumar = (clave) => { st[clave] = st[clave] || {}; st[clave][d] = (st[clave][d] || 0) + 1;
        const ks = Object.keys(st[clave]).sort(); while (ks.length > 90) delete st[clave][ks.shift()]; };
      if (b.nueva) { st.total = (st.total || 0) + 1; sumar("dias"); }
      if (b.primera) st.unicos = (st.unicos || 0) + 1;           // un navegador que nunca había abierto el juego
      if (b.instalada) { st.inst = (st.inst || 0) + 1; sumar("instDias"); }   // primera apertura como app instalada
      await store.setJSON("stats", st);
    }
    return json({ ok: true, ...resumen(online, null, now) });
  }
  if (req.method === "GET" && path.endsWith("/estadisticas")) {
    const [online, stats] = await Promise.all([store.get("online", { type: "json" }), store.get("stats", { type: "json" })]);
    return json({ ok: true, ...resumen(online || {}, stats || { total: 0, dias: {} }, now) });
  }
  return json({ ok: false }, 404);
}

export default async (req) => handle(req, getStore({ name: "paso-alpino", consistency: "strong" }));
export const config = { path: ["/api/visita", "/api/estadisticas"] };
