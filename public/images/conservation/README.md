# HERY — Conservation photographs

This folder is reserved for the **original JPEG photographs** supplied by the owner.

The public slideshow in `src/ConservationGallery.jsx` discovers available files in this directory. It changes photos automatically every **4 seconds**, crossfades between them, and uses HERY's original forest image while no valid photo is available.

Copy the JPEG images into this directory using these exact names:

- conservation1.jpeg
- conservation2.jpeg
- conservation3.jpeg
- conservation5.jpeg
- conservation6.jpeg
- conservation7.jpeg
- conservation9.jpeg
- conservation10.jpeg
- conservation11.jpeg
- conservation12.jpeg
- conservation13.jpeg
- conservation14.jpeg
- conservation15.jpeg

Windows PowerShell example (from the HERY frontend repository):

```powershell
New-Item -ItemType Directory -Force .\public\images\conservation | Out-Null
Get-ChildItem "D:\guide\conservation*.jpeg" | Copy-Item -Destination .\public\images\conservation
git add public/images/conservation
git commit -m "Add original HERY conservation photos"
git push origin main
```

The gallery never invents or substitutes photographs. Existing photos are preserved until the originals are available. Avoid committing photos without proper permission from the subjects where necessary. Compress large JPEG images before uploading if possible.
