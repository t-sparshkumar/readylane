/* Renders a token card (paper token + status + checklist + actions). Used by demo.html and status.html.
   All text comes from i18n.js, so it follows the EN / हिंदी toggle. */
(function(){
const T=(k,p)=>RL.t(k,p);
const stageIdx=t=>({checking:1,action:1,ready:2,held:2,called:3,serving:3,served:4}[t.state]);
const qc={};const qr=id=>qc[id]||(qc[id]=RL.qrSvg(RL.statusUrl(id),4));
const clock=t=>RL.simClock(t);
const PIC={docs:'📄',records:'🗂',approval:'✍',cash:'💰',sync:'👥'};
// pictogram per status: green / yellow / red / grey
const SIC={pass:'✅',running:'⏳',fail:'❌',pending:'⚪'};
function notify(n,t){
 const f=t.checks.find(c=>c.status==='fail');
 const p={id:t.id,c:n.counter,g:RL.GRACE_MIN,msg:f?RL.failText(f.fail,'msg'):''};
 if(!{action:1,called:1,held:1}[n.kind])return;
 const msg=T('n.'+n.kind,p);
 if(t.phone){RL.toast('sms',T('n.sms',{n:t.phone.slice(-4)}),RL.esc(msg));RL.toast('wa',T('n.wa'),RL.esc(msg))}
 else RL.toast('sys',n.kind==='called'?T('n.lobbyvoice'):T('n.lobby'),RL.esc(msg));
}
RL.TokenView=function(el,opts){
 opts=opts||{};let last='',seen=null;
 const view=function(st,t){
  if(!t){last='';el.innerHTML=opts.empty||'';return}
  if(opts.notify){if(!seen){seen=new Set((st.notices||[]).map(n=>n.k))}
   (st.notices||[]).forEach(n=>{if(seen.has(n.k))return;seen.add(n.k);if(n.id===t.id)notify(n,t)})}
  const esc=RL.esc,inr=RL.inr,si=stageIdx(t),eta=RL.eta(t),pos=RL.position(t);
  const mine=t.mine&&opts.interactive;
  const fail=t.checks.find(c=>c.status==='fail'),runningSync=t.checks.find(c=>c.type==='sync'&&c.status==='running');
  const passed=t.checks.filter(c=>c.status==='pass').length;
  const grace='<span class="grace-left" data-until="'+t.graceUntil+'">'+RL.graceLeft(t)+'</span>';
  const s=t.state,c=t.counter;
  const B={
   checking:['checking',T('tv.checking.h'),T('tv.checking.b',{p:passed,n:t.checks.length}),T('tv.checking.s')],
   action:['action',T('tv.action.h'),T('tv.action.b'),T('tv.action.s')],
   ready:['ready',T('tv.ready.h'),T('tv.ready.b'),t.cashCounter?T('tv.ready.sc',{c:t.cashCounter}):T('tv.ready.s')],
   called:['called',T('tv.called.h'),T('tv.called.b',{c}),t.mine?T('tv.called.s',{t:grace}):T('tv.called.so')],
   serving:['serving',T('tv.serving.h',{c}),T('tv.serving.b'),T('tv.serving.s')],
   served:['served',T('tv.served.h'),T('tv.served.b',{c}),T('tv.served.s',{m:t.servedAt-t.arrival})],
   held:['held',T('tv.held.h'),T('tv.held.b'),T('tv.held.s')],
  }[s];
  const strip=x=>String(x).replace(/<[^>]+>/g,'');
  const sayText=T('tv.say',{id:t.id.split('').join(' '),h:strip(B[1]),b:strip(B[2]),s:fail?RL.failText(fail.fail,'msg')+' '+RL.failText(fail.fail,'fix'):strip(B[3]).replace(/\d+:\d\d/,'')});
  const big='<div class="big-status '+B[0]+'" role="status"><div class="bs-top"><span>'+B[1]+'</span><button type="button" class="listen" data-speak-text="'+esc(sayText)+'" aria-label="'+T('listen.aria')+'">🔊 <span>'+T('listen')+'</span></button></div><h3>'+B[2]+'</h3><div class="bs-sub">'+B[3]+'</div></div>';
  const kp=s==='served'?'':'<div class="kpis"><div class="kpi"><b>'+(eta===0?T('tv.now'):T('tv.min',{m:eta}))+'</b><span>'+T('tv.eta')+'</span></div><div class="kpi"><b>'+(pos||'–')+'</b><span>'+T('tv.pos')+'</span></div><div class="kpi easy-hide"><b>'+t.overtakes+'/'+st.K+'</b><span>'+T('tv.ovt')+'</span></div></div>';
  const svForms=RL.formsFor?RL.formsFor(t.service):[];
  const checks='<ul class="checklist">'+t.checks.map((ck,i)=>{const cls=ck.status==='pending'?'':ck.status;
   let d=RL.ckDetail(ck);if(ck.status==='running'&&ck.awaiting)d=T('tv.awaiting');
   if(ck.status==='running'&&ck.type==='sync')d=T('tv.waitfor',{who:RL.whoText(ck)});
   if(ck.status==='fail')d=RL.failText(ck.fail,'msg');
   const form=ck.type==='docs'&&svForms[0]&&ck.status!=='pass'?' <a class="mini-dl" href="'+svForms[0].file+'" download target="_blank" rel="noopener">'+T('tv.formShort')+'</a>':'';
   return '<li class="check '+cls+'"><span class="ic" aria-hidden="true">'+PIC[ck.type]+'</span><div><div class="t">'+esc(RL.ckLabel(ck))+'</div><div class="d">'+esc(d)+form+'</div></div><span class="ck-st">'+T('tv.ck.'+(ck.status||'pending'))+'</span></li>'}).join('')+'</ul>';
  let act='';
  if(fail)act+='<div class="fixbox"><b>'+T('tv.howfix')+'</b> '+esc(RL.failText(fail.fail,'fix'))+
   '<div class="ctrls">'+(mine?'<button class="btn btn-sm btn-plum" data-a="fix">✔ '+esc(RL.failText(fail.fail,'lbl'))+'</button>':'')+
   (fail.type==='docs'&&svForms[0]?'<a class="btn btn-sm btn-gold" href="'+svForms[0].file+'" download target="_blank" rel="noopener">'+T('tv.form')+'</a>':'')+
   (mine?'<a class="btn btn-sm btn-light" href="mentor.html">'+T('tv.askmentor')+'</a>':'')+'</div></div>';
  if(mine&&runningSync)act+='<div class="ctrls"><button class="btn btn-sm btn-plum" data-a="co">'+T('tv.coarrived')+'</button></div>';
  if(mine&&s==='called')act+='<div class="ctrls"><button class="btn btn-sm btn-gold" data-a="here">🚶 '+T('tv.imat',{c})+'</button></div><p class="hint">'+T('tv.gracehint',{g:RL.GRACE_MIN})+' <a href="#" data-a="skip">'+T('tv.skip')+'</a></p>';
  if(mine&&s==='held')act+='<div class="ctrls"><button class="btn btn-sm btn-gold" data-a="back">↩ '+T('tv.back')+'</button></div>';
  if(mine&&s==='served'&&opts.againHref)act+='<div class="ctrls"><a class="btn btn-sm btn-plum" href="'+opts.againHref+'">🎟 '+T('tv.again')+'</a></div>';
  const stages='<div class="stages">'+[0,1,2,3,4].map(i=>'<div class="stage '+(i<si?'done':i===si?(s==='action'||s==='held'?'bad':s==='served'?'done':'now'):'')+'">'+T('stage.'+i)+'</div>').join('')+'</div>';
  const paper=opts.paper?'<div class="paper"><div><div style="font-size:.7rem;font-weight:700;color:var(--muted);letter-spacing:.08em">SMARTQ BANK · READYLANE</div><div class="num" aria-label="Token '+t.id+'">'+t.id+'</div><div style="font-weight:700;font-size:.85rem"><span aria-hidden="true">'+RL.SERVICES[t.service].icon+'</span> '+esc(RL.svcName(t.service))+(t.amount?' · '+inr(t.amount):'')+'</div>'+
   '<div class="meta"><span>'+T('tv.issued')+'</span><b>'+clock(t.arrival)+' '+T('tv.sim')+'</b><span>'+T('tv.alerts')+'</span><b>'+(t.phone?T('tv.alertsPhone',{n:esc(t.phone.slice(-2))}):T('tv.alertsLobby'))+'</b>'+(t.senior?'<span>'+T('tv.priority')+'</span><b>'+T('tv.seniorTag')+'</b>':'')+'</div></div>'+
   '<a class="qr" href="status.html?t='+encodeURIComponent(t.id)+'" target="_blank" title="'+T('tv.qrTitle')+'" aria-label="'+T('tv.qrTitle')+'">'+qr(t.id)+'</a></div>'+
   '<p class="hint" style="text-align:center;margin:12px 0 4px">'+T('tv.scanqr')+'</p>':'';
  const html=paper+big+kp+stages+'<div style="height:14px"></div>'+checks+act;
  if(html===last)return;last=html;el.innerHTML=html;
  el.querySelectorAll('[data-a]').forEach(b=>b.onclick=(ev)=>{ev.preventDefault();const a=b.dataset.a;
   if(a==='fix')RL.fixMine();if(a==='co')RL.coHolderArrived();if(a==='here')RL.atCounter();if(a==='back')RL.imBack();if(a==='skip')RL.skipGrace()});
 };
 return view;
};
})();
