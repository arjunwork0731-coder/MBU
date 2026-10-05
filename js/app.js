let currentExp = null;
let currentSectionIdx = 0;

const $ = (id) => document.getElementById(id);

function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  $(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------- syntax highlighting (simple, Python-focused) ---------- */
function highlight(code) {
  let esc = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  esc = esc.replace(/(#.*$)/gm, '<span class="cm">$1</span>');
  esc = esc.replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, '<span class="str">$1</span>');
  esc = esc.replace(/\b(import|from|as|def|return|print|if|else|elif|for|while|in|not|and|or|class|True|False|None)\b/g, '<span class="kw">$1</span>');
  esc = esc.replace(/\b(\d+)\b/g, '<span class="num">$1</span>');
  esc = esc.replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span class="fn">$1</span>');
  return esc;
}

function renderCode(code) {
  const lines = code.split('\n');
  $('codeArea').innerHTML = lines.map((l, i) =>
    `<span class="ln">${i + 1}</span>${highlight(l) || ' '}`
  ).join('\n');
}

/* ---------- hover preview behavior ---------- */
function attachHoverPlay(video) {
  if (!video) return;
  video.muted = true;
  video.loop = true;
  video.addEventListener('mouseenter', () => { video.play().catch(() => {}); });
  video.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
}

/* ---------- PAGE 1 ---------- */
function renderHome() {
  $('studentPhoto').src = STUDENT.photo;
  $('studentPhoto').onerror = () => { $('studentPhoto').src = 'assets/images/student-placeholder.svg'; };
  $('sName').textContent = STUDENT.name;
  $('sId').textContent = STUDENT.idNumber;
  $('sSection').textContent = STUDENT.section;
  $('sFaculty').textContent = STUDENT.faculty;
  $('sProfession').textContent = STUDENT.profession;
  $('subjectCode').textContent = SUBJECT_CODE;
  renderExpList(experiments);
}

function renderExpList(list) {
  $('expList').innerHTML = list.length
    ? list.map(e => `<div class="exp-item" onclick="openPreview(${e.id})"><strong>${e.name}</strong><br><small style="color:var(--muted)">${e.sections.length} section(s)</small></div>`).join('')
    : '<p style="color:var(--muted)">No matching experiments found.</p>';
}

function filterExperiments(q) {
  const query = q.trim().toLowerCase();
  return experiments.filter(e => e.name.toLowerCase().includes(query));
}

function setupSearch() {
  const input = $('searchInput'), box = $('suggestions');
  input.addEventListener('input', () => {
    const matches = filterExperiments(input.value);
    renderExpList(matches);
    box.innerHTML = matches.map(e => `<li onclick="pickSuggestion(${e.id})">${e.name}</li>`).join('');
    box.style.display = matches.length && input.value ? 'block' : 'none';
  });
  input.addEventListener('blur', () => setTimeout(() => box.style.display = 'none', 200));
}
function pickSuggestion(id) {
  const e = experiments.find(x => x.id === id);
  $('searchInput').value = e.name;
  $('suggestions').style.display = 'none';
  renderExpList([e]);
}

/* ---------- + ADD → PAGE 2 preview ---------- */
function addExperiment() {
  openPreview(experiments[0].id);
}
function openPreview(id) {
  currentExp = experiments.find(e => e.id === id) || experiments[0];
  $('previewVideo').src = currentExp.previewVideo;
  $('previewVideo').load();
  $('previewName').textContent = currentExp.name;
  attachHoverPlay($('previewVideo'));
  showView('view-preview');
}

/* ---------- PAGE 3 overview ---------- */
function openOverview() {
  $('detailsVideo').src = currentExp.previewVideo;
  $('detailsVideo').load();
  attachHoverPlay($('detailsVideo'));
  $('detailsName').textContent = currentExp.name;
  $('sectionsList').innerHTML = currentExp.sections.map((s, i) =>
    `<button class="section-chip" onclick="openSection(${i})" title="${s.title}">${s.letter}</button>`).join('');
  $('youtubeFrame').src = currentExp.youtubeVideo;
  $('youtubeLink').href = currentExp.youtubeLink;
  $('youtubeLink').textContent = currentExp.youtubeLink;
  $('githubLink').href = currentExp.githubLink;
  $('githubLink').textContent = currentExp.githubLink;
  $('summaryText').textContent = currentExp.summary;
  showView('view-details');
}

/* ---------- PAGE 4 section ---------- */
function openSection(i) {
  currentSectionIdx = i;
  const s = currentExp.sections[i];
  $('secExpTitle').textContent = `Experiment ${currentExp.id}`;
  $('secLetter').textContent = s.letter + (s.title ? ' — ' + s.title : '');
  $('sectionVideo').src = s.video;
  $('sectionVideo').load();
  renderCode(s.code);
  showView('view-section');
}

/* ---------- copy code ---------- */
function copyCode() {
  const s = currentExp.sections[currentSectionIdx];
  navigator.clipboard.writeText(s.code).then(() => {
    const b = $('copyBtn'); b.textContent = 'Copied!';
    setTimeout(() => b.textContent = 'Copy Code', 1500);
  });
}

renderHome();
setupSearch();
