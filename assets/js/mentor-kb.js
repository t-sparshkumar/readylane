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
