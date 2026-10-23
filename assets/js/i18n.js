/* ReadyLane i18n + accessibility helpers (load this FIRST on every page).
   - One dictionary D: key -> [English, Hindi]. English null = keep the English already written in the HTML.
   - Static text: data-i18n (text), data-i18n-html (rich), data-i18n-ph (placeholder), data-i18n-aria, data-i18n-alt, data-i18n-title.
   - Dynamic text: RL.t(key, params). A param value starting with "@" is itself a key and is translated too.
   - Language and Easy mode are stored in localStorage and shared by every page and tab. */
(function(){
const LS_LANG='readylane.lang', LS_EASY='readylane.easy';
let lang=(()=>{try{return localStorage.getItem(LS_LANG)==='hi'?'hi':'en'}catch(e){return 'en'}})();
let easy=(()=>{try{return localStorage.getItem(LS_EASY)==='1'}catch(e){return false}})();
const D={
/* ---- nav / shell ---- */
'nav.index':['Overview','परिचय'],'nav.demo':['Take token','टोकन लें'],'nav.status':['My token','मेरा टोकन'],
'nav.documents':['Documents','दस्तावेज़'],'nav.mentor':['Ask mentor','मेंटर से पूछें'],'nav.lobby':['Lobby TV','लॉबी TV'],'nav.staff':['Staff','स्टाफ़'],
'nav.menu':['Menu','मेन्यू'],'nav.lang':['Language','भाषा'],'nav.easy':['Easy','आसान'],'nav.easyAria':['Easy mode: bigger text and buttons','आसान मोड: बड़े अक्षर और बटन'],
'brand.by':['by SmartQ Bank','SmartQ Bank द्वारा'],
'foot.tag':['The queue that only calls you when your work is already done.','वह कतार जो आपको तभी बुलाती है जब आपका काम पहले से तैयार हो।'],
'foot.note':['MVP prototype · simulated data only · Presented by Mansi','MVP प्रोटोटाइप · सिर्फ़ सिमुलेटेड डेटा · प्रस्तुतकर्ता: मानसी'],
'listen':['Listen','सुनें'],'listen.aria':['Read this aloud','इसे ज़ोर से सुनें'],'stop':['Stop','रोकें'],
'speech.none':['Voice is not supported in this browser','इस ब्राउज़र में आवाज़ की सुविधा नहीं है'],
'lang.switched':['English selected','हिंदी चुनी गई'],
/* ---- picture steps ---- */
'steps.title':['How it works: 4 steps','कैसे काम करता है: 4 कदम'],
'steps.1':['Choose your work','अपना काम चुनें'],'steps.2':['Take a token','टोकन लें'],
'steps.3':['Sit. We check your papers','बैठिए, हम काग़ज़ जाँचेंगे'],'steps.4':['Go when your number is called','नंबर बुलाने पर काउंटर जाएँ'],
'steps.say':['Step 1: choose your work. Step 2: take a token. Step 3: sit down, we check your papers. Step 4: go to the counter when your number is called.','पहला कदम: अपना काम चुनें। दूसरा: टोकन लें। तीसरा: बैठिए, हम आपके काग़ज़ जाँचेंगे। चौथा: नंबर बुलाने पर काउंटर पर जाएँ।'],
/* ---- services ---- */
'svc.cash_withdrawal':['Cash withdrawal','नकद निकासी'],'svc.cash_deposit':['Cash deposit','नकद जमा'],
'svc.account_opening':['Open savings account','बचत खाता खोलें'],'svc.kyc_update':['KYC update (re-KYC)','KYC अपडेट (री-KYC)'],
'svc.address_change':['Address change','पता बदलना'],'svc.demand_draft':['Demand draft (DD)','डिमांड ड्राफ़्ट (DD)'],
'svc.fixed_deposit':['Fixed deposit (FD)','फ़िक्स्ड डिपॉज़िट (FD)'],'svc.loan_enquiry':['Loan enquiry','लोन की जानकारी'],
'blurb.cash_withdrawal':['Withdraw cash from your account using a withdrawal slip or cheque.','निकासी पर्ची या चेक से अपने खाते से नकद निकालें।'],
'blurb.cash_deposit':['Deposit cash into a savings or current account.','बचत या चालू खाते में नकद जमा करें।'],
'blurb.account_opening':['Open a new savings account (single or joint).','नया बचत खाता खोलें (अकेले या संयुक्त)।'],
'blurb.kyc_update':['Periodic KYC update with a fresh officially valid document.','नए मान्य दस्तावेज़ के साथ समय-समय पर होने वाला KYC अपडेट।'],
'blurb.address_change':['Update the communication address on your account.','अपने खाते में पता बदलवाएँ।'],
'blurb.demand_draft':['Issue a DD debited from your account (needs payee name and "payable at" city).','आपके खाते से कटने वाला DD बनवाएँ (पाने वाले का नाम और "भुगतान शहर" चाहिए)।'],
'blurb.fixed_deposit':['Open an FD funded from your savings account.','अपने बचत खाते से FD खोलें।'],
'blurb.loan_enquiry':['Talk to a loan officer about a personal / home / vehicle loan.','पर्सनल / होम / वाहन लोन के बारे में लोन अधिकारी से बात करें।'],
/* ---- check types ---- */
'ct.docs':['Documents','दस्तावेज़'],'ct.records':['Records match','रिकॉर्ड मिलान'],'ct.approval':['Officer pre-approval','अधिकारी की पहले से मंज़ूरी'],
'ct.cash':['Cash ready (CashMatch)','नकद तैयार (CashMatch)'],'ct.sync':['Everyone present (SyncToken)','सब मौजूद (SyncToken)'],
/* ---- checklist items (engine) ---- */
'ck.cw.docs.l':['Withdrawal slip verified','निकासी पर्ची की जाँच हुई'],
'ck.cw.docs.d':['Amount in figures & words, date and signature scanned','अंकों और शब्दों में रकम, तारीख़ और हस्ताक्षर स्कैन हुए'],
'ck.records.l':['Records match','रिकॉर्ड मिलान'],
'ck.cw.records.d':['Account active, balance covers {amt}, signature specimen pre-loaded for teller','खाता चालू है, बैलेंस में {amt} है, हस्ताक्षर का नमूना कैशियर के पास पहले से है'],
'ck.appr.l':['Officer pre-approval','अधिकारी की पहले से मंज़ूरी'],
'ck.cw.appr.d':['Amount is above the teller limit of {lim}, so it is sent to the branch officer in advance','रकम कैशियर की सीमा {lim} से ज़्यादा है, इसलिए पहले ही शाखा अधिकारी को भेजी गई'],
'ck.cash.l':['Cash ready (CashMatch)','नकद तैयार (CashMatch)'],
'ck.cash.d':['Checking which counter drawer holds {amt} in the right denominations','देख रहे हैं कि किस काउंटर की दराज़ में {amt} सही नोटों में है'],
'ck.cw.sync.l':['Joint holder present (SyncToken)','संयुक्त खाताधारक मौजूद (SyncToken)'],
'ck.cw.sync.d':['Account is operated "jointly", so the co-holder must check in','खाता "संयुक्त रूप से" चलता है, इसलिए दूसरे खाताधारक का आना ज़रूरी है'],
'ck.cd.docs.lpan':['Deposit slip + PAN verified','जमा पर्ची + PAN की जाँच हुई'],'ck.cd.docs.l':['Deposit slip verified','जमा पर्ची की जाँच हुई'],
'ck.cd.docs.dpan':['PAN or Form 60 is required for cash deposits above {lim}','{lim} से ज़्यादा नकद जमा पर PAN या फ़ॉर्म 60 ज़रूरी है'],
'ck.cd.docs.d':['Account number, name and denomination details scanned','खाता संख्या, नाम और नोटों का ब्योरा स्कैन हुआ'],
'ck.cd.records.d':['Account number and name match, KYC valid','खाता संख्या और नाम मेल खाते हैं, KYC मान्य है'],
'ck.docs.l':['Documents complete','दस्तावेज़ पूरे'],
'ck.ao.docs.d':['Aadhaar / OVD, PAN (or Form 60), photograph','आधार / मान्य पहचान पत्र, PAN (या फ़ॉर्म 60), फ़ोटो'],
'ck.ao.docs.dj':['Aadhaar / OVD, PAN (or Form 60), photograph for every applicant','हर आवेदक का आधार / मान्य पहचान पत्र, PAN (या फ़ॉर्म 60), फ़ोटो'],
'ck.ao.records.l':['CKYC & duplicate check','CKYC और दोहरे खाते की जाँच'],
'ck.ao.records.d':['No existing customer ID, so CKYC record is fetched and matched','पहले से कोई ग्राहक ID नहीं है, इसलिए CKYC रिकॉर्ड लेकर मिलाया गया'],
'ck.ao.appr.l':['Officer authorisation','अधिकारी की मंज़ूरी'],
'ck.ao.appr.d':['Account-opening approval requested from the officer in advance','खाता खोलने की मंज़ूरी अधिकारी से पहले ही माँगी गई'],
'ck.ao.sync.l':['All applicants present (SyncToken)','सभी आवेदक मौजूद (SyncToken)'],
'ck.ao.sync.d':['Joint account: every applicant must be present for in-person verification','संयुक्त खाता: सामने से जाँच के लिए हर आवेदक का होना ज़रूरी है'],
'ck.kyc.docs.l':['KYC documents verified','KYC दस्तावेज़ों की जाँच हुई'],
'ck.kyc.docs.d':['Officially valid document (Aadhaar / passport / voter ID) and PAN','मान्य दस्तावेज़ (आधार / पासपोर्ट / वोटर ID) और PAN'],
'ck.kyc.records.d':['Matched with your existing customer record & CKYC','आपके मौजूदा ग्राहक रिकॉर्ड और CKYC से मिलाया गया'],
'ck.ad.docs.l':['Address proof verified','पते के प्रमाण की जाँच हुई'],
'ck.ad.docs.d':['Aadhaar / passport / utility bill not older than 2 months','आधार / पासपोर्ट / 2 महीने से पुराना न हो ऐसा बिल'],
'ck.ad.records.d':['Customer ID and signature matched; new address queued for update','ग्राहक ID और हस्ताक्षर मिले; नया पता अपडेट के लिए भेजा गया'],
'ck.dd.docs.l':['DD application complete','DD आवेदन पूरा'],
'ck.dd.docs.d':['Payee name, "payable at" city and amount {amt} checked','पाने वाले का नाम, "भुगतान शहर" और रकम {amt} जाँची गई'],
'ck.dd.records.l':['Balance & signature match','बैलेंस और हस्ताक्षर मिलान'],
'ck.dd.records.d':['Debit account covers {amt} plus DD charges (DD is debited from your account, no cash needed)','खाते में {amt} और DD शुल्क जितना बैलेंस है (DD खाते से कटता है, नकद नहीं चाहिए)'],
'ck.fd.docs.l':['FD form verified','FD फ़ॉर्म की जाँच हुई'],
'ck.fd.docs.d':['Signed application, tenure and nominee details','हस्ताक्षर किया आवेदन, अवधि और नॉमिनी का ब्योरा'],
'ck.fd.records.l':['Funding account check','खाते में पैसे की जाँच'],
'ck.fd.records.d':['Savings account covers {amt}, KYC valid, PAN on record (avoids higher TDS)','बचत खाते में {amt} है, KYC मान्य, PAN दर्ज है (ज़्यादा TDS नहीं कटेगा)'],
'ck.ln.docs.d':['ID, PAN, 3 salary slips / 2 years ITR, 6-month bank statement','पहचान पत्र, PAN, 3 सैलरी स्लिप / 2 साल का ITR, 6 महीने का बैंक स्टेटमेंट'],
'ck.ln.records.l':['Credit pre-check','क्रेडिट की शुरुआती जाँच'],
'ck.ln.records.d':['Credit bureau score fetched with your consent','आपकी सहमति से क्रेडिट स्कोर देखा गया'],
'ck.ln.appr.l':['Loan officer available','लोन अधिकारी उपलब्ध'],
'ck.ln.appr.d':['A loan officer slot is booked before you are called','आपको बुलाने से पहले लोन अधिकारी का समय बुक होता है'],
'ck.cash.dpass':['{amt} earmarked at Counter {c} (₹500 notes)','{amt} काउंटर {c} पर अलग रखे गए (₹500 के नोट)'],
'ck.appr.dloan':['Loan officer slot booked for you','आपके लिए लोन अधिकारी का समय बुक हुआ'],
'ck.appr.dao':['Account opening authorised by the officer','अधिकारी ने खाता खोलने की मंज़ूरी दी'],
'ck.appr.dok':['Approved by the branch officer before you reach the counter','काउंटर पहुँचने से पहले ही शाखा अधिकारी ने मंज़ूरी दी'],
'ck.sync.dco':['Co-holder checked in at the kiosk','दूसरे खाताधारक ने कियोस्क पर हाज़िरी लगाई'],
'ck.sync.dap':['Second applicant checked in at the kiosk','दूसरे आवेदक ने कियोस्क पर हाज़िरी लगाई'],
'who.co':['co-holder','दूसरे खाताधारक'],'who.ap':['second applicant','दूसरे आवेदक'],
/* ---- problems ("action needed") ---- */
'p.cash_withdrawal.msg':['Amount in words does not match the figure on your withdrawal slip.','निकासी पर्ची पर शब्दों में लिखी रकम अंकों से मेल नहीं खाती।'],
'p.cash_withdrawal.fix':['Fill a fresh slip at the kiosk and re-scan','कियोस्क पर नई पर्ची भरें और फिर से स्कैन करें'],
'p.cash_withdrawal.lbl':['I re-scanned a corrected slip','मैंने सही पर्ची फिर से स्कैन की'],
'p.cash_deposit.msg':['PAN not provided. PAN (or Form 60) is mandatory for cash deposits above ₹50,000.','PAN नहीं दिया गया। ₹50,000 से ज़्यादा नकद जमा पर PAN (या फ़ॉर्म 60) ज़रूरी है।'],
'p.cash_deposit.fix':['Upload a photo of your PAN card or fill Form 60 at the kiosk','अपने PAN कार्ड की फ़ोटो अपलोड करें या कियोस्क पर फ़ॉर्म 60 भरें'],
'p.cash_deposit.lbl':['I uploaded my PAN card','मैंने PAN कार्ड अपलोड किया'],
'p.cash_deposit.alt.msg':['Account number on the deposit slip is unreadable.','जमा पर्ची पर खाता संख्या पढ़ी नहीं जा रही।'],
'p.cash_deposit.alt.fix':['Re-write the slip at the kiosk and re-scan','कियोस्क पर पर्ची फिर से लिखें और स्कैन करें'],
'p.cash_deposit.alt.lbl':['I re-scanned the slip','मैंने पर्ची फिर से स्कैन की'],
'p.account_opening.msg':['PAN card copy is missing from your application.','आपके आवेदन में PAN कार्ड की कॉपी नहीं है।'],
'p.account_opening.fix':['Upload your PAN card, or fill Form 60 if you do not have a PAN','PAN कार्ड अपलोड करें, या PAN न हो तो फ़ॉर्म 60 भरें'],
'p.account_opening.lbl':['I uploaded my PAN card','मैंने PAN कार्ड अपलोड किया'],
'p.kyc_update.msg':['Aadhaar scan is unclear (part of the card is cut off).','आधार का स्कैन साफ़ नहीं है (कार्ड का हिस्सा कटा है)।'],
'p.kyc_update.fix':['Re-scan the full card at the kiosk','कियोस्क पर पूरा कार्ड फिर से स्कैन करें'],
'p.kyc_update.lbl':['I re-scanned my Aadhaar','मैंने आधार फिर से स्कैन किया'],
'p.address_change.msg':['Electricity bill is older than 2 months, so it cannot be accepted as address proof.','बिजली का बिल 2 महीने से पुराना है, इसलिए पते के प्रमाण के रूप में नहीं लिया जा सकता।'],
'p.address_change.fix':['Upload a recent bill, or use Aadhaar / passport with the new address','हाल का बिल अपलोड करें, या नए पते वाला आधार / पासपोर्ट दें'],
'p.address_change.lbl':['I uploaded a valid address proof','मैंने सही पते का प्रमाण अपलोड किया'],
'p.demand_draft.msg':['"Payable at" city is missing on your DD application.','आपके DD आवेदन में "भुगतान शहर" नहीं लिखा है।'],
'p.demand_draft.fix':['Complete the payee details on the form and re-scan','फ़ॉर्म में पाने वाले का पूरा ब्योरा भरें और फिर से स्कैन करें'],
'p.demand_draft.lbl':['I completed the payee details','मैंने पाने वाले का ब्योरा भर दिया'],
'p.fixed_deposit.msg':['FD application form is not signed.','FD आवेदन फ़ॉर्म पर हस्ताक्षर नहीं हैं।'],
'p.fixed_deposit.fix':['Sign the form at the kiosk and re-scan','कियोस्क पर फ़ॉर्म पर हस्ताक्षर करें और फिर से स्कैन करें'],
'p.fixed_deposit.lbl':['I signed and re-scanned the form','मैंने हस्ताक्षर करके फ़ॉर्म फिर से स्कैन किया'],
'p.loan_enquiry.msg':['Latest 3 months\' salary slips are missing.','पिछले 3 महीने की सैलरी स्लिप नहीं हैं।'],
'p.loan_enquiry.fix':['Upload salary slips (PDF/photo) from your phone or at the kiosk','फ़ोन से या कियोस्क पर सैलरी स्लिप (PDF/फ़ोटो) अपलोड करें'],
'p.loan_enquiry.lbl':['I uploaded my salary slips','मैंने सैलरी स्लिप अपलोड कीं'],
'p.officer.msg':['Officer needs to verify this request in person before approving.','मंज़ूरी से पहले अधिकारी आपसे मिलकर जाँच करना चाहते हैं।'],
'p.officer.fix':['Visit the officer desk; your place in the queue is kept','अधिकारी डेस्क पर जाएँ; कतार में आपकी जगह बनी रहेगी'],
'p.officer.lbl':['I met the officer','मैं अधिकारी से मिल लिया/ली'],
/* ---- status labels ---- */
'st.checking':['Checking','जाँच जारी'],'st.action':['Action needed','काम बाकी'],'st.ready':['Ready','तैयार'],'st.called':['Called','बुलाया गया'],
'st.serving':['At counter','काउंटर पर'],'st.served':['Served','काम पूरा'],'st.held':['On hold','होल्ड पर'],
'stage.0':['Issued','जारी'],'stage.1':['Preparing','तैयारी'],'stage.2':['Ready','तैयार'],'stage.3':['Called','बुलाया'],'stage.4':['Served','पूरा'],
/* ---- event log (engine) ---- */
'log.start':['Simulation start: 3 customers at counters, {n} tokens waiting. Fairness cap K = {K}.','सिमुलेशन शुरू: 3 ग्राहक काउंटर पर, {n} टोकन इंतज़ार में। निष्पक्षता सीमा K = {K}।'],
'log.vault':['CashMatch: vault top-up of {amt} sent to Counter {c} for {id}','CashMatch: {id} के लिए तिजोरी से {amt} काउंटर {c} पर भेजे गए'],
'log.action':['{id} action needed: {msg}','{id} पर काम बाकी: {msg}'],
'log.helpfix':['Help desk fixed {id}\'s issue (fairness cap escalation)','हेल्प डेस्क ने {id} की समस्या ठीक की (निष्पक्षता सीमा पर प्राथमिकता)'],
'log.fasttrack':['Officer fast-tracked approval for {id} (fairness cap)','अधिकारी ने {id} को तुरंत मंज़ूरी दी (निष्पक्षता सीमा)'],
'log.approved':['Officer approved {id} ({s}{amt})','अधिकारी ने {id} को मंज़ूरी दी ({s}{amt})'],
'log.ready':['{id} is READY — all checks passed','{id} तैयार है — सारी जाँच पूरी'],
'log.fixkiosk':['{id} fixed the issue at the kiosk, re-checking','{id} ने कियोस्क पर समस्या ठीक की, फिर से जाँच'],
'log.fixphone':['{id} fixed the issue from their phone, re-checking','{id} ने फ़ोन से समस्या ठीक की, फिर से जाँच'],
'log.approvedm':['Officer approved {id} (manual)','अधिकारी ने {id} को मंज़ूरी दी (मैन्युअल)'],
'log.visit':['Officer asked {id} to visit the desk first','अधिकारी ने {id} को पहले डेस्क पर बुलाया'],
'log.cap':['{id} hit the fairness cap ({o}/{K}): locked as next, help desk escalation','{id} निष्पक्षता सीमा पर पहुँचा ({o}/{K}): अगला नंबर इसी का, हेल्प डेस्क को भेजा'],
'log.call':['Calling {id} to Counter {c}','{id} को काउंटर {c} पर बुलाया'],
'log.callcap':['Calling {id} to Counter {c} (fairness-cap priority)','{id} को काउंटर {c} पर बुलाया (निष्पक्षता सीमा प्राथमिकता)'],
'log.served':['{id} served at Counter {c}','{id} का काम काउंटर {c} पर पूरा'],
'log.grace':['{id} did not arrive within the {g}-min grace window: on hold, keeps their place','{id} {g} मिनट की छूट में नहीं पहुँचे: होल्ड पर, जगह बनी रहेगी'],
'log.kchange':['Fairness cap changed to K = {K}','निष्पक्षता सीमा बदलकर K = {K} की गई'],
'log.klock':['{id} is now at the cap ({o}/{K}): locked as next','{id} अब सीमा पर है ({o}/{K}): अगला नंबर इसी का'],
'log.issued':['Token {id} issued ({s}{amt})','टोकन {id} जारी ({s}{amt})'],
'log.checkin':['{id} checked in at Counter {c}','{id} काउंटर {c} पर पहुँचे'],
'log.back':['{id} is back in the branch: ready to be re-called (original place kept)','{id} शाखा में लौट आए: फिर से बुलाने के लिए तैयार (पुरानी जगह बनी रही)'],
/* ---- token view ---- */
'tv.checking.h':['⏳ Preparing your work','⏳ आपका काम तैयार हो रहा है'],'tv.checking.b':['{p} of {n} checks done','{n} में से {p} जाँच पूरी'],
'tv.checking.s':['Relax, we\'ll call you when you\'re ready.','आराम से बैठिए, तैयार होते ही हम आपको बुलाएँगे।'],
'tv.action.h':['❌ Action needed','❌ काम बाकी'],'tv.action.b':['Fix this before the counter','काउंटर से पहले इसे ठीक करें'],
'tv.action.s':['You keep your place in the queue.','कतार में आपकी जगह बनी रहेगी।'],
'tv.ready.h':['✅ All checks passed','✅ सारी जाँच पूरी'],'tv.ready.b':['You\'re ready!','आप तैयार हैं!'],
'tv.ready.s':['Waiting for a free counter.','ख़ाली काउंटर का इंतज़ार।'],'tv.ready.sc':['Waiting for a free counter (your cash is at Counter {c}).','ख़ाली काउंटर का इंतज़ार (आपका नकद काउंटर {c} पर है)।'],
'tv.called.h':['🔔 It\'s your turn','🔔 आपकी बारी'],'tv.called.b':['Go to Counter {c}','काउंटर {c} पर जाएँ'],
'tv.called.s':['Grace window: {t} left (real time)','छूट का समय: {t} बाकी (असली समय)'],'tv.called.so':['Please proceed to the counter','कृपया काउंटर पर जाएँ'],
'tv.serving.h':['🧾 At Counter {c}','🧾 काउंटर {c} पर'],'tv.serving.b':['Being served','काम हो रहा है'],'tv.serving.s':['The teller already has your prepared file.','कैशियर के पास आपकी फ़ाइल पहले से तैयार है।'],
'tv.served.h':['🎉 Done','🎉 हो गया'],'tv.served.b':['Served at Counter {c}','काउंटर {c} पर काम पूरा'],'tv.served.s':['Time from token to done: {m} min (simulated)','टोकन से काम पूरा होने तक: {m} मिनट (सिमुलेशन)'],
'tv.held.h':['⏸ On hold','⏸ होल्ड पर'],'tv.held.b':['You missed your call','आपका बुलावा छूट गया'],
'tv.held.s':['You haven\'t lost your place. Tap "I\'m back" and you\'ll be called at the next free counter.','आपकी जगह नहीं गई। "मैं वापस आ गया" दबाएँ, अगले ख़ाली काउंटर पर बुलाया जाएगा।'],
'tv.now':['Now','अभी'],'tv.min':['~{m} min','~{m} मिनट'],'tv.eta':['Est. call','बुलावा लगभग'],'tv.pos':['Queue position','कतार में नंबर'],'tv.ovt':['Times overtaken','कितनी बार पीछे हुए'],
'tv.awaiting':['Waiting for the officer\'s decision (approved from the staff dashboard)…','अधिकारी के फ़ैसले का इंतज़ार (स्टाफ़ डैशबोर्ड से मंज़ूरी)…'],
'tv.waitfor':['Waiting for the {who} to check in at the kiosk or scan this QR','{who} के कियोस्क पर आने या यह QR स्कैन करने का इंतज़ार'],
'tv.howfix':['How to fix:','कैसे ठीक करें:'],'tv.askmentor':['💬 Ask the mentor','💬 मेंटर से पूछें'],'tv.form':['📥 Download form','📥 फ़ॉर्म डाउनलोड करें'],'tv.formShort':['📥 Form','📥 फ़ॉर्म'],
'tv.coarrived':['👥 Co-holder has arrived (simulate)','👥 दूसरे खाताधारक आ गए (डेमो)'],
'tv.imat':['I\'m at Counter {c}','मैं काउंटर {c} पर हूँ'],
'tv.gracehint':['If you don\'t reach the counter within {g} min, you go on hold and keep your place.','{g} मिनट में काउंटर न पहुँचें तो आप होल्ड पर जाएँगे और जगह बनी रहेगी।'],
'tv.skip':['Demo: skip to grace expiry','डेमो: छूट का समय ख़त्म करें'],'tv.back':['I\'m back in the branch','मैं शाखा में वापस आ गया/गई'],
'tv.again':['Take another token','एक और टोकन लें'],'tv.issued':['Issued','जारी'],'tv.sim':['(sim)','(सिम)'],'tv.alerts':['Alerts','सूचना'],
'tv.alertsPhone':['SMS + WhatsApp ••{n}','SMS + WhatsApp ••{n}'],'tv.alertsLobby':['Lobby screen + voice','लॉबी स्क्रीन + आवाज़'],'tv.priority':['Priority','प्राथमिकता'],'tv.seniorTag':['Senior / PwD','वरिष्ठ / दिव्यांग'],
'tv.scanqr':['Paper token: scan the QR (or tap it) for live status','काग़ज़ी टोकन: लाइव स्थिति के लिए QR स्कैन करें (या दबाएँ)'],'tv.qrTitle':['Open token status page','टोकन स्थिति पेज खोलें'],
'tv.ck.pass':['✅ Done','✅ पूरा'],'tv.ck.running':['⏳ Checking','⏳ जाँच'],'tv.ck.fail':['❌ Fix','❌ ठीक करें'],'tv.ck.pending':['Waiting','बाकी'],
'tv.say':['Token {id}. {h}. {b}. {s}','टोकन {id}। {h}। {b}। {s}'],
'n.action':['ReadyLane: Token {id} needs action. {msg} Open your token page to fix it.','ReadyLane: टोकन {id} पर काम बाकी है। {msg} ठीक करने के लिए अपना टोकन पेज खोलें।'],
'n.called':['ReadyLane: Token {id}, you\'re ready! Please go to Counter {c} within {g} min.','ReadyLane: टोकन {id}, आप तैयार हैं! कृपया {g} मिनट में काउंटर {c} पर जाएँ।'],
'n.held':['ReadyLane: Token {id} is on hold and you keep your place. Tap "I\'m back" when you return.','ReadyLane: टोकन {id} होल्ड पर है, आपकी जगह बनी है। लौटने पर "मैं वापस आ गया" दबाएँ।'],
'n.sms':['SMS to ••{n} (simulated)','••{n} पर SMS (सिमुलेशन)'],'n.wa':['WhatsApp (simulated)','WhatsApp (सिमुलेशन)'],
'n.lobbyvoice':['Lobby screen + voice announcement','लॉबी स्क्रीन + आवाज़ में बुलावा'],'n.lobby':['Lobby screen','लॉबी स्क्रीन'],
/* ---- demo page (dynamic) ---- */
'dm.issued.t':['Token {id} issued','टोकन {id} जारी'],'dm.issued.b':['Checks have started. Scan the QR to follow your token on your phone.','जाँच शुरू हो गई है। फ़ोन पर टोकन देखने के लिए QR स्कैन करें।'],
'dm.jointW.l':['Joint account operated "jointly"','"संयुक्त रूप से" चलने वाला संयुक्त खाता'],
'dm.jointW.h':['All holders must sign, so the co-holder has to check in. ("Either or survivor" accounts don\'t need this.)','सभी खाताधारकों के हस्ताक्षर चाहिए, इसलिए दूसरे खाताधारक का आना ज़रूरी है। ("कोई भी एक या जीवित" खातों में ज़रूरी नहीं।)'],
'dm.jointA.l':['Joint account (2 applicants)','संयुक्त खाता (2 आवेदक)'],'dm.jointA.h':['Both applicants must be present for in-person verification','सामने से जाँच के लिए दोनों आवेदकों का होना ज़रूरी है'],
'dm.h.cwOver':['Above the teller limit of {lim}, so officer pre-approval will be requested in advance.','कैशियर सीमा {lim} से ज़्यादा, इसलिए अधिकारी की मंज़ूरी पहले ही माँगी जाएगी।'],
'dm.h.cwUnder':['Within the teller limit ({lim}), so no officer approval is needed. PAN is not needed to withdraw from your own account.','कैशियर सीमा ({lim}) के अंदर, इसलिए अधिकारी की मंज़ूरी नहीं चाहिए। अपने खाते से निकालने के लिए PAN ज़रूरी नहीं।'],
'dm.h.cdOver':['Above {lim}, so PAN (or Form 60) is mandatory (Income-tax Rule 114B).','{lim} से ज़्यादा, इसलिए PAN (या फ़ॉर्म 60) ज़रूरी है (आयकर नियम 114B)।'],
'dm.h.cdUnder':['Up to {lim}, no PAN needed for a cash deposit.','{lim} तक नकद जमा पर PAN ज़रूरी नहीं।'],
'dm.h.dd':['Debited from your account. DDs of ₹50,000 or more cannot be bought with cash (RBI).','आपके खाते से कटेगा। ₹50,000 या ज़्यादा का DD नकद से नहीं बनता (RBI)।'],
'dm.h.fd':['Funded from your savings account.','आपके बचत खाते से पैसे लगेंगे।'],
'dm.h.min':['Enter an amount of at least {min}.','कम से कम {min} की रकम डालें।'],
'dm.problemHelp':['Shows the "Action needed" flow: {msg}','"काम बाकी" वाला हिस्सा दिखाता है: {msg}'],
'dm.preview':['Your readiness checklist ({n} checks)','आपकी तैयारी चेकलिस्ट ({n} जाँच)'],
'dm.notNeeded':['Not needed for this service: {list}','इस सेवा के लिए ज़रूरी नहीं: {list}'],
'dm.bring':['🧳 Bring with you','🧳 साथ लाएँ'],'dm.forms':['📥 Download the form for this service','📥 इस सेवा का फ़ॉर्म डाउनलोड करें'],
'dm.phoneBad':['Enter a valid 10-digit Indian mobile number, or leave it blank.','सही 10 अंकों का मोबाइल नंबर डालें, या ख़ाली छोड़ दें।'],
'dm.phoneOk':['Without a number you still get the paper token, the QR page, the lobby screen and voice calls.','नंबर न दें तब भी काग़ज़ी टोकन, QR पेज, लॉबी स्क्रीन और आवाज़ में बुलावा मिलेगा।'],
'dm.sim':['Simulated branch · {n} counters · fairness cap K = {K}','सिमुलेटेड शाखा · {n} काउंटर · निष्पक्षता सीमा K = {K}'],'dm.paused':[' · PAUSED on staff dashboard',' · स्टाफ़ डैशबोर्ड पर रुका हुआ'],
'dm.empty':['🎟<br>Take a token to start.','🎟<br>शुरू करने के लिए टोकन लें।'],
'dm.svcSay':['{name}. {blurb}','{name}। {blurb}'],
/* ---- documents page (dynamic) ---- */
'doc.bring':['Bring these','ये साथ लाएँ'],'doc.forms':['Forms to download','डाउनलोड करने वाले फ़ॉर्म'],'doc.download':['Download','डाउनलोड'],
'doc.take':['🎟 Take token for this','🎟 इसके लिए टोकन लें'],'doc.ask':['💬 Ask mentor','💬 मेंटर से पूछें'],
'doc.all':['All','सभी'],'doc.common':['Common forms','आम फ़ॉर्म'],'doc.none':['Nothing found. Try another word, or ask the mentor.','कुछ नहीं मिला। दूसरा शब्द लिखें या मेंटर से पूछें।'],
'doc.count':['{n} shown','{n} दिख रहे हैं'],'doc.pdf':['PDF · {kb} KB · print and fill by hand','PDF · {kb} KB · प्रिंट करके हाथ से भरें'],
'doc.say':['{name}. Bring: {list}.','{name}। साथ लाएँ: {list}।'],
'doc.ifAmountOver':['If amount is above {lim}','अगर रकम {lim} से ज़्यादा है'],'doc.ifUpTo':['If amount is up to {lim}','अगर रकम {lim} तक है'],'doc.ifJoint':['Joint account','संयुक्त खाता'],
/* forms */
'form.account_opening':['Savings account opening form','बचत खाता खोलने का फ़ॉर्म'],'form.kyc_update':['KYC update form','KYC अपडेट फ़ॉर्म'],
'form.deposit_slip':['Cash deposit slip','नकद जमा पर्ची'],'form.withdrawal_slip':['Cash withdrawal slip','नकद निकासी पर्ची'],
'form.dd_request':['DD / pay order request','DD / पे ऑर्डर आवेदन'],'form.fd_form':['Fixed deposit form','फ़िक्स्ड डिपॉज़िट फ़ॉर्म'],
'form.address_change':['Address change request','पता बदलने का आवेदन'],'form.nominee':['Nominee form (add / change / cancel)','नॉमिनी फ़ॉर्म (जोड़ें / बदलें / हटाएँ)'],
'form.form60_info':['PAN & Form 60 information sheet','PAN और फ़ॉर्म 60 जानकारी पत्र'],'form.id_checklist':['ID documents checklist','पहचान दस्तावेज़ चेकलिस्ट'],
'form.loan_checklist':['Loan enquiry form & checklist','लोन पूछताछ फ़ॉर्म और चेकलिस्ट'],
'formd.account_opening':['Personal details, address, KYC, joint holder, nominee and signatures.','निजी जानकारी, पता, KYC, संयुक्त खाताधारक, नॉमिनी और हस्ताक्षर।'],
'formd.kyc_update':['Re-KYC with self-declaration or new address proof.','स्व-घोषणा या नए पते के प्रमाण के साथ री-KYC।'],
'formd.deposit_slip':['Note count table, PAN box for cash above ₹50,000, customer copy.','नोट गिनती की तालिका, ₹50,000 से ज़्यादा पर PAN, ग्राहक की प्रति।'],
'formd.withdrawal_slip':['Amount in figures and words, signatures for joint holders.','अंकों और शब्दों में रकम, संयुक्त खाताधारकों के हस्ताक्षर।'],
'formd.dd_request':['Payee name, "payable at" city, amount and payment mode.','पाने वाले का नाम, "भुगतान शहर", रकम और भुगतान का तरीक़ा।'],
'formd.fd_form':['Amount, period, interest payout, 15G/15H and nominee.','रकम, अवधि, ब्याज भुगतान, 15G/15H और नॉमिनी।'],
'formd.address_change':['Old and new address with the proof you attach.','पुराना और नया पता, साथ में प्रमाण।'],
'formd.nominee':['Nominee, guardian (if minor) and witnesses for thumb impression.','नॉमिनी, अभिभावक (नाबालिग हो तो) और अँगूठे के निशान पर गवाह।'],
'formd.form60_info':['When PAN or Form 60 is needed and what Form 60 asks for.','PAN या फ़ॉर्म 60 कब ज़रूरी है और फ़ॉर्म 60 में क्या पूछा जाता है।'],
'formd.id_checklist':['Valid IDs and what to bring for each service. Tick and carry.','मान्य पहचान पत्र और हर सेवा के लिए क्या लाएँ। ✓ करें और साथ रखें।'],
'formd.loan_checklist':['Loan type, income and the documents list.','लोन का प्रकार, आय और दस्तावेज़ों की सूची।'],
/* bring items */
'b.wslip':['Filled withdrawal slip with passbook, or a self cheque','भरी हुई निकासी पर्ची और पासबुक, या सेल्फ़ चेक'],
'b.words':['Amount in words and figures must match','रकम शब्दों और अंकों में एक जैसी हो'],
'b.nopan_w':['No PAN needed to withdraw from your own account','अपने खाते से निकालने के लिए PAN ज़रूरी नहीं'],
'b.officer':['Above {lim} (demo teller limit): officer approval, ReadyLane asks in advance','{lim} से ज़्यादा (डेमो कैशियर सीमा): अधिकारी की मंज़ूरी, ReadyLane पहले से माँगता है'],
'b.jointw':['"Jointly" operated account: the co-holder must come and sign too','"संयुक्त रूप से" चलने वाला खाता: दूसरे खाताधारक को भी आकर हस्ताक्षर करने होंगे'],
'b.dslip':['Filled deposit slip (account number, name, note count)','भरी हुई जमा पर्ची (खाता संख्या, नाम, नोटों की गिनती)'],
'b.cash':['The cash, sorted by note value','नकद, नोटों के हिसाब से अलग करके'],
'b.pan50':['Above {lim}: PAN card, or Form 60 if you have no PAN','{lim} से ज़्यादा: PAN कार्ड, या PAN न हो तो फ़ॉर्म 60'],
'b.nopan_d':['Up to {lim}: no PAN needed','{lim} तक: PAN ज़रूरी नहीं'],
'b.ovd':['ID & address proof: Aadhaar, passport, voter ID, driving licence, NREGA job card or NPR letter','पहचान और पते का प्रमाण: आधार, पासपोर्ट, वोटर ID, ड्राइविंग लाइसेंस, नरेगा जॉब कार्ड या NPR पत्र'],
'b.panf60':['PAN card, or Form 60 if you have no PAN','PAN कार्ड, या PAN न हो तो फ़ॉर्म 60'],
'b.photo':['2 recent passport-size photos','2 हाल की पासपोर्ट साइज़ फ़ोटो'],
'b.aoform':['Filled account opening form','भरा हुआ खाता खोलने का फ़ॉर्म'],
'b.jointao':['Joint account: every applicant brings these and comes in person','संयुक्त खाता: हर आवेदक यह सब लाए और ख़ुद आए'],
'b.kycform':['Filled KYC update form','भरा हुआ KYC अपडेट फ़ॉर्म'],
'b.ovd1':['One valid ID: Aadhaar, passport or voter ID','एक मान्य पहचान पत्र: आधार, पासपोर्ट या वोटर ID'],
'b.pan':['PAN card (or Form 60)','PAN कार्ड (या फ़ॉर्म 60)'],
'b.adform':['Filled address change request','भरा हुआ पता बदलने का आवेदन'],
'b.newaddr':['Proof of new address: Aadhaar, passport, voter ID or driving licence','नए पते का प्रमाण: आधार, पासपोर्ट, वोटर ID या ड्राइविंग लाइसेंस'],
'b.bill':['Or a utility bill not older than 2 months','या 2 महीने से पुराना न हो ऐसा बिजली/पानी/गैस बिल'],
'b.ddform':['Filled DD request form','भरा हुआ DD आवेदन फ़ॉर्म'],
'b.payee':['Payee name and "payable at" city','पाने वाले का नाम और "भुगतान शहर"'],
'b.dddebit':['Paid from your account, so no cash is needed','आपके खाते से कटेगा, नकद नहीं चाहिए'],
'b.dd50':['₹50,000 or more: cannot be paid in cash','₹50,000 या ज़्यादा: नकद से नहीं बनता'],
'b.fdform':['Signed FD form (amount, period, interest payout)','हस्ताक्षर किया FD फ़ॉर्म (रकम, अवधि, ब्याज भुगतान)'],
'b.panfd':['PAN on record, otherwise higher TDS is cut','PAN दर्ज हो, नहीं तो ज़्यादा TDS कटेगा'],
'b.nominee':['Nominee details (recommended)','नॉमिनी का ब्योरा (सलाह दी जाती है)'],
'b.15gh':['Form 15G / 15H only if your income is below the taxable limit','फ़ॉर्म 15G / 15H सिर्फ़ तब, जब आय टैक्स सीमा से कम हो'],
'b.idpan':['ID, address proof and PAN','पहचान पत्र, पते का प्रमाण और PAN'],
'b.income':['Last 3 salary slips, or 2 years ITR if self-employed','पिछली 3 सैलरी स्लिप, या अपना काम हो तो 2 साल का ITR'],
'b.stmt':['Last 6 months bank statement','पिछले 6 महीने का बैंक स्टेटमेंट'],
/* ---- mentor (dynamic) ---- */
'mt.greet':['Namaste! 🙏 I\'m the ReadyLane mentor. Ask me which documents you need for a bank service, like opening an account, a KYC update, a large cash withdrawal, a DD or a loan.','नमस्ते! 🙏 मैं ReadyLane मेंटर हूँ। मुझसे पूछें कि किसी बैंक सेवा के लिए कौन-से दस्तावेज़ चाहिए, जैसे खाता खोलना, KYC अपडेट, बड़ी रकम निकालना, DD या लोन।'],
'mt.hi':['Namaste! 🙏 Ask me which documents you need for any bank service, or tap a topic below.','नमस्ते! 🙏 किसी भी बैंक सेवा के दस्तावेज़ों के बारे में पूछें, या नीचे कोई विषय दबाएँ।'],
'mt.otp':['<b>Never share your OTP, PIN, CVV or password</b> with anyone, including bank staff or this mentor. The bank will never ask for them.','<b>अपना OTP, PIN, CVV या पासवर्ड किसी को न बताएँ</b>, बैंक स्टाफ़ या इस मेंटर को भी नहीं। बैंक कभी ये नहीं माँगता।'],
'mt.confirm':['General guidance. Please confirm bank-specific limits at your branch.','यह सामान्य जानकारी है। बैंक की सीमाएँ अपनी शाखा से पक्की कर लें।'],
'mt.unknown':['I\'m not sure about that one yet. Try one of these topics, or <b>talk to a human mentor</b>:','इसका जवाब मुझे अभी नहीं पता। इनमें से कोई विषय चुनें, या <b>किसी व्यक्ति (मेंटर) से बात करें</b>:'],
'mt.humanChip':['🙋 Human mentor','🙋 व्यक्ति से बात'],
'mt.bot':['ReadyLane Mentor','ReadyLane मेंटर'],'mt.botSub':['Instant answers · general guidance','तुरंत जवाब · सामान्य जानकारी'],
'mt.toHuman':['🙋 Talk to a human mentor','🙋 व्यक्ति (मेंटर) से बात करें'],'mt.toBot':['↩ Back to instant answers','↩ तुरंत जवाब पर लौटें'],
'mt.connecting':['Connecting you to a branch mentor… (simulated, no real person or data is involved)','शाखा मेंटर से जोड़ रहे हैं… (सिमुलेशन, कोई असली व्यक्ति या डेटा नहीं)'],
'mt.joined':['Priya S. joined the chat','प्रिया एस. चैट में जुड़ीं'],'mt.priya':['Priya S. · Branch mentor','प्रिया एस. · शाखा मेंटर'],
'mt.priyaSub':['SmartQ Bank · typically replies in 1–2 min (simulated)','SmartQ Bank · आमतौर पर 1–2 मिनट में जवाब (सिमुलेशन)'],
'mt.backBot':['Back to instant answers','तुरंत जवाब पर वापस'],
'mt.hr0':['Thanks for waiting! I\'m Priya, a branch mentor at SmartQ Bank. {topic}How can I help?','इंतज़ार के लिए धन्यवाद! मैं प्रिया, SmartQ Bank की शाखा मेंटर हूँ। {topic}मैं कैसे मदद करूँ?'],
'mt.hr0t':['I see you were asking about <b>{t}</b>. ','मैं देख रही हूँ कि आप <b>{t}</b> के बारे में पूछ रहे थे। '],
'mt.hr1':['Understood. If you already have a token, I can add a note to it so the counter staff are prepared. You can also come to <b>Help Desk 1</b> near the entrance.','समझ गई। अगर आपके पास टोकन है, तो मैं उसमें नोट जोड़ सकती हूँ ताकि काउंटर स्टाफ़ तैयार रहे। आप गेट के पास <b>हेल्प डेस्क 1</b> पर भी आ सकते हैं।'],
'mt.hr2':['Sure. Bring the original documents along with one self-attested photocopy each. If anything is missing, ReadyLane will tell you before you reach the counter.','ज़रूर। मूल दस्तावेज़ और हर एक की एक स्व-सत्यापित फ़ोटोकॉपी लाएँ। कुछ कमी होगी तो ReadyLane काउंटर से पहले ही बता देगा।'],
'mt.hr3':['Happy to help! Anything else? You can switch back to instant answers at any time.','मदद करके ख़ुशी हुई! और कुछ? आप कभी भी तुरंत जवाब पर लौट सकते हैं।'],
'mt.amt':['For your amount ({amt}): ','आपकी रकम ({amt}) के लिए: '],
'mt.dep.over':['<b>PAN or Form 60 is required.</b>','<b>PAN या फ़ॉर्म 60 ज़रूरी है।</b>'],'mt.dep.under':['no PAN needed for a single-day cash deposit up to ₹50,000.','एक दिन में ₹50,000 तक नकद जमा पर PAN ज़रूरी नहीं।'],
'mt.wd.over':['above the demo teller limit of ₹2,00,000, so <b>officer approval</b> is needed. ReadyLane requests it in advance.','₹2,00,000 की डेमो कैशियर सीमा से ज़्यादा, इसलिए <b>अधिकारी की मंज़ूरी</b> चाहिए। ReadyLane पहले से माँग लेता है।'],
'mt.wd.under':['within the demo teller limit, so no officer approval is needed.','डेमो कैशियर सीमा के अंदर, इसलिए अधिकारी की मंज़ूरी नहीं चाहिए।'],
'mt.dd.over':['<b>must be paid from your account or by cheque</b>, not cash.','<b>खाते से या चेक से भुगतान करना होगा</b>, नकद से नहीं।'],'mt.dd.under':['can be paid by account debit or cash.','खाते से या नकद, दोनों से भुगतान हो सकता है।'],
'mt.dl':['📥 Download the form','📥 फ़ॉर्म डाउनलोड करें'],'mt.dlAll':['📄 See all documents','📄 सभी दस्तावेज़ देखें'],
/* ---- lobby (dynamic) ---- */
'lb.voiceOn':['🔊 Voice on','🔊 आवाज़ चालू'],'lb.voiceOff':['🔈 Enable voice announcements','🔈 आवाज़ में बुलावा चालू करें'],'lb.voiceNo':['Voice not supported in this browser','इस ब्राउज़र में आवाज़ नहीं है'],
'lb.enabled':['Voice announcements enabled','आवाज़ में बुलावा चालू हो गया'],
'lb.tv':['⛶ TV mode','⛶ TV मोड'],'lb.tvExit':['✕ Exit TV mode','✕ TV मोड बंद'],'lb.simtime':['SIMULATED TIME','सिमुलेटेड समय'],'lb.k':['Fair-Skip cap K = {K}','Fair-Skip सीमा K = {K}'],
'lb.goto':['Please go to Counter {c}','कृपया काउंटर {c} पर जाएँ'],
'lb.say':['Token {id}, please go to counter {c}','टोकन {id}, कृपया काउंटर {c} पर जाएँ'],
'lb.counter':['Counter {c}','काउंटर {c}'],'lb.calledCome':['Called, please come','बुलाया गया, कृपया आइए'],'lb.serving':['Serving','काम जारी'],
'lb.reserved':['Reserved (fairness cap)','आरक्षित (निष्पक्षता सीमा)'],'lb.free':['Free','ख़ाली'],'lb.none':['None','कोई नहीं'],
'lb.heldTile':['On hold, missed call','होल्ड पर, बुलावा छूटा'],'lb.seePhone':['See your phone<br>or help desk','अपना फ़ोन देखें<br>या हेल्प डेस्क'],
'lb.next':['Next counter','अगला काउंटर'],'lb.capPrio':['⚖ Cap priority','⚖ सीमा प्राथमिकता'],
/* ---- staff (dynamic) ---- */
'sf.play':['▶ Play','▶ चलाएँ'],'sf.pause':['⏸ Pause','⏸ रोकें'],'sf.pauseFirst':['Pause first to step','पहले रोकें, फिर एक-एक मिनट आगे बढ़ाएँ'],
'sf.clock':['Sim time {t} · tick {n}','सिम समय {t} · टिक {n}'],
'sf.k.wait':['Waiting (checking / action / ready)','इंतज़ार में (जाँच / काम बाकी / तैयार)'],'sf.k.ready':['Ready to call','बुलाने को तैयार'],'sf.k.action':['Action needed','काम बाकी'],
'sf.k.locked':['Locked at cap (priority)','सीमा पर लॉक (प्राथमिकता)'],'sf.k.max':['Highest overtake count vs cap','सबसे ज़्यादा बार पीछे होना बनाम सीमा'],
'sf.prio':['Priority','प्राथमिकता'],'sf.prioTitle':['Senior citizen / person with disability','वरिष्ठ नागरिक / दिव्यांग'],'sf.you':['you','आप'],
'sf.locked':['Locked · {s}','लॉक · {s}'],'sf.noTokens':['No tokens','कोई टोकन नहीं'],
'sf.counter':['COUNTER {c}','काउंटर {c}'],'sf.calledGrace':['Called, grace {t} left','बुलाया गया, छूट {t} बाकी'],'sf.walking':['Called, walking to counter','बुलाया गया, काउंटर की ओर'],
'sf.servingLeft':['Serving · {m} min left','काम जारी · {m} मिनट बाकी'],'sf.reservedFor':['Reserved for capped token','सीमा वाले टोकन के लिए आरक्षित'],'sf.waitReady':['Waiting for a ready token','तैयार टोकन का इंतज़ार'],
'sf.free':['Free','ख़ाली'],'sf.drawer':['Drawer {a} · earmarked {b}','दराज़ {a} · अलग रखे {b}'],
'sf.file':['Prepared file for {id} at Counter {c}','काउंटर {c} पर {id} की तैयार फ़ाइल'],'sf.fileSub':['(teller sees this before the customer arrives)','(ग्राहक के आने से पहले कैशियर यह देखता है)'],
'sf.noCust':['Counter {c} has no customer right now.','काउंटर {c} पर अभी कोई ग्राहक नहीं।'],
'sf.open':['{n} open','{n} बाकी'],'sf.capPrio':['Cap priority','सीमा प्राथमिकता'],
'sf.awaitYou':['awaiting your decision','आपके फ़ैसले का इंतज़ार'],'sf.visitDesk':['customer asked to visit desk','ग्राहक को डेस्क पर बुलाया'],'sf.later':['requested once earlier checks pass','पिछली जाँच पूरी होने पर माँगी जाएगी'],
'sf.approve':['Approve','मंज़ूर करें'],'sf.reject':['Ask to visit desk','डेस्क पर बुलाएँ'],'sf.noAppr':['No pending approvals.','कोई मंज़ूरी बाकी नहीं।'],
'sf.rule':['<b>K = {K}.</b> Each time a later token is called first, every earlier waiting token gets +1 overtake. A token at {K}/{K} is locked: no later token may be called before it.','<b>K = {K}.</b> जब भी बाद वाला टोकन पहले बुलाया जाता है, पहले से इंतज़ार कर रहे हर टोकन का +1 होता है। {K}/{K} वाला टोकन लॉक हो जाता है: बाद वाला कोई टोकन उससे पहले नहीं बुलाया जा सकता।'],
'sf.ruleNow':['<b>Now:</b> {id} is locked ({o}/{K}). ','<b>अभी:</b> {id} लॉक है ({o}/{K})। '],
'sf.ruleReady':['It is ready and gets the next free counter.','यह तैयार है और अगला ख़ाली काउंटर इसे मिलेगा।'],
'sf.ruleClearing':['The help desk is clearing its pending items. Only tokens that arrived before it can be called meanwhile.','हेल्प डेस्क इसकी बाकी चीज़ें निपटा रहा है। तब तक सिर्फ़ इससे पहले आए टोकन बुलाए जा सकते हैं।'],
'sf.ruleNone':['<b>Now:</b> no token is at the cap.','<b>अभी:</b> कोई टोकन सीमा पर नहीं है।'],
/* ---- status page (dynamic) ---- */
'stp.yours':[' · your token',' · आपका टोकन'],'stp.youShort':[' (you)',' (आप)'],
'stp.notActive':['Token <b>{id}</b> isn\'t active in this simulated branch. It may already be served, or it was issued on another device.','टोकन <b>{id}</b> इस सिमुलेटेड शाखा में चालू नहीं है। शायद काम पूरा हो गया, या यह किसी दूसरे डिवाइस पर लिया गया था।'],
'stp.other':['Check another token','दूसरा टोकन देखें'],
/* ---- index fairness animation ---- */
'ix.f0':['C-12 is waiting for officer approval. A-12, C-13, R-11 and A-13 are already ready.','C-12 अधिकारी की मंज़ूरी का इंतज़ार कर रहा है। A-12, C-13, R-11 और A-13 पहले से तैयार हैं।'],
'ix.f1':['A-12 (ready) is served first. C-12 overtaken 1/3.','A-12 (तैयार) को पहले बुलाया गया। C-12 पीछे हुआ 1/3।'],
'ix.f2':['C-13 is served. C-12 overtaken 2/3.','C-13 को बुलाया गया। C-12 पीछे हुआ 2/3।'],
'ix.f3':['R-11 is served. C-12 hits the cap 3/3 and is LOCKED: help desk escalates, next counter reserved.','R-11 को बुलाया गया। C-12 सीमा 3/3 पर पहुँचा और लॉक हुआ: हेल्प डेस्क को भेजा, अगला काउंटर आरक्षित।'],
'ix.f4':['Approval is fast-tracked and C-12 is served next. A-13 cannot overtake it, even though A-13 was ready.','मंज़ूरी तुरंत हुई और C-12 को अगला बुलाया गया। A-13 तैयार होने पर भी इसे पीछे नहीं कर सकता।'],
'ix.t.c12':['₹4.5L · approval','₹4.5 लाख · मंज़ूरी'],'ix.t.kyc':['KYC','KYC'],'ix.t.dep':['deposit','जमा'],'ix.t.dd':['DD','DD'],'ix.t.addr':['address','पता'],
};
/* Static page text: English stays in the HTML, Hindi lives here. */
const HI={
/* index */
'ix.title':'ReadyLane — SmartQ Bank: काम तैयार होने पर ही बुलाने वाली कतार',
'ix.h1':'वह कतार जो आपको तभी बुलाती है जब आपका काम <span class="hl">पहले से तैयार हो।</span>',
'ix.lead':'टोकन लेते ही ReadyLane आपकी सेवा के लिए ज़रूरी हर चीज़ जाँचना शुरू कर देता है: दस्तावेज़, रिकॉर्ड, अधिकारी की मंज़ूरी, काउंटर पर नकद और संयुक्त खाताधारक। सारी जाँच पूरी होने पर ही आपको बुलाया जाता है। कुछ कमी हो तो काउंटर पहुँचने से पहले ही तुरंत पता चल जाता है।',
'ix.cta1':'▶ ग्राहक डेमो आज़माएँ','ix.cta2':'निष्पक्षता सीमा लाइव देखें',
'ix.pill1':'✓ तैयारी की जाँच','ix.pill2':'⚖ पक्की निष्पक्षता सीमा','ix.pill3':'🎟 काग़ज़ी टोकन + QR','ix.pill4':'📺 लॉबी TV + आवाज़','ix.pill5':'💬 बैंक मेंटर','ix.pill6':'🇮🇳 हिंदी + आसान मोड',
'ix.ph.svc':'नकद निकासी · ₹3,00,000','ix.ph.chip':'जाँच जारी · लगभग 6 मिनट',
'ix.ph.d1':'अंक, शब्द और हस्ताक्षर','ix.ph.d2':'बैलेंस ठीक · हस्ताक्षर नमूना तैयार','ix.ph.d3':'₹2,00,000 की कैशियर सीमा से ज़्यादा','ix.ph.d4':'दराज़ और नोटों की जाँच','ix.ph.l5':'संयुक्त खाताधारक मौजूद','ix.ph.d5':'SyncToken हाज़िरी','ix.ph.note':'उदाहरण स्क्रीन (सिमुलेशन)',
'ix.fc1':'<b>अगला: WhatsApp संदेश</b>"C-19, आप तैयार हैं। काउंटर 2 पर जाएँ"','ix.fc2':'<b>Fair-Skip</b>किसी को भी K बार से ज़्यादा पीछे नहीं किया जाता',
'ix.cust.eb':'ग्राहक हैं?','ix.cust.h':'यहाँ से शुरू करें','ix.cust.t1':'टोकन लें','ix.cust.t2':'फ़ॉर्म और दस्तावेज़','ix.cust.t3':'सवाल पूछें','ix.cust.t4':'मेरा टोकन',
'ix.pr.eb':'समस्या','ix.pr.h':'बैंक की कतार में समय बर्बाद होता है, काउंटर पर पहुँचने के बाद भी।',
'ix.pr.1':'कितना इंतज़ार, इसका कोई अंदाज़ा नहीं','ix.pr.2':'भीड़ के समय काउंटर पर भारी भीड़','ix.pr.3':'लंबे समय तक लाइन में खड़े रहना','ix.pr.4':'बुज़ुर्ग और दिव्यांग ग्राहकों को सबसे ज़्यादा परेशानी',
'ix.pr.call':'<b>छिपी परेशानी:</b> आख़िर में काउंटर पर पहुँचते हैं और किसी दस्तावेज़ या मंज़ूरी की कमी से लौटा दिए जाते हैं। पूरा इंतज़ार बेकार गया, और कैशियर का समय भी।',
'ix.pr.alt':'भीड़ भरी बैंक शाखा',
'ix.ex.eb':'पहले से क्या मौजूद है','ix.ex.h':'टोकन और ट्रैकिंग पहले से हैं। "तैयारी" नहीं।','ix.ex.p':'सिर्फ़ टोकन और ट्रैकिंग पर पेटेंट नहीं मिल सकता, इसलिए हमें कुछ नया चाहिए था।',
'ix.ex.1h':'कतार सिस्टम','ix.ex.1p':'Qmatic, Wavetec, Qminder QR टोकन, इंतज़ार का अनुमान और लाइव ट्रैकिंग देते हैं। Wavetec प्राथमिकता नियम और सेवा के हिसाब से रूटिंग भी देता है।',
'ix.ex.2h':'कतार और प्री-स्टेजिंग पेटेंट','ix.ex.2p':'US 11,676,080 और US 11,770,477 (टोकन + ETA)। US 9,432,804 और US 11,715,084 बैंक लेनदेन पहले से तैयार करते हैं।',
'ix.ex.3h':'भारत','ix.ex.3p':'आवेदन 202541030105 QR कतार और ETA अलर्ट को कवर करता है। इनमें से कोई भी बुलावे को तैयारी पर निर्भर नहीं करता और न ही पीछे किए जाने की सीमा तय करता है।',
'ix.how.eb':'ReadyLane कैसे काम करता है','ix.how.h':'टोकन से काउंटर तक, सब पहले से तैयार',
'ix.how.1h':'टोकन लें, सेवा बताएँ','ix.how.1p':'ऐप, कियोस्क या स्टाफ़ हेल्पर से। काग़ज़ी टोकन पर QR कोड मिलता है।',
'ix.how.2h':'आपकी सेवा के लिए चेकलिस्ट','ix.how.2p':'₹3 लाख की निकासी के लिए अधिकारी की मंज़ूरी और नकद चाहिए। KYC अपडेट के लिए दोनों नहीं।',
'ix.how.3h':'इंतज़ार के दौरान जाँच','ix.how.3p':'कुछ कमी हो तो फ़ोन, SMS या लॉबी स्क्रीन पर तुरंत सुधार का संदेश मिलता है।',
'ix.how.4h':'टोकन "तैयार" होता है','ix.how.4p':'ख़ाली काउंटर पर बुलाया जाता है (निकासी में, वही काउंटर जहाँ आपका नकद रखा है)।',
'ix.how.5h':'कैशियर के पास तैयार स्क्रीन','ix.how.5p':'दस्तावेज़, हस्ताक्षर नमूना और मंज़ूरी पहले से लोड, इसलिए काम जल्दी होता है।',
'ix.how.eta':'ETA = बची हुई जाँच का समय या काउंटर का अनुमानित इंतज़ार, जो भी ज़्यादा हो, क्योंकि जाँच आपके इंतज़ार के साथ-साथ चलती है।',
'ix.ck.eb':'तैयारी की चेकलिस्ट','ix.ck.h':'पाँच जाँच, सिर्फ़ वहीं जहाँ ज़रूरत हो','ix.ck.p':'हर सेवा की अपनी चेकलिस्ट है। पता बदलवाने वाले को नकद जाँच का इंतज़ार नहीं करना पड़ता।',
'ix.ck.1h':'दस्तावेज़ पूरे','ix.ck.1p':'स्कैन करके जाँचे जाते हैं, जैसे ₹50,000 से ज़्यादा नकद जमा पर PAN या फ़ॉर्म 60, या DD फ़ॉर्म पर पाने वाले का ब्योरा।','ix.ck.1a':'लागू: हर सेवा',
'ix.ck.2h':'रिकॉर्ड मिलान','ix.ck.2p':'कोर बैंकिंग जाँच: खाते की स्थिति, बैलेंस, CKYC। कैशियर के लिए हस्ताक्षर नमूना पहले से लोड।','ix.ck.2a':'लागू: हर सेवा',
'ix.ck.3h':'अधिकारी की पहले से मंज़ूरी','ix.ck.3p':'रकम कैशियर सीमा से ज़्यादा हो तो पहले ही माँगी जाती है (इस डेमो में ₹2,00,000; बैंक की नीति से तय), साथ ही खाता खोलने और लोन डेस्क के लिए।','ix.ck.3a':'लागू: बड़ी निकासी, खाता खोलना, लोन की जानकारी',
'ix.ck.4h':'नकद तैयार (CashMatch)','ix.ck.4p':'पक्का करता है कि काउंटर की दराज़ में सही नोटों में रकम है और उसे अलग रखता है, ज़रूरत हो तो तिजोरी से भरता है।','ix.ck.4a':'लागू: सिर्फ़ नकद निकासी',
'ix.ck.5h':'सब मौजूद (SyncToken)','ix.ck.5p':'संयुक्त खाताधारक, दूसरे आवेदक, नॉमिनी या देखभाल करने वाले उसी टोकन पर हाज़िरी लगाते हैं।','ix.ck.5a':'लागू: संयुक्त रूप से चलने वाले खाते से निकासी, संयुक्त खाता खोलना',
'ix.ck.6h':'तुरंत सुधार अलर्ट','ix.ck.6p':'कोई जाँच फ़ेल हो तो टोकन पर <b>काम बाकी</b> और सटीक सुधार दिखता है (PAN अपलोड करें, पर्ची पर फिर से हस्ताक्षर करें)। आपकी जगह बनी रहती है।','ix.ck.6a':'लागू: कोई भी फ़ेल जाँच',
'ix.fa.eb':'Fair-Skip गारंटी','ix.fa.h':'तैयार ग्राहक पहले। किसी को हमेशा के लिए पीछे नहीं किया जाता।',
'ix.fa.1':'तैयार ग्राहकों का काम उन टोकन से पहले होता है जिनकी जाँच अभी चल रही है','ix.fa.2':'हर बार जब बाद वाला टोकन पहले बुलाया जाता है, आपका <b>पीछे किए जाने का काउंटर</b> 1 बढ़ता है',
'ix.fa.3':'<b>K बार</b> पीछे होने पर आपका टोकन लॉक हो जाता है: आपके बाद आया कोई भी आपसे पहले नहीं बुलाया जा सकता','ix.fa.4':'सीमा पूरी? हेल्प डेस्क आपकी बाकी चीज़ें निपटाता है और अगला सही काउंटर आपके लिए रखा जाता है',
'ix.fa.5':'बुज़ुर्ग और दिव्यांग ग्राहकों को तैयार कतार में प्राथमिकता मिलती रहती है','ix.fa.btn':'स्टाफ़ डैशबोर्ड पर देखें →',
'ix.fa.ex':'K = 3 का उदाहरण','ix.fa.replay':'↻ फिर से चलाएँ','ix.fa.p':'C-12 को ₹4.5 लाख के लिए अधिकारी की मंज़ूरी चाहिए। बाद में आए जो ग्राहक पहले से तैयार हैं, सीमा तक पहले बुलाए जाते हैं।',
'ix.fa.leg':'संकेत:','ix.fa.l1':'जाँच','ix.fa.l2':'तैयार','ix.fa.l3':'लॉक',
'ix.ph2.eb':'काग़ज़ी टोकन · सबके लिए','ix.ph2.h':'स्मार्टफ़ोन नहीं है? फिर भी खड़े होकर इंतज़ार नहीं।',
'ix.ph2.p':'कियोस्क एक स्मार्ट काग़ज़ी टोकन छापता है, जिस पर टोकन नंबर, कतार में जगह, अनुमानित इंतज़ार और QR कोड होता है। स्टाफ़ हेल्पर या कियोस्क स्कैनर दस्तावेज़ जाँचता है, इसलिए आपको भी ReadyLane का पूरा फ़ायदा मिलता है।',
'ix.ph2.alt':'QR कोड वाला SmartQ Bank का काग़ज़ी टोकन A-24',
'ix.ph2.1h':'QR स्कैन करें','ix.ph2.1p':'किसी भी फ़ोन ब्राउज़र में लाइव टोकन पेज खुलता है। न ऐप, न लॉगिन।',
'ix.ph2.2p':'कियोस्क पर फ़ोन नंबर दें (ज़रूरी नहीं) और "काम बाकी" व "आपको बुलाया गया" के संदेश पाएँ।',
'ix.ph2.3h':'लॉबी TV + आवाज़','ix.ph2.3p':'स्क्रीन पर हर टोकन "जाँच जारी", "तैयार", "बुलाया गया" या "काम बाकी" के रूप में दिखता है। बुलावा ज़ोर से बोला जाता है।',
'ix.ph2.4h':'5 मिनट की छूट','ix.ph2.4p':'बाहर गए थे? आपका बुलावा 5 मिनट तक खुला रहता है। चूक गए तो होल्ड पर जाते हैं और जगह बनी रहती है, सबसे पीछे नहीं।',
'ix.mt.eb':'बैंक मेंटर','ix.mt.h':'क्या लाना है, पता नहीं? घर से निकलने से पहले पूछ लें।',
'ix.mt.p':'ReadyLane मेंटर रोज़मर्रा के बैंकिंग सवालों के जवाब देता है: खाता खोलने के लिए कौन-से दस्तावेज़, PAN कब ज़रूरी है, KYC कैसे अपडेट करें, DD फ़ॉर्म में क्या भरें। बाकी सवालों के लिए आप शाखा के मेंटर से बात कर सकते हैं।',
'ix.mt.btn':'💬 मेंटर खोलें','ix.mt.docs':'📄 फ़ॉर्म डाउनलोड करें','ix.mt.q':'75,000 नकद जमा के लिए क्या चाहिए?',
'ix.mt.a':'<b>₹50,000 से ज़्यादा नकद जमा</b><br>भरी हुई जमा पर्ची और अपना <b>PAN कार्ड</b> लाएँ। PAN नहीं है तो <b>फ़ॉर्म 60</b> भरें (आयकर नियम 114B)।',
'ix.pt.eb':'पेटेंट क्यों मिल सकता है','ix.pt.h':'नया मेल: तैयारी की शर्त + Fair-Skip सीमा',
'ix.pt.1b':'प्री-स्टेजिंग पेटेंट (US 9,432,804)','ix.pt.1p':'तैयार लेनदेन को कतार में रखते हैं, पर बुलावे को जाँच पर निर्भर नहीं करते।',
'ix.pt.2p':'कमी वाले दस्तावेज़ बताता है, पर कतार को नियंत्रित नहीं करता।','ix.pt.3p':'कतार का क्रम बदलता है, पर निष्पक्षता की कोई गारंटी नहीं।',
'ix.pt.tag':'दावा 1','ix.pt.claim':'टोकन को <u>तभी बुलाया जा सकता है जब सारी तैयारी जाँच पूरी हों</u>। टोकन आने के क्रम से हटकर बुलाए जा सकते हैं, <u>पर पीछे किए जाने की अधिकतम सीमा के साथ</u>, और तैयार रिकॉर्ड काउंटर पर भेजा जाता है।',
'ix.pt.dep':'<b>आश्रित दावे:</b> सीमा पर एस्केलेशन, अधिकारी की पहले से मंज़ूरी, CashMatch, SyncToken, ETA मॉडल। तकनीकी प्रभाव के रूप में तैयार (पेटेंट अधिनियम, धारा 3(k))।',
'ix.im.eb':'अनुमानित असर','ix.im.h':'पायलट में हम क्या दिखने की उम्मीद करते हैं','ix.im.p':'<b>हमारे डेक के अनुमान, पायलट में जाँचे जाएँगे।</b> ये अनुमान हैं, मापे गए नतीजे नहीं।',
'ix.im.1':'दस्तावेज़ वाली सेवाओं में काउंटर का समय कम <i>(अनुमान)</i>','ix.im.2':'प्रति काउंटर-घंटा ज़्यादा ग्राहक <i>(अनुमान)</i>','ix.im.3s':'ज़्यादातर',
'ix.im.3':'दोबारा आने ("दस्तावेज़ X लेकर आइए") से बचाव <i>(अनुमान)</i>','ix.im.4':'प्रति ग्राहक पीछे किए जाने की सीमा: डिज़ाइन से पक्की, अनुमान नहीं',
'ix.im.pilot':'<b>पायलट योजना:</b> 1 शाखा। काउंटर का समय, दोबारा आना, इंतज़ार और पीछे किए जाने की गिनती मापेंगे।',
'ix.pro.eb':'ऐप प्रोटोटाइप','ix.pro.h':'मोबाइल का सफ़र (डिज़ाइन स्क्रीन)',
'ix.dl.eb':'लाइव MVP','ix.dl.h':'ReadyLane का हर हिस्सा आज़माएँ','ix.dl.p':'सभी स्क्रीन एक ही सिमुलेटेड शाखा से जुड़ी हैं, इसलिए डेमो में लिया टोकन लॉबी TV और स्टाफ़ डैशबोर्ड पर भी दिखता है।',
'ix.dl.1h':'ग्राहक डेमो','ix.dl.1p':'सेवा चुनें, QR टोकन लें और अपनी चेकलिस्ट पूरी होते देखें।','ix.dl.2h':'लॉबी स्क्रीन','ix.dl.2p':'लाइव स्थिति और आवाज़ में बुलावे वाली TV स्क्रीन।',
'ix.dl.3h':'स्टाफ़ डैशबोर्ड','ix.dl.3p':'कतार, पहले से मंज़ूरी, नकद दराज़ और निष्पक्षता सीमा।','ix.dl.4h':'टोकन स्थिति (QR)','ix.dl.4p':'काग़ज़ी टोकन स्कैन करने के बाद ग्राहक क्या देखता है।',
'ix.dl.5h':'बैंक मेंटर','ix.dl.5p':'पूछें कौन-से दस्तावेज़ चाहिए, या किसी व्यक्ति से बात करें।','ix.dl.6h':'दस्तावेज़ और फ़ॉर्म','ix.dl.6p':'हर सेवा के नमूना फ़ॉर्म डाउनलोड करें, प्रिंट करें और हाथ से भरें।',
/* demo */
'dm.title':'टोकन लें · ReadyLane','dm.eb':'ग्राहक डेमो · कियोस्क / ऐप','dm.h1':'टोकन लें। ReadyLane को अपना काम पूरा करते देखें।',
'dm.p':'सेवा चुनें और टोकन लें। चेकलिस्ट एक सिमुलेटेड शाखा में तेज़ गति से चलती है: 1 सिमुलेटेड मिनट लगभग 1.5 सेकंड का। आपका टोकन <a href="lobby.html" style="color:var(--gold)">लॉबी TV</a> और <a href="staff.html" style="color:var(--gold)">स्टाफ़ डैशबोर्ड</a> पर भी दिखता है (उन्हें दूसरे टैब में खोलें)।',
'dm.s1':'आज आपको क्या काम है?','dm.s2':'थोड़ी जानकारी','dm.s3':'टोकन लें','dm.amount':'रकम (₹)',
'dm.senior':'वरिष्ठ नागरिक / दिव्यांग','dm.seniorH':'तैयार कतार में प्राथमिकता मिलती है','dm.problem':'कोई कमी दिखाएँ (डेमो)',
'dm.phone':'SMS / WhatsApp संदेश के लिए मोबाइल नंबर <span class="muted" style="font-weight:500">(ज़रूरी नहीं)</span>','dm.phonePh':'10 अंकों का मोबाइल नंबर (डेमो, कुछ नहीं भेजा जाता)',
'dm.take':'🎟 टोकन लें','dm.your':'आपका टोकन','dm.speed':'गति',
/* status */
'stp.title':'टोकन स्थिति · ReadyLane','stp.top':'SmartQ Bank · ReadyLane · टोकन की लाइव स्थिति','stp.ph':'टोकन नंबर, जैसे C-12','stp.view':'देखें',
'stp.own':'अपना टोकन चाहिए? <a href="demo.html">ग्राहक डेमो में टोकन लें</a>।','stp.note':'ग्राहक अपने काग़ज़ी टोकन का QR स्कैन करके यही पेज खोलता है। न ऐप, न लॉगिन। सिमुलेटेड डेटा।',
/* lobby */
'lb.title':'लॉबी स्क्रीन · ReadyLane','lb.pill':'शाखा लॉबी स्क्रीन','lb.now':'अभी बुला रहे हैं','lb.first':'पहले बुलावे का इंतज़ार…',
'lb.ticker':'आपको तभी बुलाया जाता है जब आपकी सारी जाँच पूरी हो, इसलिए कृपया बैठे रहें। · काम बाकी? अपने टोकन का QR स्कैन करें या हेल्प डेस्क पर जाएँ; आपकी जगह बनी रहेगी। · बुलावा छूट गया? 5 मिनट की छूट मिलती है, फिर आप होल्ड पर जाते हैं और जगह बनी रहती है। · किसी को भी K बार से ज़्यादा पीछे नहीं किया जाता (Fair-Skip गारंटी)। · वरिष्ठ नागरिकों और दिव्यांगों को प्राथमिकता।',
'lb.g.checking':'जाँच जारी','lb.g.action':'काम बाकी','lb.g.ready':'तैयार','lb.g.called':'बुलाया गया',
/* staff */
'sf.title':'स्टाफ़ डैशबोर्ड · ReadyLane','sf.eb':'स्टाफ़ / अधिकारी डैशबोर्ड','sf.h1':'शाखा की कतार, तैयारी और निष्पक्षता सीमा',
'sf.p':'लाइव सिमुलेशन: तैयार ग्राहकों को उन ग्राहकों से पहले बुलाया जाता है जिनकी जाँच चल रही है, पर हर बार पीछे किए जाने की गिनती होती है। K बार पर टोकन लॉक हो जाता है, हेल्प डेस्क उसकी बाकी चीज़ें निपटाता है और अगला काउंटर उसके लिए आरक्षित होता है। 1 टिक = 1 सिमुलेटेड मिनट।',
'sf.step':'1 मिनट आगे ›','sf.speed':'गति','sf.kLabel':'निष्पक्षता सीमा K','sf.auto':'अधिकारी अपने आप मंज़ूर करें','sf.reset':'↺ सिमुलेशन फिर शुरू करें',
'sf.q':'🗂 लाइव कतार','sf.qSub':'आने के क्रम में · पीछे होने की गिनती बनाम सीमा',
'sf.th1':'टोकन','sf.th2':'सेवा','sf.th3':'आया','sf.th4':'स्थिति','sf.th5':'जाँच','sf.th6':'पीछे हुआ','sf.th7':'बुलावा लगभग',
'sf.legend':'जाँच: <span class="dots"><i class="pass"></i></span> पूरी <span class="dots"><i class="running"></i></span> चल रही <span class="dots"><i class="fail"></i></span> फ़ेल <span class="dots"><i></i></span> बाकी · बैंगनी पंक्तियाँ सीमा पर लॉक हैं · पीली पंक्ति ग्राहक डेमो वाला टोकन है',
'sf.ctrs':'🏦 काउंटर और नकद दराज़','sf.ctrsSub':'तैयार फ़ाइल देखने के लिए काउंटर दबाएँ','sf.appr':'✍ अधिकारी की पहले से मंज़ूरी','sf.ruleH':'⚖ Fair-Skip नियम','sf.log':'📜 घटनाओं का लॉग',
/* mentor */
'mt.title':'बैंक मेंटर · ReadyLane','mt.eb':'मेंटर / सहायक','mt.h1':'जाने से पहले पूछें: "मुझे क्या लाना है?"',
'mt.p':'ब्राउज़र में चलने वाला सहायक, जिसके पास भारतीय बैंकों की आम सेवाओं की जानकारी है। यह आसान हिंदी, अंग्रेज़ी और हिंग्लिश समझता है, जैसे <i>"खाता खोलना है"</i> या <i>"75000 जमा करना है"</i>। किसी व्यक्ति से बात करनी है? शाखा के मेंटर से जुड़ें (सिमुलेशन)।',
'mt.ph':'अपना सवाल लिखें… जैसे होम लोन के दस्तावेज़','mt.send':'भेजें','mt.topics':'लोकप्रिय विषय','mt.good':'ध्यान रखें',
'mt.goodP':'जवाब सामान्य जानकारी हैं। सीमाएँ और फ़ॉर्म हर बैंक में अलग हो सकते हैं, इसलिए अपनी शाखा से पक्का करें। मेंटर कभी आपका PIN, OTP या पासवर्ड नहीं माँगता।',
'mt.mic':'🎤 बोलकर पूछें','mt.micOn':'🎙 सुन रहे हैं… बोलिए',
/* documents */
'doc.title':'दस्तावेज़ और फ़ॉर्म · ReadyLane','doc.eb':'दस्तावेज़ और फ़ॉर्म','doc.h1':'फ़ॉर्म डाउनलोड करें। घर पर भरें। सब साथ लेकर आएँ।',
'doc.p':'अपना काम चुनें और देखें कि क्या साथ लाना है। नमूना फ़ॉर्म डाउनलोड करें, प्रिंट करें और हाथ से भरें। हर फ़ॉर्म अंग्रेज़ी और हिंदी दोनों में है।',
'doc.disc':'<b>⚠ ReadyLane डेमो के लिए नमूना फ़ॉर्म।</b> आपके बैंक का आधिकारिक फ़ॉर्म अलग हो सकता है। ये किसी असली बैंक के फ़ॉर्म नहीं हैं।',
'doc.searchPh':'खोजें: जैसे PAN, जमा, पता, लोन','doc.searchAria':'दस्तावेज़ खोजें','doc.byService':'काम के हिसाब से','doc.commonH':'आम फ़ॉर्म (हर किसी के काम के)',
'doc.help':'लिख-पढ़ नहीं सकते? फ़ॉर्म लेकर कियोस्क पर आएँ, स्टाफ़ हेल्पर भर देंगे। हस्ताक्षर की जगह अँगूठे का निशान लगा सकते हैं।',
};
Object.keys(HI).forEach(k=>{if(!D[k])D[k]=[null,HI[k]]});
/* English for static keys that are also used from scripts */
Object.entries({'lb.g.checking':'Checking','lb.g.action':'Action needed','lb.g.ready':'Ready','lb.g.called':'Called','mt.ph':'Type your question… e.g. documents for home loan','mt.mic':'🎤 Speak your question','mt.micOn':'🎙 Listening… speak now'}).forEach(([k,v])=>{D[k][0]=v});

const tr=(key,lng)=>{const e=D[key];if(!e)return null;const s=e[lng==='hi'?1:0];return s==null?(lng==='hi'?null:null):s};
function t(key,p,lng){
  lng=lng||lang;let s=tr(key,lng);if(s==null)s=tr(key,'en');if(s==null)s=key;
  if(p)s=s.replace(/\{(\w+)\}/g,(m,k)=>{let v=p[k];if(v==null)return '';if(typeof v==='string'&&v[0]==='@')return t(v.slice(1),null,lng);return v});
  return s;
}
function has(key){return !!D[key]}
/* apply to static elements; English originals are captured the first time */
function apply(root){
  root=root||document;
  const each=(attr,get,set)=>root.querySelectorAll('['+attr+']').forEach(el=>{
    const k=el.getAttribute(attr),store='en_'+attr.replace(/-/g,'_');
    if(el[store]===undefined)el[store]=get(el);
    const e=D[k];let v=lang==='hi'&&e&&e[1]!=null?e[1]:(e&&e[0]!=null?e[0]:el[store]);
    if(get(el)!==v)set(el,v);});
  each('data-i18n',el=>el.textContent,(el,v)=>el.textContent=v);
  each('data-i18n-html',el=>el.innerHTML,(el,v)=>el.innerHTML=v);
  each('data-i18n-ph',el=>el.getAttribute('placeholder')||'',(el,v)=>el.setAttribute('placeholder',v));
  each('data-i18n-aria',el=>el.getAttribute('aria-label')||'',(el,v)=>el.setAttribute('aria-label',v));
  each('data-i18n-alt',el=>el.getAttribute('alt')||'',(el,v)=>el.setAttribute('alt',v));
  each('data-i18n-title',el=>el.getAttribute('title')||'',(el,v)=>el.setAttribute('title',v));
  const tk=document.documentElement.getAttribute('data-title');
  if(tk){if(!document.en_title)document.en_title=document.title;document.title=lang==='hi'&&D[tk]&&D[tk][1]?D[tk][1]:document.en_title}
}
const langListeners=[];
function syncDoc(){document.documentElement.lang=lang==='hi'?'hi':'en';document.documentElement.classList.toggle('lang-hi',lang==='hi');
  document.querySelectorAll('[data-lang]').forEach(b=>{const on=b.dataset.lang===lang;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)})}
function setLang(l,silent){l=l==='hi'?'hi':'en';if(l===lang&&!silent)return;lang=l;try{localStorage.setItem(LS_LANG,l)}catch(e){}
  syncDoc();apply();langListeners.forEach(f=>{try{f(lang)}catch(e){console.error(e)}})}
function setEasy(v){easy=!!v;try{localStorage.setItem(LS_EASY,easy?'1':'0')}catch(e){}syncEasy()}
function syncEasy(){if(document.body)document.body.classList.toggle('easy',easy);document.querySelectorAll('.easy-btn').forEach(b=>{b.classList.toggle('on',easy);b.setAttribute('aria-pressed',easy)})}
window.addEventListener('storage',e=>{if(e.key===LS_LANG&&e.newValue&&e.newValue!==lang){lang=e.newValue==='hi'?'hi':'en';syncDoc();apply();langListeners.forEach(f=>f(lang))}
  if(e.key===LS_EASY){easy=e.newValue==='1';syncEasy()}});

/* ---- speech ---- */
const canSpeak='speechSynthesis' in window;
function pickVoice(L){if(!canSpeak)return null;const V=speechSynthesis.getVoices();const n=s=>(s||'').replace('_','-').toLowerCase();
  return V.find(v=>n(v.lang)===L.toLowerCase())||V.find(v=>n(v.lang).startsWith(L.slice(0,2)))||null}
function clean(s){return String(s).replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\uFE0F\u200D⏳⏸▦☰✕✓›→↩↻⛶✍⚖]/gu,' ').replace(/\s+/g,' ').trim()}
function speak(text,opts){
  if(!canSpeak){if(RL.toast)RL.toast('sys',t('speech.none'),'');return false}
  opts=opts||{};if(!opts.queue)speechSynthesis.cancel();
  const L=(opts.lang||lang)==='hi'?'hi-IN':'en-IN';const u=new SpeechSynthesisUtterance(clean(text));u.lang=L;const v=pickVoice(L);if(v)u.voice=v;u.rate=opts.rate||.9;
  if(opts.btn){opts.btn.classList.add('speaking');u.onend=u.onerror=()=>opts.btn.classList.remove('speaking')}
  speechSynthesis.speak(u);return true}
if(canSpeak){try{speechSynthesis.getVoices();speechSynthesis.onvoiceschanged=()=>speechSynthesis.getVoices()}catch(e){}}
function listenBtn(target,extra){return '<button type="button" class="listen'+(extra?' '+extra:'')+'" data-speak="'+(target||'')+'" aria-label="'+t('listen.aria')+'">🔊 <span>'+t('listen')+'</span></button>'}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-speak],[data-speak-text]');if(!b)return;e.preventDefault();e.stopPropagation();
  if(b.classList.contains('speaking')&&canSpeak){speechSynthesis.cancel();b.classList.remove('speaking');return}
  let text=b.dataset.speakText;
  if(!text){const sel=b.dataset.speak;let el=sel?document.querySelector(sel):null;if(!el)el=b.closest('[data-speak-scope]')||b.parentElement;
    const c=el.cloneNode(true);c.querySelectorAll('[data-speak],[data-speak-text],.no-speak,script,style,svg').forEach(x=>x.remove());
    c.querySelectorAll('br,li,div,p,h1,h2,h3,b').forEach(x=>x.append('. '));
    text=c.textContent.replace(/(\.\s*){2,}/g,'. ')}
  document.querySelectorAll('.listen.speaking').forEach(x=>x.classList.remove('speaking'));
  speak(text,{btn:b});
},true);

window.RL=Object.assign(window.RL||{},{syncUI(){syncDoc();syncEasy()},t,has,applyI18n:apply,setLang,setEasy,speak,listenBtn,canSpeak,
  onLang(f){langListeners.push(f)},statusLabel:s=>t('st.'+s)});
Object.defineProperty(window.RL,'lang',{get(){return lang},configurable:true});
Object.defineProperty(window.RL,'easy',{get(){return easy},configurable:true});
syncDoc();
document.addEventListener('DOMContentLoaded',()=>{syncDoc();syncEasy();apply()});
})();
