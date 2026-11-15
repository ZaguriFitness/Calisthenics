// node h/thumbs.js part nparts : renders the peak pose of every exercise to raw PNGs in h/thraw/
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs');const SP='/tmp/claude-0/-home-user-Calisthenics/e71b6822-b6d0-5559-8f25-ee6c3a5c9018/scratchpad';
const [part,np]=process.argv.slice(2).map(Number);fs.mkdirSync(SP+'/h/thraw',{recursive:true});
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
  const ctx=await b.newContext({viewport:{width:500,height:500}});
  await ctx.route('https://cdnjs.cloudflare.com/**',r=>r.fulfill({path:SP+'/three/package/build/three.min.js',contentType:'application/javascript'}));
  const p=await ctx.newPage();await p.goto('http://localhost:8765/');await p.waitForTimeout(500);
  const list=await p.evaluate(()=>{const seen=new Set(),out=[];for(const c of DATA)for(const t of c.tracks)for(const l of t.ladders)for(const s of l.steps){const k=thumbKey(s.ex,!!s.ring);if(!seen.has(k)){seen.add(k);out.push([s.ex,!!s.ring,k]);}}return out;});
  const mine=list.filter((_,i)=>i%np===part);
  for(const [ex,ring,key] of mine){
    const url=await p.evaluate(async([ex,ring])=>{const D=TD.dbg;await D.load();const M=await D.loadModel();
      let step=null;for(const c of DATA)for(const t of c.tracks)for(const l of t.ladders){const x=l.steps.find(z=>z.ex===ex);if(x&&!step)step=x;}
      const h=document.createElement('div');h.style.width='480px';document.body.appendChild(h);
      const B=D.build(h,ILLV.frames3d(ex,ring),{model:M,act:D.muscleAct(step,M.meta.groups),neg:/Negative/i.test(ex),fwd:D.ONEWAY.test(ex),fg:ring&&/False Grip|Muscle-Up|Ring Transition/i.test(ex)});
      // play up to the peak so the smooth fades settle, then take the still
      const T=B.peak;for(let x=0;x<=T;x+=Math.max(0.05,T/40)) B.shot(x);
      const u=B.shot(T);B.stop();h.remove();return u;},[ex,ring]);
    fs.writeFileSync(SP+'/h/thraw/'+key+'.png',Buffer.from(url.split(',')[1],'base64'));
    console.log('ok',key);}
  await b.close();})();
