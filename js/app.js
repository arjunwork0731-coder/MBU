let currentExp = null;
let currentSectionIdx = 0;

const $ = (id) => document.getElementById(id);

/* ---------- view switching ---------- */
function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  $(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function navTo(id) {
  showView(id);
  if (id === 'view-modules') renderModules();
}

/* ---------- merge saved experiments ---------- */
function getAllExperiments() {
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem('mbu_experiments') || '[]'); } catch (e) {}
  return experiments.concat(saved);
}
function nextId() {
  const all = getAllExperiments();
  return all.length ? Math.max(...all.map(e => e.id)) + 1 : 1;
}

/* ---------- syntax highlighting ---------- */
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
  $('codeArea').innerHTML = code.split('\n').map((l, i) =>
    `<span class="ln">${i + 1}</span>${highlight(l) || ' '}`).join('\n');
}

/* ---------- hover preview behavior ---------- */
function attachHoverPlay(video) {
  if (!video) return;
  video.muted = true;
  video.loop = true;
  video.addEventListener('mouseenter', () => { video.play().catch(() => {}); });
  video.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
}

/* ---------- HOME ---------- */
function renderHome() {
  $('studentPhoto').src = STUDENT.photo;
  $('studentPhoto').onerror = () => { $('studentPhoto').src = 'assets/images/student-placeholder.svg'; };
  $('sName').textContent = STUDENT.name;
  $('sId').textContent = STUDENT.idNumber;
  $('sSection').textContent = STUDENT.section;
  $('sFaculty').textContent = STUDENT.faculty;
  $('sProfession').textContent = STUDENT.profession;
  $('subjectCode').textContent = SUBJECT_CODE;
  renderHomeResults(getAllExperiments());
}
function renderHomeResults(list) {
  $('expList').innerHTML = list.map(e =>
    `<div class="exp-card" onclick="openPreview(${e.id})">
       <div class="exp-module">${e.module || 'Uncategorized'}</div>
       <h4>${e.name}</h4>
       <p>${e.sections.length} section(s)</p>
     </div>`).join('') || '<p style="color:var(--muted)">No matching experiments found.</p>';
}
function setupSearch() {
  const input = $('searchInput'), box = $('suggestions');
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    const matches = getAllExperiments().filter(e => e.name.toLowerCase().includes(q));
    renderHomeResults(matches);
    box.innerHTML = matches.map(e => `<li onclick="pickSuggestion(${e.id})">${e.name}</li>`).join('');
    box.style.display = matches.length && input.value ? 'block' : 'none';
  });
  input.addEventListener('blur', () => setTimeout(() => box.style.display = 'none', 200));
}
function pickSuggestion(id) {
  const e = getAllExperiments().find(x => x.id === id);
  $('searchInput').value = e.name;
  $('suggestions').style.display = 'none';
  renderHomeResults([e]);
}

/* ---------- MODULES ---------- */
function renderModules() {
  const all = getAllExperiments();
  const mods = [...new Set(MODULES.concat(all.map(e => e.module || 'Uncategorized')))];
  $('modulesWrap').innerHTML = mods.map(m => {
    const exps = all.filter(e => (e.module || 'Uncategorized') === m);
    return `<div class="module-block">
      <h3>${m}</h3>
      <div class="exp-grid">
        ${exps.length ? exps.map(e => `<div class="exp-card" onclick="openPreview(${e.id})"><h4>${e.name}</h4><p>${e.summary ? e.summary.slice(0,80)+'…' : ''}</p></div>`).join('') : '<p class="muted">No experiments yet.</p>'}
      </div>
    </div>`;
  }).join('');
}

/* ---------- ADD EXPERIMENT ---------- */
function openAdd() {
  $('modSelect').innerHTML = MODULES.map(m => `<option>${m}</option>`).join('');
  showView('view-add');
}
function saveNewExperiment() {
  const name = $('fName').value.trim();
  if (!name) { alert('Please enter an experiment name.'); return; }
  const exp = {
    id: nextId(),
    name,
    module: $('modSelect').value,
    previewVideo: $('fPreview').value.trim() || 'assets/videos/preview.mp4',
    youtubeVideo: $('fYoutubeEmbed').value.trim(),
    youtubeLink: $('fYoutube').value.trim(),
    githubLink: $('fGithub').value.trim(),
    summary: $('fSummary').value.trim(),
    sections: [{ letter: 'A', title: 'Overview', video: $('fPreview').value.trim() || '', code: '# Add your code in js/data.js' }]
  };
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem('mbu_experiments') || '[]'); } catch (e) {}
  saved.push(exp);
  localStorage.setItem('mbu_experiments', JSON.stringify(saved));
  alert('Experiment added!');
  ['fName','fPreview','fYoutubeEmbed','fYoutube','fGithub','fSummary'].forEach(id => $(id).value = '');
  navTo('view-modules');
}

/* ---------- + ADD → preview ---------- */
function addExperiment() { navTo('view-modules'); }
function openPreview(id) {
  currentExp = getAllExperiments().find(e => e.id === id) || getAllExperiments()[0];
  $('previewVideo').src = currentExp.previewVideo;
  $('previewVideo').load();
  $('previewName').textContent = currentExp.name;
  attachHoverPlay($('previewVideo'));
  showView('view-preview');
}
function openOverview() {
  $('detailsVideo').src = currentExp.previewVideo;
  $('detailsVideo').load();
  attachHoverPlay($('detailsVideo'));
  $('detailsName').textContent = currentExp.name;
  $('sectionsList').innerHTML = currentExp.sections.map((s, i) =>
    `<button class="section-chip" onclick="openSection(${i})" title="${s.title || ''}">${s.letter}</button>`).join('');
  $('youtubeFrame').src = currentExp.youtubeVideo || '';
  $('youtubeLink').href = currentExp.youtubeLink || '#';
  $('youtubeLink').textContent = currentExp.youtubeLink || '—';
  $('githubLink').href = currentExp.githubLink || '#';
  $('githubLink').textContent = currentExp.githubLink || '—';
  $('summaryText').textContent = currentExp.summary || '';
  showView('view-details');
}
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
function copyCode() {
  navigator.clipboard.writeText(currentExp.sections[currentSectionIdx].code).then(() => {
    const b = $('copyBtn'); b.textContent = 'Copied!';
    setTimeout(() => b.textContent = 'Copy Code', 1500);
  });
}

function downloadCode() {
  const s = currentExp.sections[currentSectionIdx];
  const blob = new Blob([s.code], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `experiment${currentExp.id}_section${s.letter}.py`;
  a.click();
}

let pyodideReady = null;
async function runCode() {
  const out = $('codeOutput');
  out.textContent = 'Running...';
  try {
    if (!pyodideReady) {
      out.textContent = 'Loading Python runtime (first run may take a few seconds)...';
      pyodideReady = loadPyodide();
    }
    const py = await pyodideReady;
    py.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);
    py.runPython(currentExp.sections[currentSectionIdx].code);
    const stdout = py.runPython("sys.stdout.getvalue()");
    const stderr = py.runPython("sys.stderr.getvalue()");
    out.textContent = stdout + (stderr ? '\n[stderr]\n' + stderr : '') || '(no output)';
  } catch (err) {
    out.textContent = 'Error: ' + err.message;
  }
}

renderHome();
setupSearch();
