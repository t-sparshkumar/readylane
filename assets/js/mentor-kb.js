/* Local knowledge base for the ReadyLane mentor. General guidance for Indian banks, simplified for a demo.
   Exact rules and limits vary by bank, so answers end with a reminder to confirm at the branch. */
window.MENTOR_KB=[
{id:'open',title:'Opening a savings account',chip:'Open a savings account',
 kw:['open account','account open','opening account','open a savings account','new account','savings account','saving account','bank account','khata','khata kholna','account kholna','khulwana','zero balance'],
 a:`<b>Documents to open a savings account</b><ul>
<li><b>Identity & address proof (OVD):</b> Aadhaar, passport, voter ID, driving licence, NREGA job card or NPR letter</li>
<li><b>PAN card</b>, or <b>Form 60</b> if you don't have a PAN</li>
<li>1–2 recent passport-size photographs</li>
<li>Initial deposit as per the account type (zero-balance <i>BSBD</i> accounts are also available)</li></ul>
For a <b>joint account</b>, every applicant brings these and must be present. In ReadyLane, the officer authorisation is requested while you wait.`},
{id:'joint',title:'Joint accounts',chip:'Joint account rules',
 kw:['joint','co-holder','coholder','both','husband','wife','either or survivor','jointly','sanyukt','dono'],
 a:`<b>Joint accounts</b><ul>
<li>Each holder needs their own KYC: OVD, PAN or Form 60, photo</li>
<li>All holders must be present to open the account</li>
<li><b>Operating modes:</b> <i>Either or Survivor</i> (any one can transact), <i>Former or Survivor</i>, or <i>Jointly</i> (all must sign)</li></ul>
For a <b>"Jointly"</b> account, all holders must be present to withdraw cash. ReadyLane's SyncToken waits until the co-holder checks in before calling you.`},
{id:'kyc',title:'KYC update / re-KYC',chip:'Update my KYC',
 kw:['kyc','re-kyc','rekyc','update kyc','kyc update','periodic','kyc pending','kyc expired'],
 a:`<b>KYC update (re-KYC)</b><ul>
<li><b>No change in details:</b> a self-declaration is usually enough (branch, net banking, email or registered mobile, as your bank allows)</li>
<li><b>Address changed:</b> an OVD with the new address (Aadhaar, passport, voter ID or driving licence)</li>
<li>Keep your <b>PAN</b> (or Form 60) handy</li></ul>
Banks repeat KYC periodically based on your risk category (RBI guideline: at least every 2, 8 or 10 years for high, medium or low risk).`},
{id:'address',title:'Change of address',chip:'Change my address',
 kw:['address','address change','change address','new address','shifted','pata','pata badalna','relocate','moved'],
 a:`<b>Changing your address</b><ul>
<li>A filled address-change request form</li>
<li><b>Proof of new address:</b> Aadhaar, passport, voter ID or driving licence with the new address</li>
<li>A utility bill (electricity, water, gas, telephone) <b>not older than 2 months</b> is accepted temporarily; you then submit an OVD within 3 months</li></ul>
Tip: a bill older than 2 months is the most common reason people get sent back. ReadyLane flags it before you reach the counter.`},
{id:'withdraw',title:'Cash withdrawal (including large amounts)',chip:'Withdraw a large amount',
 kw:['withdraw','withdrawal','cash withdrawal','nikalna','paise nikalna','paisa nikalna','large cash','lakh','big amount','cheque cash','self cheque'],
 a:`<b>Cash withdrawal at the branch</b><ul>
<li>A filled <b>withdrawal slip</b> with your passbook, or a <b>self cheque</b>. Amount in words and figures must match</li>
<li>You don't need a PAN to withdraw from your own account</li>
<li><b>Large amounts:</b> above the teller's limit, the branch officer must approve. Limits are set by each bank (₹2,00,000 in this demo). For very large amounts, tell the branch a day in advance so cash is available</li>
<li>Cash withdrawals above ₹1 crore in a financial year attract TDS (Section 194N; lower threshold if ITRs weren't filed)</li></ul>
ReadyLane gets officer approval and earmarks the cash at a counter before calling you.`},
{id:'deposit',title:'Cash deposit',chip:'Deposit cash: PAN needed?',
 kw:['deposit','cash deposit','jama','jama karna','paise jama','pan required','pan needed','50000','50,000','form 60'],
 a:`<b>Cash deposit</b><ul>
<li>A filled <b>deposit slip</b> (account number, name, denominations)</li>
<li><b>Above ₹50,000 in cash in a day:</b> <b>PAN</b> is mandatory, or <b>Form 60</b> if you don't have one (Income-tax Rule 114B)</li>
<li>Cash deposits or withdrawals totalling <b>₹20 lakh or more in a financial year</b> also need PAN (or Aadhaar)</li></ul>
Missing PAN? ReadyLane shows "Action needed" right away, so you can upload it from your phone while you keep your place.`},
{id:'dd',title:'Demand draft (DD)',chip:'Make a demand draft',
 kw:['dd','demand draft','draft','banker cheque','pay order','payable at','payee'],
 a:`<b>Demand draft</b><ul>
<li><b>DD application form</b> with <b>payee name</b>, <b>"payable at" city</b> and amount</li>
<li>Payment by debit to your account or a cheque. <b>DDs of ₹50,000 or more cannot be bought with cash</b> (RBI)</li>
<li>Bring ID if you are not an account holder (for small cash DDs)</li>
<li>DD charges apply as per the bank's schedule</li></ul>`},
{id:'fd',title:'Fixed deposit (FD)',chip:'Open an FD',
 kw:['fd','fd kholna','fixed deposit','term deposit','15g','15h','tds','interest','senior citizen rate'],
 a:`<b>Opening a fixed deposit</b><ul>
<li>FD application form (amount, tenure, payout option), signed</li>
<li>KYC-compliant account. <b>PAN</b> must be on record, otherwise TDS is deducted at a higher rate (20%)</li>
<li><b>Form 15G</b> (below 60) or <b>15H</b> (60+) if your income is below the taxable limit and you want no TDS</li>
<li>Nominee details are recommended</li></ul>
Senior citizens usually get a higher interest rate.`},
{id:'loan',title:'Loan enquiry',chip:'Documents for a loan',
 kw:['loan','home loan','personal loan','car loan','vehicle loan','education loan','emi','cibil','credit score','karz','rin'],
 a:`<b>Loan enquiry: what to bring</b><ul>
<li>ID and address proof, PAN, photographs</li>
<li><b>Income proof:</b> last 3 months' salary slips and Form 16 (salaried), or last 2 years' ITR with computation (self-employed)</li>
<li>Last 6 months' bank statement</li>
<li><b>Home loan:</b> property documents and sale agreement. <b>Vehicle loan:</b> dealer quotation. <b>Education loan:</b> admission letter and fee structure</li></ul>
ReadyLane runs a credit pre-check (with your consent) and books a loan-officer slot before calling you.`},
{id:'nominee',title:'Add or change nominee',chip:'Add a nominee',
 kw:['nominee','nomination','da1','da-1','da3','waris'],
 a:`<b>Nomination</b><ul>
<li><b>Form DA-1</b> to add a nominee, <b>DA-2</b> to cancel, <b>DA-3</b> to change</li>
<li>Nominee's name, relationship, age and address. A guardian is needed if the nominee is a minor</li>
<li>A thumb impression needs a witness</li></ul>`},
{id:'mobile',title:'Update mobile number / email',chip:'Change mobile number',
 kw:['mobile','phone number','mobile number','email','sms not coming','otp','number change'],
 a:`<b>Updating mobile number or email</b><ul>
<li>Request form at the branch, or via ATM / net banking if your bank supports it</li>
<li>ID proof. Bring the new SIM, since OTP verification is usually done</li></ul>`},
{id:'card',title:'Lost debit card / ATM card',chip:'Lost my ATM card',
 kw:['atm','debit card','card lost','lost card','card block','block card','stolen','pin'],
 a:`<b>Lost or stolen debit card</b><ul>
<li><b>Block it immediately</b> through your bank's app, net banking, SMS or 24×7 helpline</li>
<li>Request a replacement card at the branch or online. ID may be needed at the branch</li>
<li>Report unauthorised transactions quickly. RBI rules limit your liability when you report promptly</li></ul>`},
{id:'cheque',title:'Cheque book',chip:'Request a cheque book',
 kw:['cheque book','chequebook','checkbook','cheque leaves','new cheque'],
 a:`<b>Cheque book request</b><ul><li>Request via ATM, net/mobile banking, or the branch requisition slip in your old cheque book</li><li>Usually delivered to your registered address. Collecting it at the branch needs ID</li></ul>`},
{id:'pan',title:'PAN / Aadhaar linking',chip:'Link PAN or Aadhaar',
 kw:['pan link','link pan','aadhaar link','link aadhaar','aadhar','aadhaar','seeding'],
 a:`<b>Linking PAN or Aadhaar to your account</b><ul><li>Self-attested copy of PAN / Aadhaar with the request form at the branch, or via net banking</li><li>Name should match across documents. Mismatches need a correction first</li></ul>`},
{id:'readylane',title:'How ReadyLane works',chip:'How does ReadyLane work?',
 kw:['readylane','token','queue','line','wait','called','turn','grace','missed','fair','overtake','skip','kab','number aayega','bari'],
 a:`<b>How your ReadyLane token works</b><ul>
<li>Take a token (app, kiosk or staff helper) and pick your service. A checklist for that service starts running</li>
<li>If something is missing, you see <b>Action needed</b> with the exact fix, and you keep your place</li>
<li>You're called only when every check has passed: by SMS / WhatsApp if you gave a number, on the lobby screen, and by voice announcement</li>
<li>Missed your call? A <b>5-minute grace window</b>, then you go on hold without losing your place</li>
<li><b>Fair-Skip:</b> ready customers may go ahead, but nobody is overtaken more than K times</li></ul>`},
{id:'senior',title:'Senior citizens & persons with disability',chip:'Senior citizen help',
 kw:['senior','old','elderly','disabled','disability','wheelchair','pwd','buzurg','doorstep'],
 a:`<b>Support for seniors and persons with disability</b><ul>
<li>Priority within ReadyLane's ready lane, plus a staff helper at the kiosk</li>
<li>Paper token with QR, and voice announcements on the lobby screen</li>
<li>Many banks offer <b>doorstep banking</b> for seniors (70+) and persons with disability. Ask the branch</li></ul>`},
];

/* Hindi titles, chips, answers and keywords (Devanagari + Hinglish), plus the sample forms to offer for each topic.
   Used when the EN / हिंदी toggle is set to Hindi. Forms are the ReadyLane demo forms in assets/docs/. */
(function(){
const HI={
open:{t:'बचत खाता खोलना',c:'बचत खाता खोलना है',f:['account_opening','nominee','form60_info','id_checklist'],
 kw:['खाता','खाता खोलना','नया खाता','बचत खाता','अकाउंट','अकाउंट खोलना','खाता खुलवाना','जीरो बैलेंस'],
 a:`<b>बचत खाता खोलने के दस्तावेज़</b><ul>
<li><b>पहचान और पते का प्रमाण (OVD):</b> आधार, पासपोर्ट, वोटर ID, ड्राइविंग लाइसेंस, नरेगा जॉब कार्ड या NPR पत्र</li>
<li><b>PAN कार्ड</b>, या PAN न हो तो <b>फ़ॉर्म 60</b></li>
<li>1–2 हाल की पासपोर्ट साइज़ फ़ोटो</li>
<li>खाते के प्रकार के हिसाब से शुरुआती जमा (ज़ीरो बैलेंस <i>BSBD</i> खाता भी मिलता है)</li></ul>
<b>संयुक्त खाते</b> में हर आवेदक यह सब लाए और ख़ुद आए। ReadyLane में अधिकारी की मंज़ूरी आपके इंतज़ार के दौरान ही माँग ली जाती है।`},
joint:{t:'संयुक्त (जॉइंट) खाता',c:'जॉइंट खाते के नियम',f:['account_opening'],
 kw:['संयुक्त','जॉइंट','दोनों','पति','पत्नी','सह खाताधारक'],
 a:`<b>संयुक्त खाता</b><ul>
<li>हर खाताधारक का अपना KYC: OVD, PAN या फ़ॉर्म 60, फ़ोटो</li>
<li>खाता खोलते समय सभी खाताधारक मौजूद हों</li>
<li><b>चलाने के तरीके:</b> <i>कोई भी एक या जीवित</i> (कोई भी लेन-देन कर सकता है), <i>पहला या जीवित</i>, या <i>संयुक्त रूप से</i> (सबके हस्ताक्षर ज़रूरी)</li></ul>
<b>"संयुक्त रूप से"</b> वाले खाते से नकद निकालने के लिए सभी खाताधारकों का आना ज़रूरी है। ReadyLane का SyncToken दूसरे खाताधारक के आने तक रुकता है, फिर आपको बुलाता है।`},
kyc:{t:'KYC अपडेट / री-KYC',c:'मेरा KYC अपडेट करना है',f:['kyc_update','id_checklist'],
 kw:['केवाईसी','KYC','री केवाईसी','केवाईसी अपडेट','kyc karna','kyc karwana'],
 a:`<b>KYC अपडेट (री-KYC)</b><ul>
<li><b>जानकारी में कोई बदलाव नहीं:</b> आमतौर पर स्व-घोषणा काफ़ी है (शाखा, नेट बैंकिंग, ईमेल या रजिस्टर्ड मोबाइल से, जैसा आपका बैंक दे)</li>
<li><b>पता बदला है:</b> नए पते वाला OVD (आधार, पासपोर्ट, वोटर ID या ड्राइविंग लाइसेंस)</li>
<li>अपना <b>PAN</b> (या फ़ॉर्म 60) साथ रखें</li></ul>
बैंक आपकी जोखिम श्रेणी के हिसाब से समय-समय पर KYC दोबारा करते हैं (RBI: ज़्यादा, मध्यम या कम जोखिम के लिए कम से कम हर 2, 8 या 10 साल में)।`},
address:{t:'पता बदलना',c:'मेरा पता बदलना है',f:['address_change','id_checklist'],
 kw:['पता','पता बदलना','नया पता','घर बदला','शिफ्ट'],
 a:`<b>अपना पता बदलना</b><ul>
<li>भरा हुआ पता बदलने का आवेदन फ़ॉर्म</li>
<li><b>नए पते का प्रमाण:</b> नए पते वाला आधार, पासपोर्ट, वोटर ID या ड्राइविंग लाइसेंस</li>
<li>बिजली, पानी, गैस या टेलीफ़ोन का बिल जो <b>2 महीने से पुराना न हो</b>, कुछ समय के लिए चलता है; फिर 3 महीने में OVD जमा करना होता है</li></ul>
सलाह: 2 महीने से पुराना बिल लौटाए जाने की सबसे आम वजह है। ReadyLane काउंटर से पहले ही यह बता देता है।`},
withdraw:{t:'नकद निकासी (बड़ी रकम भी)',c:'बड़ी रकम निकालनी है',f:['withdrawal_slip'],
 kw:['निकालना','निकासी','पैसे निकालना','नकद निकालना','लाख','बड़ी रकम','सेल्फ चेक'],
 a:`<b>शाखा से नकद निकासी</b><ul>
<li>पासबुक के साथ भरी हुई <b>निकासी पर्ची</b>, या <b>सेल्फ़ चेक</b>। रकम शब्दों और अंकों में एक जैसी हो</li>
<li>अपने खाते से पैसे निकालने के लिए PAN ज़रूरी नहीं</li>
<li><b>बड़ी रकम:</b> कैशियर की सीमा से ज़्यादा हो तो शाखा अधिकारी की मंज़ूरी चाहिए। सीमा हर बैंक तय करता है (इस डेमो में ₹2,00,000)। बहुत बड़ी रकम हो तो एक दिन पहले शाखा को बता दें ताकि नकद तैयार रहे</li>
<li>एक वित्त वर्ष में ₹1 करोड़ से ज़्यादा नकद निकालने पर TDS कटता है (धारा 194N; ITR न भरा हो तो सीमा कम)</li></ul>
ReadyLane अधिकारी की मंज़ूरी लेकर और काउंटर पर नकद अलग रखवाकर ही आपको बुलाता है।`},
deposit:{t:'नकद जमा',c:'नकद जमा: PAN चाहिए?',f:['deposit_slip','form60_info'],
 kw:['जमा','जमा करना','पैसे जमा','नकद जमा','पैन चाहिए','पैन','फॉर्म 60','फ़ॉर्म 60'],
 a:`<b>नकद जमा</b><ul>
<li>भरी हुई <b>जमा पर्ची</b> (खाता संख्या, नाम, नोटों की गिनती)</li>
<li><b>एक दिन में ₹50,000 से ज़्यादा नकद:</b> <b>PAN</b> ज़रूरी है, या PAN न हो तो <b>फ़ॉर्म 60</b> (आयकर नियम 114B)</li>
<li>एक वित्त वर्ष में कुल <b>₹20 लाख या ज़्यादा</b> नकद जमा या निकासी पर भी PAN (या आधार) चाहिए</li></ul>
PAN नहीं लाए? ReadyLane तुरंत "काम बाकी" दिखाता है, ताकि आप जगह गँवाए बिना फ़ोन से PAN भेज सकें।`},
dd:{t:'डिमांड ड्राफ़्ट (DD)',c:'डिमांड ड्राफ़्ट बनवाना है',f:['dd_request'],
 kw:['डीडी','डिमांड ड्राफ्ट','ड्राफ्ट','ड्राफ़्ट','पे ऑर्डर'],
 a:`<b>डिमांड ड्राफ़्ट</b><ul>
<li><b>DD आवेदन फ़ॉर्म</b>, जिसमें <b>पाने वाले का नाम</b>, <b>"भुगतान शहर"</b> और रकम हो</li>
<li>भुगतान खाते से या चेक से। <b>₹50,000 या ज़्यादा का DD नकद से नहीं बनता</b> (RBI)</li>
<li>खाताधारक नहीं हैं तो पहचान पत्र लाएँ (छोटे नकद DD के लिए)</li>
<li>बैंक की सूची के हिसाब से DD शुल्क लगता है</li></ul>`},
fd:{t:'फ़िक्स्ड डिपॉज़िट (FD)',c:'FD खोलनी है',f:['fd_form','nominee'],
 kw:['एफडी','एफ़डी','फिक्स्ड डिपॉजिट','सावधि जमा','ब्याज','15जी','15एच','टीडीएस'],
 a:`<b>फ़िक्स्ड डिपॉज़िट खोलना</b><ul>
<li>हस्ताक्षर किया FD फ़ॉर्म (रकम, अवधि, ब्याज भुगतान का तरीका)</li>
<li>KYC पूरा खाता। <b>PAN</b> दर्ज हो, नहीं तो ज़्यादा दर (20%) से TDS कटता है</li>
<li>आय टैक्स सीमा से कम हो और TDS नहीं कटवाना हो तो <b>फ़ॉर्म 15G</b> (60 से कम उम्र) या <b>15H</b> (60+)</li>
<li>नॉमिनी का ब्योरा देने की सलाह दी जाती है</li></ul>
वरिष्ठ नागरिकों को आमतौर पर ज़्यादा ब्याज मिलता है।`},
loan:{t:'लोन की जानकारी',c:'लोन के दस्तावेज़',f:['loan_checklist','id_checklist'],
 kw:['लोन','ऋण','कर्ज','कर्ज़','होम लोन','पर्सनल लोन','कार लोन','एजुकेशन लोन','ईएमआई','सिबिल'],
 a:`<b>लोन के लिए क्या लाएँ</b><ul>
<li>पहचान और पते का प्रमाण, PAN, फ़ोटो</li>
<li><b>आय का प्रमाण:</b> पिछले 3 महीने की सैलरी स्लिप और फ़ॉर्म 16 (नौकरी वाले), या पिछले 2 साल का ITR और कंप्यूटेशन (अपना काम)</li>
<li>पिछले 6 महीने का बैंक स्टेटमेंट</li>
<li><b>होम लोन:</b> प्रॉपर्टी के काग़ज़ और बिक्री अनुबंध। <b>वाहन लोन:</b> डीलर का कोटेशन। <b>एजुकेशन लोन:</b> दाख़िले का पत्र और फ़ीस का ब्योरा</li></ul>
ReadyLane आपकी सहमति से क्रेडिट जाँच करता है और आपको बुलाने से पहले लोन अधिकारी का समय तय कर देता है।`},
nominee:{t:'नॉमिनी जोड़ना या बदलना',c:'नॉमिनी जोड़ना है',f:['nominee'],
 kw:['नॉमिनी','नामांकन','वारिस','नामिनी'],
 a:`<b>नामांकन (नॉमिनी)</b><ul>
<li>नॉमिनी जोड़ने के लिए <b>फ़ॉर्म DA-1</b>, रद्द करने के लिए <b>DA-2</b>, बदलने के लिए <b>DA-3</b></li>
<li>नॉमिनी का नाम, रिश्ता, उम्र और पता। नॉमिनी नाबालिग हो तो अभिभावक चाहिए</li>
<li>अँगूठे के निशान पर एक गवाह चाहिए</li></ul>`},
mobile:{t:'मोबाइल नंबर / ईमेल बदलना',c:'मोबाइल नंबर बदलना है',f:[],
 kw:['मोबाइल','मोबाइल नंबर','फोन नंबर','ईमेल','नंबर बदलना','एसएमएस नहीं आ रहा'],
 a:`<b>मोबाइल नंबर या ईमेल बदलना</b><ul>
<li>शाखा में आवेदन फ़ॉर्म, या बैंक दे तो ATM / नेट बैंकिंग से</li>
<li>पहचान पत्र। नया SIM साथ लाएँ, क्योंकि आमतौर पर OTP से जाँच होती है</li></ul>`},
card:{t:'डेबिट / ATM कार्ड खो गया',c:'मेरा ATM कार्ड खो गया',f:[],
 kw:['एटीएम','डेबिट कार्ड','कार्ड खो गया','कार्ड चोरी','कार्ड ब्लॉक'],
 a:`<b>डेबिट कार्ड खो गया या चोरी हुआ</b><ul>
<li>बैंक के ऐप, नेट बैंकिंग, SMS या 24×7 हेल्पलाइन से <b>तुरंत ब्लॉक करें</b></li>
<li>नया कार्ड शाखा में या ऑनलाइन माँगें। शाखा में पहचान पत्र लग सकता है</li>
<li>बिना अनुमति के लेन-देन की शिकायत जल्दी करें। जल्दी बताने पर RBI नियम आपकी ज़िम्मेदारी सीमित रखते हैं</li></ul>`},
cheque:{t:'चेक बुक',c:'चेक बुक चाहिए',f:[],
 kw:['चेक बुक','चेकबुक','नई चेक बुक','चेक'],
 a:`<b>चेक बुक की माँग</b><ul><li>ATM, नेट/मोबाइल बैंकिंग से, या पुरानी चेक बुक की माँग पर्ची से शाखा में</li><li>आमतौर पर रजिस्टर्ड पते पर आती है। शाखा से लेने पर पहचान पत्र चाहिए</li></ul>`},
pan:{t:'PAN / आधार जोड़ना',c:'PAN या आधार जोड़ना है',f:['form60_info'],
 kw:['पैन लिंक','आधार लिंक','आधार','आधार जोड़ना','पैन जोड़ना'],
 a:`<b>खाते से PAN या आधार जोड़ना</b><ul><li>शाखा में आवेदन फ़ॉर्म के साथ PAN / आधार की स्व-सत्यापित कॉपी, या नेट बैंकिंग से</li><li>सभी दस्तावेज़ों में नाम एक जैसा हो। फ़र्क़ हो तो पहले सुधार करवाएँ</li></ul>`},
readylane:{t:'ReadyLane कैसे काम करता है',c:'ReadyLane कैसे काम करता है?',f:[],
 kw:['टोकन','कतार','लाइन','बारी','नंबर कब आएगा','इंतजार','इंतज़ार','बुलावा'],
 a:`<b>आपका ReadyLane टोकन कैसे काम करता है</b><ul>
<li>टोकन लें (ऐप, कियोस्क या स्टाफ़ हेल्पर से) और अपना काम चुनें। उस काम की चेकलिस्ट शुरू हो जाती है</li>
<li>कुछ कमी हो तो <b>काम बाकी</b> दिखता है, साथ में ठीक करने का तरीका, और आपकी जगह बनी रहती है</li>
<li>सारी जाँच पूरी होने पर ही बुलाया जाता है: नंबर दिया हो तो SMS / WhatsApp से, लॉबी स्क्रीन पर और आवाज़ में</li>
<li>बुलावा छूट गया? <b>5 मिनट की छूट</b>, फिर आप होल्ड पर जाते हैं और जगह बनी रहती है</li>
<li><b>Fair-Skip:</b> तैयार ग्राहक आगे जा सकते हैं, पर किसी को K बार से ज़्यादा पीछे नहीं किया जाता</li></ul>`},
senior:{t:'वरिष्ठ नागरिक और दिव्यांग',c:'वरिष्ठ नागरिक मदद',f:['id_checklist'],
 kw:['वरिष्ठ','बुज़ुर्ग','बुजुर्ग','दिव्यांग','व्हीलचेयर','बूढ़े','डोरस्टेप'],
 a:`<b>वरिष्ठ नागरिकों और दिव्यांगों के लिए मदद</b><ul>
<li>ReadyLane की तैयार कतार में प्राथमिकता, और कियोस्क पर स्टाफ़ हेल्पर</li>
<li>QR वाला काग़ज़ी टोकन, और लॉबी स्क्रीन पर आवाज़ में बुलावा</li>
<li>कई बैंक वरिष्ठ नागरिकों (70+) और दिव्यांगों को <b>घर पर बैंकिंग</b> देते हैं। शाखा से पूछें</li></ul>`},
};
window.MENTOR_KB.forEach(e=>{const h=HI[e.id];if(!h)return;e.title_hi=h.t;e.chip_hi=h.c;e.a_hi=h.a;e.forms=h.f;e.kw=e.kw.concat(h.kw)});
})();
