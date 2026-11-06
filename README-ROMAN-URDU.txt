TOOLZEN — PROFESSIONAL UPGRADE PACKAGE
======================================

Is package mein website ki root-level files hain. Main design, CSS aur JavaScript index.html mein hain. Alag assets folder ki zaroorat nahi.

FILES
1. index.html — website, 30 tools, advanced controls, previews, CV templates, scanner, PDF/image processing.
2. 404.html — branded not-found page with correct homepage link.
3. robots.txt — crawler instructions and sitemap URL.
4. sitemap.xml — currently homepage URL only while Search Console fetch is being diagnosed.
5. og-image.png — social sharing preview image.
6. google2ae6bf0d4b10570a.html — Google Search Console ownership verification file. Do not delete it.
7. README-ROMAN-URDU.txt — these instructions.

FEATURE UPGRADES
- Image Compressor: 20 KB–5 MB target, quality preference, best-effort warning, before/after comparison and batch ZIP.
- Image Resizer: custom dimensions, aspect-ratio lock, social media/photo presets, quality control, batch ZIP.
- Image Converter: JPG, PNG, WebP, quality control, JPG background colour and batch ZIP.
- PDF: image-to-PDF, merge with drag/drop file order and per-file page ranges, split selected pages, rotate selected pages, page previews, PDF-to-JPG, information, watermark and structural re-save optimization.
- CV Maker: five templates, live preview, optional profile photo, languages, links and A4 PDF export.
- Document Scanner: multiple pages from images/camera, A4 PDF, crop margin and colour/grayscale/black-and-white filters.
- Shared UX: drag/drop upload, selected-file preview, reset controls, progress/status, clearer errors, download and native file-share option.

IMPORTANT LIMITATIONS — PLEASE READ
- Selected files are processed in the browser; ToolZen does not have a file-upload endpoint in this static build. Some open-source processing libraries are fetched from public CDNs on first use, so those specific tools need an internet connection.
- Image compression uses best effort. Some images cannot reach very small targets without noticeable quality/dimension loss.
- PDF structural optimization does not downsample embedded photos; file-size reduction is not guaranteed.
- PDF to Word extracts selectable text only; complex layout, images, tables and scanned-page OCR are not preserved.
- Word to PDF may alter complex DOCX layouts; always review the exported PDF.
- Document Scanner supports multiple pages, manual crop margin and filters. Automatic perspective/edge detection and OCR are not included.
- Share file uses the browser/device share sheet where supported. WhatsApp shares the public tool page, not a hosted file. Direct Google Drive API upload is not included.
- The Google verification HTML file is required to keep the Search Console HTML-file ownership verification valid; do not remove it.
- The sitemap currently lists only the homepage while the Search Console fetch issue is being checked. Do not claim that all tool URLs are indexed.

DEPLOY TO THE EXISTING CLOUDFLARE PAGES PROJECT
1. ZIP ko Windows mein right-click karke Extract All karo.
2. Extracted folder kholo. Andar wali files select karo (folder itself nahi).
3. GitHub repo kholo: https://github.com/Abdul-wahab1101/toolzen-final
4. Add file -> Upload files.
5. Extracted files drag/drop karo. Existing same-name files overwrite/replace karo.
6. Commit changes karo.
7. Cloudflare Dashboard -> Workers & Pages -> toolzen-final -> Deployments mein latest deployment Success hone do.
8. Live site kholo: https://toolzen-final.pages.dev/ and Ctrl+Shift+R se hard refresh karo.

SAFETY
- ZIP file ko GitHub par khud upload mat karna; extracted files upload karni hain.
- index.html, robots.txt, sitemap.xml, 404.html aur Google verification file repository ke root mein rehni chahiye.
- Pehle Cloudflare deployment successful hone do. Live site verify kiye baghair apni purani working deployment delete mat karna.
