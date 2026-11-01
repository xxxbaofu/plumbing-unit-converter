import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {build} from 'esbuild';
const root=fileURLToPath(new URL('../',import.meta.url)),out=path.join(root,'dist-web');fs.mkdirSync(out,{recursive:true});
fs.copyFileSync(path.join(root,'index.html'),path.join(out,'index.html'));
await build({entryPoints:[path.join(root,'src/standalone.tsx')],bundle:true,format:'esm',minify:true,outfile:path.join(out,'app.js'),jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'}});
console.log('Built standalone web converter: '+out);