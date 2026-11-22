const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs');const SP='/tmp/claude-0/-home-user-Calisthenics/e71b6822-b6d0-5559-8f25-ee6c3a5c9018/scratchpad';
const F=[["pull","Standing Calf Raise",["lats","rhomboids","traps","delts_rear","biceps"],Math.PI,0.15,0.68,0.45],
 ["push","Standing Calf Raise",["chest","delts_front","triceps"],0,0.12,0.7,0.42],
 ["legs","Standing Calf Raise",["quads","glutes","hamstrings","calves","adductors"],0.5,0.08,0.3,0.78],
 ["core","Standing Calf Raise",["abs","obliques","serratus"],0,0.05,0.55,0.42],
 ["skill","Freestanding Handstand",["delts_front","delts_side","triceps","traps","abs"],0.4,0.1,0.42,0.55]];
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
  const ctx=await b.newContext({viewport:{width:700,height:700}});
  await ctx.route('https://cdnjs.cloudflare.com/**',r=>r.fulfill({path:SP+'/three/package/build/three.min.js',contentType:'application/javascript'}));
  const p=await ctx.newPage();await p.goto('http://localhost:8765/');
  for(const [name,ex,mus,az,el,ty,df] of F){
    const url=await p.evaluate(async([ex,mus,az,el,ty,df])=>{const D=TD.dbg;await D.load();const M=await D.loadModel();
      const a=new Float32Array(32);for(const m of mus){const i=M.meta.groups.indexOf(m);if(i>0)a[i]=1;}
      const h=document.createElement('div');h.style.width='680px';document.body.appendChild(h);
      const B=D.build(h,ILLV.frames3d(ex,false),{model:M,act:a,h:680});
      for(let x=0;x<10;x++)B.shot(0.02);
      const ys=[],c=new THREE.Vector3(),q=new THREE.Vector3();let n=0;for(const k in B.Mo.bones){B.Mo.bones[k].getWorldPosition(q);if(isFinite(q.y)){ys.push(q.y);c.add(q);n++;}}c.multiplyScalar(1/n);const lo=Math.min(...ys),hi=Math.max(...ys),H=(hi-lo)*1.12;
      c.y=lo+H*ty;const u=B.zoom(c,B.az0+az,el,H*df*1.6);B.stop();h.remove();return u;},[ex,mus,az,el,ty,df]);
    fs.writeFileSync(SP+'/wh/'+name+'.png',Buffer.from(url.split(',')[1],'base64'));console.log('ok',name);}
  await b.close();})();
