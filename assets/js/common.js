/* Shared UI: nav, footer, toasts, QR helper */
(function(){
const MARK='<svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="#FFD24D"/><path d="M9 31h22" stroke="#5A124C" stroke-width="3" stroke-linecap="round" opacity=".35"/><path d="M11 19.5l6 6L30 11" fill="none" stroke="#5A124C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const PAGES=[['index.html','Overview'],['demo.html','Customer demo'],['status.html','Token status'],['lobby.html','Lobby display'],['staff.html','Staff dashboard'],['mentor.html','Mentor']];
function nav(){
  const here=(location.pathname.split('/').pop()||'index.html');
  const el=document.getElementById('nav');if(!el)return;
  el.className='nav';
  el.innerHTML='<div class="container"><a class="brand" href="index.html">'+MARK+'<span>ReadyLane<small>by SmartQ Bank</small></span></a>'+
   '<button class="nav-toggle" aria-label="Menu">☰</button><nav class="nav-links">'+
   PAGES.map(([h,l])=>'<a href="'+h+'"'+(here===h?' class="active"':'')+'>'+l+'</a>').join('')+'</nav></div>';
  el.querySelector('.nav-toggle').onclick=()=>el.querySelector('.nav-links').classList.toggle('open');
}
function footer(){
  const el=document.getElementById('footer');if(!el)return;
  el.innerHTML='<div class="container"><div><a class="brand" href="index.html" style="margin-bottom:8px">'+MARK+'<span>ReadyLane<small>by SmartQ Bank</small></span></a>'+
  '<div>The queue that only calls you when your work is already done.</div><div style="font-size:.8rem;margin-top:6px;opacity:.7">MVP prototype · simulated data only · Presented by Mansi</div></div>'+
  '<div>'+PAGES.map(([h,l])=>'<a href="'+h+'">'+l+'</a>').join('')+'</div></div>';
}
function toast(kind,title,body){
  let box=document.querySelector('.toasts');if(!box){box=document.createElement('div');box.className='toasts';document.body.appendChild(box)}
  const icons={sms:'✉',wa:'✆',sys:'🔔'};
  const t=document.createElement('div');t.className='toast '+kind;
  t.innerHTML='<div class="ti">'+(icons[kind]||'🔔')+'</div><div><b>'+title+'</b>'+body+'</div>';
  box.appendChild(t);while(box.children.length>3)box.firstChild.remove();setTimeout(()=>{t.style.transition='.4s';t.style.opacity='0';setTimeout(()=>t.remove(),400)},5500);
}
function qrSvg(text,cell){
  if(typeof qrcode==='undefined')return '';
  const q=qrcode(0,'M');q.addData(text);q.make();
  return q.createSvgTag({cellSize:cell||4,margin:2,scalable:true});
}
function statusUrl(id){return new URL('status.html?t='+encodeURIComponent(id),location.href).href}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
window.RL=Object.assign(window.RL||{},{MARK,toast,qrSvg,statusUrl,esc});
document.addEventListener('DOMContentLoaded',()=>{nav();footer()});
// live mm:ss countdowns (kept out of the main render so buttons are not re-created every second)
setInterval(()=>document.querySelectorAll('.grace-left').forEach(el=>{const ms=Math.max(0,+el.dataset.until-Date.now());el.textContent=Math.floor(ms/60000)+':'+String(Math.floor(ms%60000/1000)).padStart(2,'0')}),500);
})();
