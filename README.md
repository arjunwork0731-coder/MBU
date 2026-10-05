# MBU Data Science Laboratory Website

Open `index.html` in a browser. Fully interactive (search, +ADD, overview, sections, video hover-preview, scrollable highlighted code, copy code, back navigation).

## Editable data (no UI changes needed)
- `js/data.js`
  - `STUDENT` — photo, name, ID number, section, faculty, profession
  - `SUBJECT_CODE`
  - `experiments` — name, previewVideo, youtubeVideo (embed URL), youtubeLink, githubLink, summary, and a dynamic `sections` array (letter, title, video, code). Each experiment can have any number of sections (A, B, C …).

## Assets
- Logo: replace/confirm `assets/mbu-logo.png`
- Student photo: put your photo at `assets/images/student-photo.jpg`
- Videos: place files under `assets/videos/` and update the paths in `data.js`
