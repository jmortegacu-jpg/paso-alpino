#!/usr/bin/env node
// Lightweight, dependency-free regression guards for Costa Rica scenery.
// Run: node --check graphics/costa-rica-tracks.js && node tests/cr-scenery-guards.mjs
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const source = readFileSync(new URL('../graphics/costa-rica-tracks.js', import.meta.url), 'utf8');
const checks = [
  ['exports scenery function', /export\s+function\s+addCostaRicaScenery\s*\(/],
  ['all six themes available', /'zurqui','costanera','puntarenas','ruta1','ruta2','ruta27'/],
  ['adaptive quality branches', /quality==='alta'\|\|quality==='cine'/],
  ['geometry based on existing centerline', /const\s+node\s*=\s*\(/],
  ['instancing for roadside vegetation', /new\s+THREE\.InstancedMesh\s*\(/],
  ['PBR materials used', /new\s+THREE\.Mesh(?:Standard|Physical)Material\s*\(/],
  ['no remote images or textures injected', /^(?![\s\S]*(?:https?:\/\/|TextureLoader\s*\(|fetch\s*\()).*$/s],
];
let failures=0;
for(const [label,regex] of checks){
  const pass=regex.test(source);
  console.log(`${pass?'PASS':'FAIL'} ${label}`);
  if(!pass) failures++;
}
try {
  execFileSync(process.execPath, ['--check', fileURLToPath(new URL('../graphics/costa-rica-tracks.js', import.meta.url))], {stdio:'pipe'});
  console.log('PASS JavaScript syntax');
} catch(e) { console.error('FAIL JavaScript syntax', e.stderr?.toString() || e.message); failures++; }
assert.equal(failures,0,`${failures} scenery regression guard(s) failed`);
console.log('Static checks passed. Not a substitute for WebGL/FPS/driving/multiplayer tests.');
