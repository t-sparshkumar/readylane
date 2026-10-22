/* ReadyLane simulation engine (shared by every page).
   One engine state lives in localStorage so the demo, token-status, lobby and staff pages
   all show the SAME tokens, counters and statuses. Whichever open page holds the "driver"
   lock advances the clock; the others just render the latest snapshot.
   Simulated data only: names are fictional, no backend. 1 tick = 1 simulated minute. */
(function(){
const LS_STATE='readylane.state.v2', LS_DRIVER='readylane.driver.v2';
const TELLER_LIMIT=200000;          // officer pre-approval above this (bank policy, illustrative)
const PAN_CASH_LIMIT=50000;         // PAN / Form 60 needed for cash deposit above ₹50,000 (IT Rule 114B)
const GRACE_MIN=5;                   // grace window after being called
const AVG_SVC=4;                     // avg counter minutes, for ETA

const inr=n=>'₹'+Number(n).toLocaleString('en-IN');

/* ---------- Service catalogue ---------- */
const SERVICES={
  cash_withdrawal:{name:'Cash withdrawal',prefix:'C',icon:'💵',svc:3,amount:true,joint:true,
    blurb:'Withdraw cash from your account using a withdrawal slip or cheque.',
    problem:{type:'docs',msg:'Amount in words does not match the figure on your withdrawal slip.',fix:'Fill a fresh slip at the kiosk and re-scan',fixLabel:'I re-scanned a corrected slip'}},
  cash_deposit:{name:'Cash deposit',prefix:'C',icon:'🏦',svc:3,amount:true,
    blurb:'Deposit cash into a savings or current account.',
    problem:{type:'docs',msg:'PAN not provided. PAN (or Form 60) is mandatory for cash deposits above ₹50,000.',fix:'Upload a photo of your PAN card or fill Form 60 at the kiosk',fixLabel:'I uploaded my PAN card',needsAmountAbove:PAN_CASH_LIMIT,
      altMsg:'Account number on the deposit slip is unreadable.',altFix:'Re-write the slip at the kiosk and re-scan',altFixLabel:'I re-scanned the slip'}},
  account_opening:{name:'Open savings account',prefix:'A',icon:'🪪',svc:8,joint:true,
    blurb:'Open a new savings account (single or joint).',
    problem:{type:'docs',msg:'PAN card copy is missing from your application.',fix:'Upload your PAN card, or fill Form 60 if you do not have a PAN',fixLabel:'I uploaded my PAN card'}},
  kyc_update:{name:'KYC update (re-KYC)',prefix:'A',icon:'🔁',svc:4,
    blurb:'Periodic KYC update with a fresh officially valid document.',
    problem:{type:'docs',msg:'Aadhaar scan is unclear (part of the card is cut off).',fix:'Re-scan the full card at the kiosk',fixLabel:'I re-scanned my Aadhaar'}},
  address_change:{name:'Address change',prefix:'A',icon:'🏠',svc:4,
    blurb:'Update the communication address on your account.',
    problem:{type:'docs',msg:'Electricity bill is older than 2 months, so it cannot be accepted as address proof.',fix:'Upload a recent bill, or use Aadhaar / passport with the new address',fixLabel:'I uploaded a valid address proof'}},
  demand_draft:{name:'Demand draft (DD)',prefix:'R',icon:'📄',svc:4,amount:true,
    blurb:'Issue a DD debited from your account (needs payee name and "payable at" city).',
    problem:{type:'docs',msg:'"Payable at" city is missing on your DD application.',fix:'Complete the payee details on the form and re-scan',fixLabel:'I completed the payee details'}},
  fixed_deposit:{name:'Fixed deposit (FD)',prefix:'F',icon:'📈',svc:5,amount:true,
    blurb:'Open an FD funded from your savings account.',
    problem:{type:'docs',msg:'FD application form is not signed.',fix:'Sign the form at the kiosk and re-scan',fixLabel:'I signed and re-scanned the form'}},
  loan_enquiry:{name:'Loan enquiry',prefix:'L',icon:'🏷️',svc:10,
    blurb:'Talk to a loan officer about a personal / home / vehicle loan.',
    problem:{type:'docs',msg:'Latest 3 months\' salary slips are missing.',fix:'Upload salary slips (PDF/photo) from your phone or at the kiosk',fixLabel:'I uploaded my salary slips'}},
};

/* Build the service-specific readiness checklist. Only checks that make sense for the service are added. */
function buildChecks(service,o){
  const S=SERVICES[service], amt=o.amount||0, joint=!!o.joint, C=[];
  const add=(type,label,detail,dur,extra)=>C.push(Object.assign({type,label,detail,dur,left:dur,status:'pending'},extra||{}));
  switch(service){
    case 'cash_withdrawal':
      add('docs','Withdrawal slip verified','Amount in figures & words, date and signature scanned',2);
      add('records','Records match','Account active, balance covers '+inr(amt)+', signature specimen pre-loaded for teller',1);
      if(amt>TELLER_LIMIT) add('approval','Officer pre-approval','Amount is above the teller limit of '+inr(TELLER_LIMIT)+', so it is sent to the branch officer in advance',2,{officer:true});
      add('cash','Cash ready (CashMatch)','Checking which counter drawer holds '+inr(amt)+' in the right denominations',1);
      if(joint) add('sync','Joint holder present (SyncToken)','Account is operated "jointly", so the co-holder must check in',3,{waitFor:'co-holder'});
      break;
    case 'cash_deposit':
      add('docs',amt>PAN_CASH_LIMIT?'Deposit slip + PAN verified':'Deposit slip verified',amt>PAN_CASH_LIMIT?'PAN or Form 60 is required for cash deposits above '+inr(PAN_CASH_LIMIT):'Account number, name and denomination details scanned',2);
      add('records','Records match','Account number and name match, KYC valid',1);
      break;
    case 'account_opening':
      add('docs','Documents complete','Aadhaar / OVD, PAN (or Form 60), photograph'+(joint?' for every applicant':''),2);
      add('records','CKYC & duplicate check','No existing customer ID, so CKYC record is fetched and matched',2);
      add('approval','Officer authorisation','Account-opening approval requested from the officer in advance',2,{officer:true});
      if(joint) add('sync','All applicants present (SyncToken)','Joint account: every applicant must be present for in-person verification',3,{waitFor:'second applicant'});
      break;
    case 'kyc_update':
      add('docs','KYC documents verified','Officially valid document (Aadhaar / passport / voter ID) and PAN',2);
      add('records','Records match','Matched with your existing customer record & CKYC',1);
      break;
    case 'address_change':
      add('docs','Address proof verified','Aadhaar / passport / utility bill not older than 2 months',2);
      add('records','Records match','Customer ID and signature matched; new address queued for update',1);
      break;
    case 'demand_draft':
      add('docs','DD application complete','Payee name, "payable at" city and amount '+inr(amt)+' checked',2);
      add('records','Balance & signature match','Debit account covers '+inr(amt)+' plus DD charges (DD is debited from your account, no cash needed)',1);
      break;
    case 'fixed_deposit':
      add('docs','FD form verified','Signed application, tenure and nominee details',2);
      add('records','Funding account check','Savings account covers '+inr(amt)+', KYC valid, PAN on record (avoids higher TDS)',1);
      break;
    case 'loan_enquiry':
      add('docs','Documents complete','ID, PAN, 3 salary slips / 2 years ITR, 6-month bank statement',2);
      add('records','Credit pre-check','Credit bureau score fetched with your consent',2);
      add('approval','Loan officer available','A loan officer slot is booked before you are called',2,{officer:true});
      break;
  }
  if(o.problem){
    const P=S.problem; const c=C.find(x=>x.type===P.type)||C[0];
    const useAlt=P.needsAmountAbove && amt<=P.needsAmountAbove;
    c.fail={msg:useAlt?P.altMsg:P.msg,fix:useAlt?P.altFix:P.fix,fixLabel:useAlt?P.altFixLabel:P.fixLabel};
  }
  return C;
}

/* ---------- Deterministic PRNG for arrivals ---------- */
function rng(s){return ()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const NAMES=['R. Sharma','P. Iyer','A. Khan','S. Patel','M. Das','K. Reddy','N. Gupta','V. Menon','T. Singh','J. Fernandes','H. Joshi','D. Bose','L. Nair','G. Rao','F. Sheikh','Y. Verma'];

/* ---------- State ---------- */
function freshState(K){
  const st={v:2,now:0,K:K||3,paused:false,speed:1,seq:0,nums:{C:10,A:10,R:10,F:10,L:10},
    counters:[{id:1,cash:600000,earmark:0,busy:null,left:0,reservedFor:null},
              {id:2,cash:350000,earmark:0,busy:null,left:0,reservedFor:null},
              {id:3,cash:250000,earmark:0,busy:null,left:0,reservedFor:null}],
    vault:2000000,tokens:[],log:[],announce:[],rngSeed:7,genIn:3,my:null,autoOfficer:true};
  // Scripted opening that demonstrates the fairness cap: C-11 needs a slow officer approval and
  // gets overtaken by customers who are already ready, until it hits the cap.
  const script=[
    ['cash_withdrawal',{amount:450000,name:'R. Sharma',officerSlow:true}],
    ['kyc_update',{name:'P. Iyer'}],
    ['cash_deposit',{amount:30000,name:'A. Khan'}],
    ['demand_draft',{amount:25000,name:'S. Patel'}],
    ['address_change',{name:'M. Das',problem:true,fixIn:4}],
    ['fixed_deposit',{amount:100000,name:'K. Reddy'}],
    ['cash_withdrawal',{amount:20000,name:'N. Gupta',senior:true}],
    ['loan_enquiry',{name:'V. Menon'}],
  ];
  // three customers already at the counters when the demo starts (finish at different times)
  [['cash_deposit',{amount:40000,name:'D. Bose'},2],['fixed_deposit',{amount:150000,name:'L. Nair'},4],['kyc_update',{name:'G. Rao'},6]].forEach(([s,o,left],i)=>{
    const t=addToken(st,s,o);t.checks.forEach(c=>{c.status='pass';c.left=0});t.state='serving';t.counter=i+1;t.calledAt=0;
    st.counters[i].busy=t.id;st.counters[i].left=left;});
  script.forEach(([s,o])=>addToken(st,s,o));
  st.log.unshift({t:0,m:'Simulation start: 3 customers at counters, '+script.length+' tokens waiting. Fairness cap K = '+st.K+'.'});
  return st;
}

function addToken(st,service,o){
  o=o||{};const S=SERVICES[service];
  st.nums[S.prefix]++;
  const tk={id:S.prefix+'-'+st.nums[S.prefix],service,name:o.name||'Customer',seq:++st.seq,arrival:st.now,
    amount:o.amount||0,joint:!!o.joint,senior:!!o.senior,mine:!!o.mine,phone:o.phone||'',
    checks:buildChecks(service,o),state:'checking',overtakes:0,locked:false,counter:null,cashCounter:null,
    grace:0,arriveIn:0,svcLeft:0,svc:S.svc+(o.amount>TELLER_LIMIT?1:0),fixIn:o.fixIn||0,
    officerSlow:!!o.officerSlow,calledAt:null,servedAt:null,stage:'issued'};
  if(tk.checks[0]){tk.checks[0].status='running'}
  st.tokens.push(tk);
  return tk;
}

const isWaiting=t=>t.state==='checking'||t.state==='action'||t.state==='ready';
function log(st,m,cls){st.log.unshift({t:st.now,m,cls});if(st.log.length>80)st.log.length=80}
function counterOf(st,id){return st.counters.find(c=>c.id===id)}

function passCheck(st,t,c){
  c.status='pass';c.left=0;
  if(c.type==='cash'){ // CashMatch: earmark at the counter with most free cash, top up from vault if needed
    let best=st.counters.slice().sort((a,b)=>(b.cash-b.earmark)-(a.cash-a.earmark))[0];
    if(best.cash-best.earmark<t.amount){const top=Math.ceil((t.amount-(best.cash-best.earmark))/100000)*100000+100000;best.cash+=top;st.vault-=top;
      log(st,'CashMatch: vault top-up of '+inr(top)+' sent to Counter '+best.id+' for '+t.id,'info');}
    best.earmark+=t.amount;t.cashCounter=best.id;
    c.detail=inr(t.amount)+' earmarked at Counter '+best.id+' (₹500 notes)';
  }
  if(c.type==='approval') c.detail=t.service==='loan_enquiry'?'Loan officer slot booked for you':t.service==='account_opening'?'Account opening authorised by the officer':'Approved by the branch officer before you reach the counter';
  if(c.type==='sync') c.detail=(c.waitFor==='co-holder'?'Co-holder':'Second applicant')+' checked in at the kiosk';
}

function stepChecks(st,t){
  if(t.state==='action'){
    const f=t.checks.find(c=>c.status==='fail');
    if(t.locked){ // help desk resolves it immediately
      f.fail=null;f.status='running';f.left=1;t.state='checking';log(st,'Help desk fixed '+t.id+'\'s issue (fairness cap escalation)','prio');
    } else if(!t.mine && t.fixIn>0 && --t.fixIn===0){ resolveIssue(st,t,true); }
    return;
  }
  if(t.state!=='checking')return;
  const c=t.checks.find(c=>c.status!=='pass');
  if(!c){t.state='ready';return}
  if(c.status==='pending')c.status='running';
  if(c.left>0)c.left--;
  if(c.left>0)return;
  if(c.fail){c.status='fail';t.state='action';
    log(st,t.id+' action needed: '+c.fail.msg,'bad');
    if(t.mine)pushNotice(st,t,'action');
    return}
  if(c.officer){ // waits for officer decision unless auto
    c.awaiting=true;
    const auto=st.autoOfficer && (!t.officerSlow || t.locked);
    if(t.locked){c.awaiting=false;passCheck(st,t,c);log(st,'Officer fast-tracked approval for '+t.id+' (fairness cap)','prio')}
    else if(auto){c.waitT=(c.waitT||0)+1;if(c.waitT>=1){c.awaiting=false;passCheck(st,t,c);log(st,'Officer approved '+t.id+' ('+SERVICES[t.service].name+(t.amount?' '+inr(t.amount):'')+')','ok')}}
    if(c.awaiting)return;
  } else passCheck(st,t,c);
  const nx=t.checks.find(x=>x.status!=='pass');
  if(nx){nx.status='running'} else {t.state='ready';log(st,t.id+' is READY — all checks passed','ok')}
}

function resolveIssue(st,t,auto){
  const f=t.checks.find(c=>c.status==='fail');if(!f)return;
  f.fail=null;f.status='running';f.left=1;t.state='checking';
  log(st,t.id+(auto?' fixed the issue at the kiosk':' fixed the issue from their phone')+', re-checking','info');
}
function approve(st,id,ok){
  const t=st.tokens.find(x=>x.id===id);if(!t)return;const c=t.checks.find(c=>c.officer&&c.status==='running');if(!c)return;
  if(ok){c.awaiting=false;passCheck(st,t,c);log(st,'Officer approved '+t.id+' (manual)','ok');
    const nx=t.checks.find(x=>x.status!=='pass');if(nx)nx.status='running';else{t.state='ready';log(st,t.id+' is READY — all checks passed','ok')}}
  else{c.awaiting=false;c.status='fail';c.fail={msg:'Officer needs to verify this request in person before approving.',fix:'Visit the officer desk; your place in the queue is kept',fixLabel:'I met the officer'};t.state='action';t.fixIn=t.mine?0:3;
    log(st,'Officer asked '+t.id+' to visit the desk first','bad');if(t.mine)pushNotice(st,t,'action')}
}

/* Pick the next token for a free counter, enforcing the fairness cap K. */
function choose(st,counter){
  const W=st.tokens.filter(isWaiting).sort((a,b)=>a.seq-b.seq);
  const fits=t=>!t.cashCounter||t.cashCounter===counter.id;   // cash is earmarked at one counter
  const locked=W.find(t=>t.overtakes>=st.K);
  if(locked){
    // Nobody who arrived after the locked token may be served before it.
    if(locked.state==='ready'&&fits(locked))return locked;
    const earlier=W.filter(t=>t.seq<locked.seq&&t.state==='ready'&&fits(t)&&t.overtakes<st.K);
    earlier.sort((a,b)=>(b.senior-a.senior)||(a.seq-b.seq));
    return earlier[0]||null;
  }
  const R=W.filter(t=>t.state==='ready'&&fits(t)).sort((a,b)=>(b.senior-a.senior)||(a.seq-b.seq));
  return R[0]||null;
}

function callToken(st,t,c){
  // everyone waiting who arrived earlier is overtaken once
  st.tokens.filter(o=>isWaiting(o)&&o!==t&&o.seq<t.seq).forEach(o=>{
    o.overtakes++;
    if(o.overtakes>=st.K&&!o.locked){o.locked=true;
      log(st,o.id+' hit the fairness cap ('+o.overtakes+'/'+st.K+'): locked as next, help desk escalation','prio');}
  });
  t.state='called';t.counter=c.id;t.grace=GRACE_MIN;t.calledAt=st.now;t.arriveIn=t.mine?0:1;
  // the grace window is about a real person walking back in, so it runs on real time, not demo speed
  if(t.mine)t.graceUntil=Date.now()+GRACE_MIN*60000;
  c.busy=t.id;c.reservedFor=null;
  st.announce.unshift({t:st.now,id:t.id,counter:c.id,k:Date.now()+Math.random()});st.announce.length=Math.min(st.announce.length,6);
  log(st,'Calling '+t.id+' to Counter '+c.id+(t.locked?' (fairness-cap priority)':''),'call');
  if(t.mine)pushNotice(st,t,'called');
}
function startServing(st,t){const c=counterOf(st,t.counter);t.state='serving';c.left=t.svc}
function finish(st,c){
  const t=st.tokens.find(x=>x.id===c.busy);
  if(t){t.state='served';t.servedAt=st.now;
    if(t.service==='cash_withdrawal'){c.cash-=t.amount;c.earmark-=t.amount}
    if(t.service==='cash_deposit'){c.cash+=t.amount}
    log(st,t.id+' served at Counter '+c.id,'muted');}
  c.busy=null;c.left=0;
}
function pushNotice(st,t,kind){st.notices=st.notices||[];st.notices.push({k:Date.now()+Math.random(),kind,id:t.id,counter:t.counter,t:st.now})}

function tick(st){
  st.now++;
  // background arrivals so the branch keeps moving
  const r=rng(st.rngSeed+st.now*31);
  if(--st.genIn<=0){
    const pool=['cash_withdrawal','cash_deposit','kyc_update','address_change','demand_draft','fixed_deposit','cash_deposit','cash_withdrawal'];
    const s=pool[Math.floor(r()*pool.length)];
    const amtMap={cash_withdrawal:[10000,25000,40000,80000,150000,300000],cash_deposit:[15000,30000,60000,90000],demand_draft:[12000,25000,75000],fixed_deposit:[50000,100000,200000]};
    const a=amtMap[s]?amtMap[s][Math.floor(r()*amtMap[s].length)]:0;
    const active=st.tokens.filter(t=>t.state!=='served').length;
    if(active<12) addToken(st,s,{amount:a,name:NAMES[Math.floor(r()*NAMES.length)],problem:r()<0.18,fixIn:3,senior:r()<0.1});
    st.genIn=2+Math.floor(r()*2);
  }
  st.tokens.forEach(t=>stepChecks(st,t));
  // escalate locked tokens: remaining checks finish quickly
  st.tokens.filter(t=>t.locked&&t.state==='checking').forEach(t=>t.checks.forEach(c=>{if(c.status!=='pass'&&c.left>1)c.left=1}));
  // called tokens walk to the counter / grace window
  st.tokens.filter(t=>t.state==='called').forEach(t=>{
    if(!t.mine){if(--t.arriveIn<=0)startServing(st,t);return}
    if(Date.now()>=t.graceUntil)expireGrace(st,t);
  });
  st.counters.forEach(c=>{if(c.busy){const t=st.tokens.find(x=>x.id===c.busy);if(t&&t.state==='serving'&&--c.left<=0)finish(st,c)}});
  assign(st);
  // keep list short
  const served=st.tokens.filter(t=>t.state==='served'&&!t.mine);
  if(served.length>8){const drop=new Set(served.slice(0,served.length-8).map(t=>t.id));st.tokens=st.tokens.filter(t=>!drop.has(t.id))}
}
function expireGrace(st,t){ // grace expired: free the counter, keep the customer's place (no penalty)
  const c=counterOf(st,t.counter);if(c&&c.busy===t.id)c.busy=null;t.state='held';t.counter=null;t.graceUntil=null;
  log(st,t.id+' did not arrive within the '+GRACE_MIN+'-min grace window: on hold, keeps their place','bad');pushNotice(st,t,'held');
}
function graceLeft(t){if(!t.graceUntil)return '';return '…';const ms=Math.max(0,t.graceUntil-Date.now());const m=Math.floor(ms/60000),s=Math.floor(ms%60000/1000);return m+':'+String(s).padStart(2,'0')}
function assign(st){
  st.counters.forEach(c=>{if(!c.busy){c.reservedFor=null;const t=choose(st,c);if(t)callToken(st,t,c);else{
    const L=st.tokens.filter(isWaiting).sort((a,b)=>a.seq-b.seq).find(t=>t.overtakes>=st.K);if(L)c.reservedFor=L.id}}});
}

/* ---------- ETA / derived ---------- */
function eta(st,t){
  if(t.state==='called'||t.state==='serving')return 0;
  if(t.state==='served')return null;
  let checkLeft=0;t.checks.forEach(c=>{if(c.status!=='pass')checkLeft+=Math.max(c.left,c.officer?1:0)});
  if(t.state==='action')checkLeft+=2; // typical time to fix
  const ahead=st.tokens.filter(o=>o!==t&&(o.state==='ready'&&(o.senior&&!t.senior||o.seq<t.seq))).length;
  const busyLeft=st.counters.map(c=>{const b=st.tokens.find(x=>x.id===c.busy);return b?(b.state==='serving'?c.left:b.svc+1):0}).sort((a,b)=>a-b);
  const queueWait=busyLeft[0]+Math.floor(ahead/st.counters.length)*AVG_SVC;
  // a token locked at the fairness cap that arrived earlier must be called first
  let block=0;const L=st.tokens.filter(isWaiting).sort((a,b)=>a.seq-b.seq).find(o=>o.overtakes>=st.K);
  if(L&&L!==t&&L.seq<t.seq&&L.state!=='ready'){L.checks.forEach(c=>{if(c.status!=='pass')block+=Math.max(Math.min(c.left,1),1)})}
  return Math.max(checkLeft,queueWait,block);
}
function position(st,t){ // position among tokens waiting to be called (ready lane first)
  if(!isWaiting(t))return 0;
  const W=st.tokens.filter(isWaiting).sort((a,b)=>{const ra=a.state==='ready',rb=b.state==='ready';return (rb-ra)||(b.senior-a.senior)||(a.seq-b.seq)});
  return W.indexOf(t)+1;
}
const STATUS_LABEL={checking:'Checking',action:'Action needed',ready:'Ready',called:'Called',serving:'At counter',served:'Served',held:'On hold'};
const STATUS_CLASS={checking:'checking',action:'action',ready:'ready',called:'called',serving:'called',served:'served',held:'action'};

/* ---------- Driver / persistence ---------- */
const pageId=Math.random().toString(36).slice(2);
let st=null,timer=null,listeners=[],acc=0;
function load(){try{return JSON.parse(localStorage.getItem(LS_STATE))}catch(e){return null}}
function save(){try{st.savedAt=Date.now();localStorage.setItem(LS_STATE,JSON.stringify(st))}catch(e){}}
function driverInfo(){try{return JSON.parse(localStorage.getItem(LS_DRIVER))}catch(e){return null}}
function amDriver(){const d=driverInfo();return d&&d.id===pageId}
function claim(force){const d=driverInfo();if(force||!d||Date.now()-d.ts>2500||d.id===pageId){localStorage.setItem(LS_DRIVER,JSON.stringify({id:pageId,ts:Date.now()}));return true}return false}
function emit(){listeners.forEach(f=>f(st))}
const BASE_MS=1500; // real ms per simulated minute at 1x
function loop(){
  const driving=claim(false);
  if(driving){
    st=load()||st||freshState();
    if(!st.paused){acc+=250*(st.speed||1);while(acc>=BASE_MS){acc-=BASE_MS;tick(st)}}
    save();
  } else {const s=load();if(s)st=s}
  emit();
}
function mutate(fn){ // apply a user action to the shared state, from any page
  st=load()||st||freshState();fn(st);assign(st);save();emit();
}
window.addEventListener('beforeunload',()=>{if(amDriver())localStorage.removeItem(LS_DRIVER)});

window.RL=Object.assign(window.RL||{},{
  SERVICES,TELLER_LIMIT,PAN_CASH_LIMIT,GRACE_MIN,inr,buildChecks,STATUS_LABEL,STATUS_CLASS,
  start(){st=load()||freshState();save();if(!timer)timer=setInterval(loop,250);loop()},
  onChange(f){listeners.push(f);if(st)f(st)},
  eta:t=>eta(st,t),position:t=>position(st,t),
  reset(K){st=freshState(K||(st&&st.K)||3);acc=0;save();emit()},
  setK(K){mutate(s=>{s.K=K;log(s,'Fairness cap changed to K = '+K,'info');s.tokens.filter(isWaiting).forEach(t=>{if(t.overtakes>=K&&!t.locked){t.locked=true;log(s,t.id+' is now at the cap ('+t.overtakes+'/'+K+'): locked as next','prio')}})})},
  setPaused(p){mutate(s=>s.paused=p)},
  setSpeed(x){mutate(s=>s.speed=x)},
  setAutoOfficer(v){mutate(s=>s.autoOfficer=v)},
  step(){mutate(s=>tick(s))},
  approve(id,ok){mutate(s=>approve(s,id,ok))},
  issueMine(service,o){let tk;mutate(s=>{
      // only one "my token" at a time: retire the previous one
      if(s.my){const old=s.tokens.find(t=>t.id===s.my);if(old&&old.state!=='served'){
        if(old.counter){const c=counterOf(s,old.counter);if(c&&c.busy===old.id){c.busy=null}}
        if(old.cashCounter){const c=counterOf(s,old.cashCounter);if(c)c.earmark-=old.amount}
        s.tokens=s.tokens.filter(t=>t!==old)}}
      tk=addToken(s,service,Object.assign({},o,{mine:true,name:'You'}));s.my=tk.id;s.notices=[];
      log(s,'Token '+tk.id+' issued ('+SERVICES[service].name+(o.amount?' '+inr(o.amount):'')+')','info');
    });return tk},
  mine(){return st&&st.my?st.tokens.find(t=>t.id===st.my):null},
  find(id){return st?st.tokens.find(t=>t.id===id):null},
  fixMine(){mutate(s=>{const t=s.tokens.find(x=>x.id===s.my);if(t)resolveIssue(s,t,false)})},
  coHolderArrived(){mutate(s=>{const t=s.tokens.find(x=>x.id===s.my);if(!t)return;const c=t.checks.find(c=>c.type==='sync'&&c.status==='running');if(c){c.left=0;passCheck(s,t,c);const nx=t.checks.find(x=>x.status!=='pass');if(nx)nx.status='running';else{t.state='ready';log(s,t.id+' is READY — all checks passed','ok')}}})},
  atCounter(){mutate(s=>{const t=s.tokens.find(x=>x.id===s.my);if(t&&t.state==='called'){startServing(s,t);log(s,t.id+' checked in at Counter '+t.counter,'info')}})},
  skipGrace(){mutate(s=>{const t=s.tokens.find(x=>x.id===s.my);if(t&&t.state==='called')expireGrace(s,t)})},
  graceLeft:t=>graceLeft(t),
  imBack(){mutate(s=>{const t=s.tokens.find(x=>x.id===s.my);if(t&&t.state==='held'){t.state='ready';log(s,t.id+' is back in the branch: ready to be re-called (original place kept)','info')}})},
  isDriver:amDriver,
  simClock(tick){const m=10*60+tick;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0')},
});
Object.defineProperty(window.RL,'state',{get(){return st},configurable:true});
})();
