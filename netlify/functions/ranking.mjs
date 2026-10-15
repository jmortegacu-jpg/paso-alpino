// Ranking mundial de Paso Alpino (función de Netlify).
// GET  /api/ranking?pista=lago&vueltas=3   → los 10 mejores tiempos de esa pista y cantidad de vueltas.
// POST /api/ranking {pista, vueltas, t, n, c, id} → guarda la mejor marca de cada jugador y devuelve su puesto.
// Solo pistas del juego (no pistas propias). Se descartan tiempos imposibles (más de 100 m/s de promedio).
import { getStore } from "@netlify/blobs";

const LARGO = { alpino: 3722, lago: 3693, cumbre: 2803 };   // metros por vuelta
const VUELTAS = [1, 2, 3, 5, 10];
const MAX_LISTA = 200;
const json = (o, status = 200) => new Response(JSON.stringify(o), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const limpiarNombre = s => String(s ?? "").replace(/[\u0000-\u001f\u007f-\u009f\u00ad\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff]/g, "").trim().slice(0, 14) || "Piloto";
const publico = e => ({ n: e.n, t: e.t, c: e.c });

export async function handle(req, store) {
  const url = new URL(req.url);
  if (req.method === "GET") {
    const p = url.searchParams.get("pista"), v = Number(url.searchParams.get("vueltas"));
    if (!LARGO[p] || !VUELTAS.includes(v)) return json({ ok: false }, 400);
    const lista = (await store.get(`rank-${p}-${v}`, { type: "json" })) || [];
    return json({ ok: true, top: lista.slice(0, 10).map(publico), total: lista.length });
  }
  if (req.method === "POST") {
    let b = {};
    try { b = await req.json(); } catch {}
    const p = b.pista, v = Number(b.vueltas), t = Math.round(Number(b.t));
    const id = String(b.id || "").replace(/[^a-z0-9]/gi, "").slice(0, 24);
    if (!LARGO[p] || !VUELTAS.includes(v) || id.length < 8 || !Number.isFinite(t)) return json({ ok: false }, 400);
    const minimo = (LARGO[p] * v / 100) * 1000;           // promedio de 360 km/h: imposible bajar de aquí
    if (t < minimo || t > 60 * 60 * 1000) return json({ ok: false, motivo: "tiempo no válido" }, 400);
    const color = typeof b.c === "string" && /^#[0-9a-f]{6}$/i.test(b.c) ? b.c : "#8a929b";
    const clave = `rank-${p}-${v}`;
    const lista = (await store.get(clave, { type: "json" })) || [];
    const i = lista.findIndex(e => e.id === id);
    let mejoro = false;
    if (i < 0) { lista.push({ id, n: limpiarNombre(b.n), t, c: color, d: Date.now() }); mejoro = true; }
    else {
      lista[i].n = limpiarNombre(b.n); lista[i].c = color;
      if (t < lista[i].t) { lista[i].t = t; lista[i].d = Date.now(); mejoro = true; }
    }
    lista.sort((a, z) => a.t - z.t);
    lista.length = Math.min(lista.length, MAX_LISTA);
    await store.setJSON(clave, lista);
    const pos = lista.findIndex(e => e.id === id) + 1;
    const mia = lista[pos - 1];
    return json({ ok: true, pos: pos || null, total: lista.length, improved: mejoro, best: mia ? mia.t : t, top: lista.slice(0, 10).map(publico) });
  }
  return json({ ok: false }, 405);
}

export default async (req) => handle(req, getStore({ name: "paso-alpino", consistency: "strong" }));
export const config = { path: "/api/ranking" };
