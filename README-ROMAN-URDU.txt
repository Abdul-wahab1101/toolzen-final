TOOLZEN — 91 TOOLS PROFESSIONAL UPGRADE
======================================

Is package mein existing 30 ToolZen tools ko preserve karte hue 61 naye tools add kiye gaye hain. Total tool cards: 91. Existing premium navy/violet/cyan Signature design bhi preserve hai.

NEW TOOLS (61)
--------------
GENERAL (8)
1. QR Code Generator — text, URL, email aur Wi-Fi QR; image download.
2. QR Code Scanner — image/camera QR scan (camera ke liye HTTPS aur permission zaroori).
3. Password Generator — custom length aur character groups.
4. Password Strength Checker — local heuristic estimate; breach database check nahi.
5. Online Notepad — local browser autosave aur TXT download.
6. Text to Speech — browser/device mein available voices par depend karta hai.
7. Typing Speed Test — WPM, accuracy aur timer.
8. Random Picker — names/numbers pick; repeat option.

CALCULATORS (14)
BMI, Age, Unit Converter, GST, Percentage, Discount, Profit & Loss, Loan/Installment,
Electricity Bill, Date Difference, Time Duration, Salary, VAT/Tax aur Tip Calculator.

TEXT & WRITING (7)
Word Counter, Case Converter, Remove Duplicate Lines, Text Diff Checker,
Lorem Ipsum Generator, Markdown Editor, Word Counter for PDF.

DEVELOPER (14)
JSON Formatter, Base64 Encoder/Decoder, HTML Formatter, CSS Formatter,
JavaScript Formatter, JSON to CSV, CSV to JSON, XML Formatter, URL Encoder/Decoder,
UUID Generator, SHA-256 Hash Generator, Timestamp Converter, Regex Tester, JWT Decoder.

DESIGN (9)
Color Palette Generator, CSS Gradient Generator, Box Shadow Generator,
Color Contrast Checker, HEX to RGB, RGB to HEX, CSS Border Radius,
CSS Button Generator, CSS Glassmorphism Generator.

PDF & DOCUMENTS (9)
PDF Page Numbering, PDF Password Protect, PDF Unlock, PDF Text Extractor,
PDF Metadata Remover, JPG to Word, Excel to PDF, PDF Page Organizer,
Document Comparison.

EXCLUDED BY REQUEST
-------------------
Background Remover, URL Shortener, WiFi Speed Checker, Speech-to-Text aur Grammar Checker
is release mein shamil nahi hain. Background Remover filhaal hold par hai.

COST & INTERNET NOTES
---------------------
- New tools ke liye paid API/account ko required nahi banaya gaya.
- Calculator, text, color aur developer ke zyada tar tools local browser mein run karte hain.
- QR, code formatting, PDF/WASM, OCR aur spreadsheet conversion ke liye public CDN libraries load hoti hain. First use par internet required ho sakta hai; library/model download data use kar sakta hai.
- Hosting Cloudflare Pages ke free plan par reh sakti hai, lekin free-plan limits/bandwidth apply hoti hain. Zero recurring cost ki absolute guarantee nahi di ja sakti agar usage ya platform limits badlein.

IMPORTANT FUNCTIONAL LIMITS
---------------------------
- Password Strength Checker local rule-based estimate hai; leaked-password database se check nahi karta.
- Password Generator browser cryptographic randomness use karta hai. Generated password ko save karne ki responsibility user ki hai.
- BMI calculator adult screening guide hai, medical diagnosis nahi.
- Electricity, salary, GST/VAT aur other tax calculators user-entered rates/inputs par depend karte hain. Official Pakistan rates auto-update nahi hotay.
- JWT Decoder sirf header/payload decode karta hai; signature ya token authenticity verify nahi karta.
- Regex Tester worker + time/input limits use karta hai; extremely complex patterns ke liye results limited ho sakte hain.
- HTML/CSS/JavaScript formatter public js-beautify CDN par depend karta hai. Formatter code ka full compiler validation nahi karta.
- QR Generator/Scanner depend on QR library; camera scanning requires a supported browser, HTTPS and camera permission.
- Notepad browser localStorage use karta hai. Private browsing, storage disabled, quota limits, or clearing browser data can prevent/purge autosave. TXT download remains available.
- PDF password tools depend on QPDF WebAssembly loaded from public CDNs and may be memory-intensive for large PDFs. Only use unlock on files you are authorized to access and know the password for.
- PDF Text Extractor/Word Counter for PDF only work with selectable text. Scanned pages need OCR and will not yield text through these tools.
- JPG to Word uses browser OCR for English text and creates a Word-compatible .doc/HTML document; it is not a true DOCX conversion and does not preserve original page layout.
- Excel to PDF may change spreadsheet print layout; review the resulting PDF.
- PDF metadata remover clears common document information fields; it does not guarantee removal of every embedded XMP/custom metadata stream.
- Document Comparison compares pasted text, not binary Word/PDF files.
- Text-to-Speech depends on voices and speech synthesis support available in the user's browser/device.
- All tools need a modern browser. Large files, old phones and low memory may affect performance.

TESTS RUN ON THIS PACKAGE
-------------------------
- JavaScript syntax check passed for the new tools and final inline application script.
- HTML parser check passed.
- 91 tool cards found (30 existing + 61 new).
- All 91 tool workspaces initialized in browser test harness; no duplicate workspace IDs or uncaught page errors found.
- Search/category filters and mobile layout tested; no horizontal overflow at widths 320, 360, 390, 430, 768, 820, 1024, 1280 and 1440 px.
- Tested calculations and local operations: password generation/strength, notepad fallback, random picker, BMI, age, unit conversion, GST/VAT, percentage, discount, profit/loss, loan estimate, electricity estimate, date/time duration, salary, tip, word count, case conversion, duplicate-line removal, text diff, Lorem Ipsum, Markdown preview, JSON formatting, Base64, JSON/CSV conversion, URL encoding, UUID, timestamp, regex worker, JWT decode, color/contrast/CSS generators and document text comparison.
- Some test harness checks stubbed externally loaded formatter/crypto dependencies. CDN-dependent QR, QPDF password handling, full PDF/OCR and Excel-to-PDF export were not fully end-to-end verified in this isolated environment. Please run a real-browser test on the live Pages domain after deployment.
- 91/91 means workspace initialization was checked; it does NOT mean every possible file, device, or third-party CDN route was exhaustively tested.

SAFE DEPLOYMENT TO EXISTING CLOUDFLARE PAGES
--------------------------------------------
1. Is ZIP ko Windows mein right-click karke Extract All karo.
2. Extracted folder toolzen-final-main kholo.
3. Folder ke andar ki saari files select karo; folder khud upload na karo.
4. GitHub repo kholo: https://github.com/Abdul-wahab1101/toolzen-final
5. Add file -> Upload files.
6. Extracted files upload karo; same-name files overwrite/replace karo.
7. Commit changes karo.
8. Cloudflare Dashboard -> Workers & Pages -> toolzen-final -> Deployments mein latest deployment ka Success status check karo.
9. Live site kholo: https://toolzen-final.pages.dev/ and Ctrl+Shift+R se hard refresh karo.
10. Pehle homepage, search/category, QR, password generator, calculator, one PDF operation aur mobile navigation check karo.

IMPORTANT SAFETY NOTES
----------------------
- ZIP khud GitHub par upload mat karna; extracted files upload karni hain.
- google2ae6bf0d4b10570a.html ko delete mat karna; Google Search Console ownership verification ke liye zaroori hai.
- index.html, robots.txt, sitemap.xml, 404.html, og-image.png aur verification HTML repo ke root mein rehni chahiye.
- Purani working deployment ko test kiye baghair delete/rollback mat karna.
- Website files browser mein process hoti hain where indicated, but public CDN libraries are fetched from third-party hosts; don't claim every third-party library itself is local/offline.
- Hosting URL remains https://toolzen-final.pages.dev/.
