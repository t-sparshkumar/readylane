/* Shared UI: nav (with language + easy-mode toggles), footer, toasts, QR helper, picture steps.
   Needs i18n.js to be loaded first. */
(function(){
const t=(k,p)=>RL.t(k,p);
const MARK='<svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="#FFD24D"/><path d="M9 31h22" stroke="#5A124C" stroke-width="3" stroke-linecap="round" opacity=".35"/><path d="M11 19.5l6 6L30 11" fill="none" stroke="#5A124C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
// customer pages first, then the presentation / staff pages
const PAGES=[['index.html','index','🏠'],['demo.html','demo','🎟'],['status.html','status','▦'],['documents.html','documents','📄'],['mentor.html','mentor','💬'],['lobby.html','lobby','📺'],['staff.html','staff','🧑‍💼']];
const brand=()=>MARK+'<span>ReadyLane<small>'+t('brand.by')+'</small></span>';
function tools(){
  return '<div class="nav-tools"><div class="lang-toggle" role="group" aria-label="Language / भाषा">'+
   '<button type="button" data-lang="en" lang="en" aria-label="English">EN</button><button type="button" data-lang="hi" lang="hi" aria-label="हिंदी">हिंदी</button></div></div>';
}
function nav(){
  const here=(location.pathname.split('/').pop()||'index.html');
  const el=document.getElementById('nav');if(!el)return;
  const open=el.querySelector('.nav-links.open');
  el.className='nav';
  el.innerHTML='<div class="container"><a class="brand" href="index.html">'+brand()+'</a>'+
   '<nav class="nav-links'+(open?' open':'')+'" aria-label="Main">'+
   PAGES.map(([h,k,ic])=>'<a href="'+h+'"'+(here===h?' class="active" aria-current="page"':'')+'><span class="ni" aria-hidden="true">'+ic+'</span>'+t('nav.'+k)+'</a>').join('')+'</nav>'+
   tools()+'<button class="nav-toggle" aria-label="'+t('nav.menu')+'" aria-expanded="'+(!!open)+'">☰</button></div>';
  el.querySelector('.nav-toggle').onclick=e=>{const o=el.querySelector('.nav-links').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)};
  el.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{RL.setLang(b.dataset.lang);toast('sys',t('lang.switched'),'')});
  RL.syncUI();
}
function footer(){
  const el=document.getElementById('footer');if(!el)return;
  el.innerHTML='<div class="container"><div><a class="brand" href="index.html" style="margin-bottom:8px">'+brand()+'</a>'+
  '<div>'+t('foot.tag')+'</div><div style="font-size:.8rem;margin-top:6px;opacity:.7">'+t('foot.note')+'</div></div>'+
  '<div>'+PAGES.map(([h,k])=>'<a href="'+h+'">'+t('nav.'+k)+'</a>').join('')+'</div></div>';
}
function toast(kind,title,body){
  let box=document.querySelector('.toasts');if(!box){box=document.createElement('div');box.className='toasts';box.setAttribute('role','status');box.setAttribute('aria-live','polite');document.body.appendChild(box)}
  const icons={sms:'✉',wa:'✆',sys:'🔔'};
  const el=document.createElement('div');el.className='toast '+kind;
  el.innerHTML='<div class="ti">'+(icons[kind]||'🔔')+'</div><div><b>'+title+'</b>'+body+'</div>';
  box.appendChild(el);while(box.children.length>3)box.firstChild.remove();setTimeout(()=>{el.style.transition='.4s';el.style.opacity='0';setTimeout(()=>el.remove(),400)},5500);
}
function qrSvg(text,cell){
  if(typeof qrcode==='undefined')return '';
  const q=qrcode(0,'M');q.addData(text);q.make();
  return q.createSvgTag({cellSize:cell||4,margin:2,scalable:true});
}
function statusUrl(id){return new URL('status.html?t='+encodeURIComponent(id),location.href).href}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
/* 4 picture steps for people who don't read well. Rendered into any element with class "pic-steps". */
function steps(){
  document.querySelectorAll('.pic-steps').forEach(el=>{
    const S=[['👆','steps.1'],['🎟','steps.2'],['🪑','steps.3'],['🔔','steps.4']];
    el.innerHTML='<div class="ps-head"><b>'+t('steps.title')+'</b><button type="button" class="listen" data-speak-text="'+esc(t('steps.say'))+'" aria-label="'+t('listen.aria')+'">🔊 <span>'+t('listen')+'</span></button></div>'+
     '<ol class="ps-list">'+S.map(([ic,k],i)=>'<li><span class="ps-n">'+(i+1)+'</span><span class="ps-ic" aria-hidden="true">'+ic+'</span><span class="ps-t">'+t(k)+'</span></li>').join('<li class="ps-arrow" aria-hidden="true">➜</li>')+'</ol>';
  });
}
window.RL=Object.assign(window.RL||{},{MARK,toast,qrSvg,statusUrl,esc,renderSteps:steps});
function shell(){nav();footer();steps()}
document.addEventListener('DOMContentLoaded',shell);
RL.onLang(shell);
// live mm:ss countdowns (kept out of the main render so buttons are not re-created every second)
setInterval(()=>document.querySelectorAll('.grace-left').forEach(el=>{const ms=Math.max(0,+el.dataset.until-Date.now());el.textContent=Math.floor(ms/60000)+':'+String(Math.floor(ms%60000/1000)).padStart(2,'0')}),500);
})();
