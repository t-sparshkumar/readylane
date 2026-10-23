/* Documents & forms data: which sample forms exist, and what to bring for each service.
   Kept consistent with the checks in engine.js (teller limit, PAN limit, joint accounts). */
(function(){
const DIR='assets/docs/';
// id -> [file, icon, size KB]
const FORMS={
 account_opening:['account-opening-form.pdf','📝',367],
 kyc_update:['kyc-update-form.pdf','🪪',338],
 deposit_slip:['cash-deposit-slip.pdf','💵',261],
 withdrawal_slip:['cash-withdrawal-slip.pdf','🏧',295],
 dd_request:['demand-draft-request.pdf','🧾',287],
 fd_form:['fixed-deposit-form.pdf','📈',296],
 address_change:['address-change-request.pdf','🏠',274],
 nominee:['nominee-form.pdf','👪',284],
 form60_info:['pan-form-60-info.pdf','🆔',255],
 id_checklist:['id-documents-checklist.pdf','✅',259],
 loan_checklist:['loan-enquiry-checklist.pdf','🏡',291],
};
const SVC_FORMS={
 cash_withdrawal:['withdrawal_slip'],
 cash_deposit:['deposit_slip','form60_info'],
 account_opening:['account_opening','nominee','form60_info','id_checklist'],
 kyc_update:['kyc_update','id_checklist'],
 address_change:['address_change','id_checklist'],
 demand_draft:['dd_request'],
 fixed_deposit:['fd_form','nominee'],
 loan_enquiry:['loan_checklist','id_checklist'],
};
const COMMON=['id_checklist','form60_info','nominee','kyc_update','address_change'];
// what to bring: [i18n key, pictogram, condition]
// condition: 'over' = amount above the limit, 'upto' = amount up to it, 'joint' = joint accounts only
const BRING={
 cash_withdrawal:[['b.wslip','🧾'],['b.words','🔢'],['b.nopan_w','ℹ️'],['b.officer','✍','over','TELLER'],['b.jointw','👥','joint']],
 cash_deposit:[['b.dslip','🧾'],['b.cash','💵'],['b.pan50','🪪','over','PAN'],['b.nopan_d','ℹ️','upto','PAN']],
 account_opening:[['b.aoform','📝'],['b.ovd','🪪'],['b.panf60','🆔'],['b.photo','📷'],['b.jointao','👥','joint']],
 kyc_update:[['b.kycform','📝'],['b.ovd1','🪪'],['b.pan','🆔']],
 address_change:[['b.adform','📝'],['b.newaddr','🏠'],['b.bill','💡']],
 demand_draft:[['b.ddform','📝'],['b.payee','👤'],['b.dddebit','🏦'],['b.dd50','⚠️']],
 fixed_deposit:[['b.fdform','📝'],['b.panfd','🆔'],['b.nominee','👪'],['b.15gh','📄']],
 loan_enquiry:[['b.idpan','🪪'],['b.income','💼'],['b.stmt','📊']],
};
const lim=w=>w==='TELLER'?(RL.TELLER_LIMIT||200000):(RL.PAN_CASH_LIMIT||50000);
const inr=n=>RL.inr?RL.inr(n):'₹'+Number(n).toLocaleString('en-IN');
/* o = {amount, joint} to filter for one customer; omit o to get everything with condition tags */
function bringList(svc,o){
 const L=BRING[svc]||[];
 return L.filter(([k,ic,c,w])=>{
  if(!o||!c)return true;
  if(c==='joint')return !!o.joint;
  const a=+o.amount||0;return c==='over'?a>lim(w):a<=lim(w);
 }).map(([k,ic,c,w])=>({k,ic,cond:c||null,text:RL.t(k,{lim:inr(lim(w||'PAN'))}),
   tag:!o&&c?(c==='joint'?RL.t('doc.ifJoint'):RL.t(c==='over'?'doc.ifAmountOver':'doc.ifUpTo',{lim:inr(lim(w))})):''}));
}
const form=id=>{const f=FORMS[id];return {id,file:DIR+f[0],ic:f[1],kb:f[2],name:RL.t('form.'+id),desc:RL.t('formd.'+id)}};
const formsFor=svc=>(SVC_FORMS[svc]||[]).map(form);
/* small "download" link for a form */
function formLink(id,cls,label){const f=form(id);
 return '<a class="'+(cls||'btn btn-sm btn-light')+' dl" href="'+f.file+'" download target="_blank" rel="noopener" aria-label="'+RL.esc(RL.t('doc.download')+': '+f.name)+'"><span aria-hidden="true">📥</span> '+RL.esc(label||f.name)+'</a>'}
window.RL=Object.assign(window.RL||{},{DOCS:{FORMS,SVC_FORMS,COMMON,BRING},bringList,docForm:form,formsFor,formLink});
})();
