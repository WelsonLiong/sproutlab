const {chromium}=require('C:/Users/Welson/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const http=require('node:http');
const root=path.resolve('dist');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.png':'image/png','.ttf':'font/ttf','.glb':'model/gltf-binary'};
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(data)})});
server.listen(4176,'127.0.0.1');
const mode=process.argv[2]||'after';
const output=path.resolve('.taste-skill',mode);
fs.mkdirSync(output,{recursive:true});
(async()=>{
 if(mode==='preview'){console.log('Sprout Lab garden preview: http://127.0.0.1:4176/');return}
 if(mode==='gate'){
  const {spawn}=require('node:child_process');
  const inspector='C:/Users/Welson/Documents/Codex/2026-10-28/is-the-3d-game-finished-can/.agents/skills/design-taste-frontend/scripts/inspect.mjs';
  for(const route of ['map','factory','lab']){
   const allowances=route==='map'?'eyebrow,mixed-font-headline':'icon-chips,mixed-font-headline';
   const args=[inspector,'http://127.0.0.1:4176/#'+route,'--out',path.join(output,route),'--allow',allowances,'--json'];
   if(route!=='map')args.push('--app');
   await new Promise(resolve=>{const child=spawn(process.execPath,args,{env:{...process.env,CHROME_PATH:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}});let log='';child.stdout.on('data',d=>log+=d);child.stderr.on('data',d=>log+=d);child.on('exit',code=>{fs.writeFileSync(path.join(output,route+'-inspector.txt'),log);console.log(route+': inspector exit '+code);resolve()})});
  }
  server.close();return;
 }
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',args:['--enable-unsafe-swiftshader']});
 const errors=[],report=[];
 const page=await browser.newPage();
 page.on('pageerror',e=>errors.push(e.message));
 for(const width of mode==='interactions'?[]:[1440,768,390]){
  await page.setViewportSize({width,height:900});
  for(const route of ['map','mystery','factory','story','lab','creek','detective','finish','journal','teacher','credits','certificate']){
   await page.goto('http://127.0.0.1:4176/#'+route,{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>!!document.querySelector('main h1'));
   await page.evaluate(()=>document.fonts.ready);
   await page.waitForTimeout(250);
   const metrics=await page.evaluate(()=>({route:document.body.dataset.route,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,title:document.querySelector('h1').textContent,buttons:[...document.querySelectorAll('button')].filter(b=>b.getBoundingClientRect().width&&b.getBoundingClientRect().height&&!b.disabled).length}));
   report.push(metrics);
   await page.screenshot({path:path.join(output,route+'-'+width+'.png'),fullPage:true});
  }
 }
 if(mode==='after'||mode==='interactions'){
  await page.setViewportSize({width:1440,height:900});
  await page.goto('http://127.0.0.1:4176/#mystery');
  await page.locator('[data-predict="make"]').click();
  assert.equal(await page.locator('[data-predict="make"]').getAttribute('aria-pressed'),'true');
  await page.goto('http://127.0.0.1:4176/#factory');
  assert(await page.locator('#play-leaf-video').isVisible());
  assert.equal(await page.locator('iframe').count(),0);
  await page.locator('#play-leaf-video').click();
  assert((await page.locator('iframe').getAttribute('src')).includes('DJnnWQehI50'));
  await page.locator('#journey-step').click();
  assert(await page.locator('#journey-step').isDisabled());
  await page.locator('#lesson-start').click();
  assert(await page.locator('#lesson-next').isEnabled());
  await page.locator('#lesson-next').click();
  assert((await page.locator('#demo-title').textContent()).includes('Step 2'));
  await page.screenshot({path:path.join(output,'factory-active-1440.png'),fullPage:true});
  for(let i=0;i<5;i++)await page.locator('#lesson-next').click();
  assert((await page.locator('#factory-visual h2').textContent()).includes('made food'));
  await page.goto('http://127.0.0.1:4176/#lab');
  await page.locator('[name="lab-prediction"][value="yes"]').check();
  await page.locator('#run-lab').click();
  assert((await page.locator('#lab-log').textContent()).includes('Yes'));
  await page.locator('[data-condition="light"]').uncheck();
  await page.locator('[name="lab-prediction"][value="no"]').check();
  await page.locator('#run-lab').click();
  assert((await page.locator('#lab-log tr').last().textContent()).includes('No'));
  await page.goto('http://127.0.0.1:4176/#detective');
  assert(await page.locator('#journey-step').isDisabled());
  await page.locator('[data-evidence="book"]').click();
  await page.locator('[data-evidence="nasa"]').click();
  await page.locator('#journey-step').click();
  await page.locator('[data-word="make"]').click();
  await page.locator('[data-word="photo"]').click();
  await page.locator('#repair-check').click();
  await page.locator('#journey-step').click();
  for(const key of ['name','address','password'])await page.locator('[data-redact="'+key+'"]').click();
  await page.locator('#privacy-check').click();
  assert((await page.locator('#privacy-feedback').textContent()).includes('Private details covered'));
  await page.goto('http://127.0.0.1:4176/#finish');
  await page.locator('#reflection').fill('Plants make their own food using light energy.');
  await page.locator('#save-reflection').click();
  await page.goto('http://127.0.0.1:4176/#journal');
  assert((await page.locator('.journal-note').textContent()).includes('Plants make their own food'));
  await page.reload();
  assert((await page.locator('.journal-note').textContent()).includes('Plants make their own food'));
  const download=page.waitForEvent('download');await page.locator('#download-journal').click();await download;
  await page.goto('http://127.0.0.1:4176/#lab');
  await page.locator('#settings').click();
  await page.locator('#reduce-motion').check();
  assert(await page.locator('body').evaluate(b=>b.classList.contains('reduce-motion')));
  await page.locator('#large-text').check();
  await page.locator('[data-close]').click();
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:path.join(output,'lab-large-reduced-390.png'),fullPage:true});
  await page.locator('#settings').click();
  await page.locator('#large-text').uncheck();
  await page.locator('#reduce-motion').uncheck();
  await page.locator('#low-data').check();
  assert.equal(await page.locator('body').evaluate(b=>getComputedStyle(b,':before').backgroundImage),'none');
  await page.locator('#low-data').uncheck();
  await page.locator('[data-close]').click();
  await page.goto('http://127.0.0.1:4176/#certificate');
  for(const width of [1440,768,390]){
   await page.setViewportSize({width,height:900});
   await page.screenshot({path:path.join(output,'certificate-'+width+'.png'),fullPage:true});
  }
  await page.goto('http://127.0.0.1:4176/#grove');
  await page.locator('#grove-title').waitFor();
  await page.waitForTimeout(6000);
  for(const width of [1440,768,390]){
   await page.setViewportSize({width,height:900});
   await page.screenshot({path:path.join(output,'grove-'+width+'.png'),fullPage:true});
  }
  await page.goto('http://127.0.0.1:4176/offline.html');
  await page.screenshot({path:path.join(output,'offline-390.png'),fullPage:true});
  await page.emulateMedia({media:'print'});
  assert(await page.locator('.controls').isHidden());
  await page.emulateMedia({media:'screen'});
  for(const route of ['map','mystery','factory','lab','creek','detective','finish','journal']){
   await page.setViewportSize({width:320,height:844});
   await page.goto('http://127.0.0.1:4176/#'+route);
   await page.waitForFunction(()=>!!document.querySelector('main h1'));
   const overflow=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,culprits:[...document.querySelectorAll('body *')].map(e=>({tag:e.tagName,cls:e.className,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right})).filter(r=>r.right>innerWidth+1||r.left< -1).slice(0,12)}));
   assert(overflow.scrollWidth<=overflow.width+1,route+' overflows at 320px '+JSON.stringify(overflow));
  }
 }
 fs.writeFileSync(path.join(output,'report.json'),JSON.stringify({errors,report},null,2));
 console.log(JSON.stringify({output,errors,overflow:report.filter(r=>r.overflow),pages:report.length}));
 await browser.close();
 server.close();
})().catch(e=>{console.error(e);server.close();process.exit(1)});
