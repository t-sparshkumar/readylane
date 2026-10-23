# ReadyLane MVP (SmartQ Bank)

The queue that only calls you once your work is already done.

## Run it
Open `index.html` in any modern browser. There's no build step and no internet needed.
For the QR codes to open on a phone, serve the folder on your Wi-Fi, e.g. `python3 -m http.server 8000`,
then open `http://<your-laptop-ip>:8000/` (the QR encodes the page URL).

## Pages
- `index.html`: overview / pitch (problem, solution, checklist, fairness cap, physical token, patent, impact)
- `demo.html`: customer kiosk / app demo (service picker, QR paper token, live checklist, action needed, called, grace window)
- `status.html?t=C-15`: token status page the QR opens
- `lobby.html`: lobby TV display with voice announcements (click "Enable voice") and TV mode
- `staff.html`: staff / officer dashboard (queue, overtake counters vs cap K, early approvals, cash drawers, prepared file, event log)
- `mentor.html`: bank mentor chat (local knowledge base, plus a simulated human mentor)
- `documents.html`: documents & forms: one card per service with what to bring, printable sample PDF forms (`assets/docs/`), search and a filter by service (`documents.html#cash_deposit`)

## Language, easy mode, accessibility
- **EN / हिंदी** toggle in the nav of every page (saved in localStorage `readylane.lang`). All text, including engine messages, the lobby voice (hi-IN / en-IN) and the mentor answers, comes from one dictionary in `assets/js/i18n.js` (`data-i18n` attributes plus `RL.t()`).
- **Easy mode** (👁 in the nav, saved as `readylane.easy`): bigger text and buttons (tap targets of 48px or more), less text, a bigger token number.
- Picture steps, ✅ ⏳ ❌ status words, and 🔊 Listen buttons (browser speech synthesis) on the token, the documents, the mentor and the steps.

## Sample forms
`assets/docs/*.pdf` contains 11 bilingual (English + Hindi) sample forms. They are labelled "ReadyLane sample forms for the demo. Your bank's official form may differ". They do not copy any real bank's forms or branding.

All pages share one simulated branch through the browser's localStorage. Open several tabs and they stay in sync.
Simulated data only. 1 simulated minute is about 1.5 s at 1× speed. "Restart simulation" on the staff page resets everything.

Third-party: `assets/vendor/qrcode.js` (QR Code Generator by Kazuhiko Arase, MIT licence).
