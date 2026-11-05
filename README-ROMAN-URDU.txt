TOOLZEN — SIMPLE UPDATE PACKAGE (NO FOLDERS)
=============================================

Is package mein sirf root-level files hain. CSS, JavaScript aur saare tool interfaces index.html ke andar embedded hain. Koi assets folder upload nahi karna.

FILES:
1. index.html            Main website + 30 tool workspaces + CSS/JavaScript
2. 404.html              Custom not-found page
3. sitemap.xml           Tool and information-page URLs
4. robots.txt            Search crawler instructions
5. og-image.png          Social sharing preview image
6. README-ROMAN-URDU.txt Ye instructions

GITHUB UPDATE:
1. ZIP ko Windows mein right-click karke Extract All karo.
2. Extracted folder kholo.
3. Saari 6 files select karo (Ctrl+A).
4. GitHub par Abdul-wahab1101/toolzen-tools repository kholo.
5. Add file -> Upload files click karo.
6. Saari selected files drag/drop karo.
7. Existing same-name files replace/overwrite karne ki confirmation aaye to confirm karo.
8. Commit changes karo.
9. Repository ke Actions tab mein Pages build success hone do.
10. Settings -> Pages -> Visit site, phir browser mein Ctrl+F5.

IMPORTANT:
- ZIP file khud GitHub par upload mat karna; extracted files upload karna.
- Sab files repository ke root mein hon; koi folder create/upload nahi karna.
- GitHub Pages source main branch / (root) rehna chahiye.
- Tool links query style use karte hain, misaal: ?tool=image-compressor. Is se har tool ka title, description, canonical URL aur FAQs page load par update hota hai, lekin alag folder/page files ki zaroorat nahi.
- Image processing canvas/browser mein hoti hai. PDF/Word/CV tools ki libraries unki zaroorat par public CDN se load hoti hain. ToolZen ka file-upload server is version mein nahi hai.
- PDF Compressor re-save/structural optimization karta hai; har PDF ka size kam hona guaranteed nahi.
- PDF to Word sirf selectable text nikalta hai; original layout, images, tables aur scanned-page OCR supported nahi.
- Word to PDF common DOCX text/formatting ko render karta hai; complex layouts ko manually review karo.
- Document Scanner camera ya selected image se PDF banata hai; OCR/automatic edge detection included nahi.
- Share file button device/browser ki native share support par depend karta hai. WhatsApp button page link share karta hai, generated file ka public link nahi. Native share sheet mein Drive available ho sakta hai, direct Google Drive API upload included nahi.
- Image compression 20KB–5MB target par best effort hai. Complex images mein exact target ya no-quality-loss guarantee nahi.
- PDF libraries first use par internet/CDN connection mangti hain. Selected files ToolZen ke server par upload nahi hoti.
- Is build ka JavaScript syntax check hua hai; full live browser test on GitHub Pages abhi deployment ke baad karna hoga.
