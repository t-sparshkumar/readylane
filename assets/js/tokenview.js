/* Renders a token card (paper token + status + checklist + actions). Used by demo.html and status.html. */
(function(){
const STAGES=['Issued','Preparing','Ready','Called','Served'];
const stageIdx=t=>({checking:1,action:1,ready:2,held:2,called:3,serving:3,served:4}[t.state]);
const qc={};const qr=id=>qc[id]||(qc[id]=RL.qrSvg(RL.statusUrl(id),4));
const clock=t=>RL.simClock(t);
function notify(n,t){
 const f=t.checks.find(c=>c.status==='fail');
 const msg={action:'ReadyLane: Token '+t.id+' needs action. '+(f?f.fail.msg:'')+' Open your token page to fix it.',
  called:'ReadyLane: Token '+t.id+', you\'re ready! Please go to Counter '+n.counter+' within '+RL.GRACE_MIN+' min.',
  held:'ReadyLane: Token '+t.id+' is on hold and you keep your place. Tap "I\'m back" when you return.'}[n.kind];
 if(!msg)return;
 if(t.phone){RL.toast('sms','SMS to ••'+t.phone.slice(-4)+' (simulated)',RL.esc(msg));RL.toast('wa','WhatsApp (simulated)',RL.esc(msg))}
 else RL.toast('sys',n.kind==='called'?'Lobby screen + voice announcement':'Lobby screen',RL.esc(msg));
}
RL.TokenView=function(el,opts){
 opts=opts||{};let last='',seen=null;
 return function(st,t){
  if(!t){last='';el.innerHTML=opts.empty||'';return}
  if(opts.notify){if(!seen){seen=new Set((st.notices||[]).map(n=>n.k))}
   (st.notices||[]).forEach(n=>{if(seen.has(n.k))return;seen.add(n.k);if(n.id===t.id)notify(n,t)})}
  const esc=RL.esc,inr=RL.inr,sv=RL.SERVICES[t.service],si=stageIdx(t),eta=RL.eta(t),pos=RL.position(t);
  const mine=t.mine&&opts.interactive;
  const fail=t.checks.find(c=>c.status==='fail'),runningSync=t.checks.find(c=>c.type==='sync'&&c.status==='running');
  const passed=t.checks.filter(c=>c.status==='pass').length;
  const B={
   checking:['checking','⏳ Preparing your work',passed+' of '+t.checks.length+' checks done','Relax, we\'ll call you when you\'re ready.'],
   action:['action','⚠ Action needed','Fix this before the counter','You keep your place in the queue.'],
   ready:['ready','✅ All checks passed','You\'re ready!','Waiting for a free counter'+(t.cashCounter?' (your cash is at Counter '+t.cashCounter+')':'')+'.'],
   called:['called','🔔 It\'s your turn','Go to Counter '+t.counter,(t.mine?'Grace window: <span class="grace-left" data-until="'+t.graceUntil+'">'+RL.graceLeft(t)+'</span> left (real time)':'Please proceed to the counter')],
   serving:['serving','🧾 At Counter '+t.counter,'Being served','The teller already has your prepared file.'],
   served:['served','🎉 Done','Served at Counter '+t.counter,'Time from token to done: '+(t.servedAt-t.arrival)+' min (simulated)'],
   held:['held','⏸ On hold','You missed your call','You haven\'t lost your place. Tap "I\'m back" and you\'ll be called at the next free counter.'],
  }[t.state];
  const big='<div class="big-status '+B[0]+'"><div>'+B[1]+'</div><h3>'+B[2]+'</h3><div style="font-size:.85rem">'+B[3]+'</div></div>';
  const kp=t.state==='served'?'':'<div class="kpis"><div class="kpi"><b>'+(eta===0?'Now':'~'+eta+' min')+'</b><span>Est. call</span></div><div class="kpi"><b>'+(pos||'–')+'</b><span>Queue position</span></div><div class="kpi"><b>'+t.overtakes+'/'+st.K+'</b><span>Times overtaken</span></div></div>';
  const checks='<ul class="checklist">'+t.checks.map((c,i)=>{const cls=c.status==='pending'?'':c.status;
   const ic=c.status==='pass'?'✓':c.status==='fail'?'!':c.status==='running'?'':(i+1);
   let d=c.detail;if(c.status==='running'&&c.awaiting)d='Waiting for the officer\'s decision (approved from the staff dashboard)…';
   if(c.status==='running'&&c.type==='sync')d='Waiting for the '+c.waitFor+' to check in at the kiosk or scan this QR';
   if(c.status==='fail')d=c.fail.msg;
   return '<li class="check '+cls+'"><span class="ic">'+ic+'</span><div><div class="t">'+esc(c.label)+'</div><div class="d">'+esc(d)+'</div></div></li>'}).join('')+'</ul>';
  let act='';
  if(fail)act+='<div class="fixbox"><b>How to fix:</b> '+esc(fail.fail.fix)+(mine?'<div class="ctrls"><button class="btn btn-sm btn-plum" data-a="fix">'+esc(fail.fail.fixLabel)+'</button><a class="btn btn-sm btn-light" href="mentor.html">Ask the mentor</a></div>':'')+'</div>';
  if(mine&&runningSync)act+='<div class="ctrls"><button class="btn btn-sm btn-plum" data-a="co">👥 Co-holder has arrived (simulate)</button></div>';
  if(mine&&t.state==='called')act+='<div class="ctrls"><button class="btn btn-sm btn-gold" data-a="here">I\'m at Counter '+t.counter+'</button></div><p class="hint">If you don\'t reach the counter within '+RL.GRACE_MIN+' min, you go on hold and keep your place. <a href="#" data-a="skip">Demo: skip to grace expiry</a></p>';
  if(mine&&t.state==='held')act+='<div class="ctrls"><button class="btn btn-sm btn-gold" data-a="back">I\'m back in the branch</button></div>';
  if(mine&&t.state==='served'&&opts.againHref)act+='<div class="ctrls"><a class="btn btn-sm btn-plum" href="'+opts.againHref+'">Take another token</a></div>';
  const stages='<div class="stages">'+STAGES.map((s,i)=>'<div class="stage '+(i<si?'done':i===si?(t.state==='action'||t.state==='held'?'bad':t.state==='served'?'done':'now'):'')+'">'+s+'</div>').join('')+'</div>';
  const paper=opts.paper?'<div class="paper"><div><div style="font-size:.7rem;font-weight:700;color:var(--muted);letter-spacing:.08em">SMARTQ BANK · READYLANE</div><div class="num">'+t.id+'</div><div style="font-weight:700;font-size:.85rem">'+esc(sv.name)+(t.amount?' · '+inr(t.amount):'')+'</div>'+
   '<div class="meta"><span>Issued</span><b>'+clock(t.arrival)+' (sim)</b><span>Alerts</span><b>'+(t.phone?'SMS + WhatsApp ••'+esc(t.phone.slice(-2)):'Lobby screen + voice')+'</b>'+(t.senior?'<span>Priority</span><b>Senior / PwD</b>':'')+'</div></div>'+
   '<a class="qr" href="status.html?t='+encodeURIComponent(t.id)+'" target="_blank" title="Open token status page">'+qr(t.id)+'</a></div>'+
   '<p class="hint" style="text-align:center;margin:12px 0 4px">Paper token: scan the QR (or tap it) for live status</p>':'';
  const html=paper+big+kp+stages+'<div style="height:14px"></div>'+checks+act;
  if(html===last)return;last=html;el.innerHTML=html;
  el.querySelectorAll('[data-a]').forEach(b=>b.onclick=(ev)=>{ev.preventDefault();const a=b.dataset.a;
   if(a==='fix')RL.fixMine();if(a==='co')RL.coHolderArrived();if(a==='here')RL.atCounter();if(a==='back')RL.imBack();if(a==='skip')RL.skipGrace()});
 };
};
})();
