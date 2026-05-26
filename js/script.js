// ── PLAY NOW scroll ──
document.getElementById('play-btn').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('.pick-your-level').scrollIntoView({ behavior: 'smooth' });
});

// ── TRACK SELECTED RATING ──
let selectedRating = '';

document.querySelectorAll('.rating-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    let isActive = btn.classList.contains('active');
    document.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('active'));
    if (!isActive) {
      btn.classList.add('active');
      selectedRating = btn.id.toUpperCase();
    } else {
      selectedRating = '';
    }
  });
});

// ── FETCH TRUTH QUESTION ──
async function loadTruth() {
  const url = selectedRating
    ? `https://api.truthordarebot.xyz/v1/truth?rating=${selectedRating}`
    : 'https://api.truthordarebot.xyz/v1/truth';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// ── FETCH DARE QUESTION ──
async function loadDare() {
  const url = selectedRating
    ? `https://api.truthordarebot.xyz/api/dare?rating=${selectedRating}`
    : 'https://api.truthordarebot.xyz/api/dare';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// ── OVERLAY ──
let resultBox = document.querySelector('.result-box');
let overlayText = document.querySelector('.overlay-text');

let showOverlay = (text) => {
  overlayText.textContent = text;
  resultBox.classList.remove('hidden');
};

document.querySelector('#go-back').addEventListener('click', () => {
  resultBox.classList.add('hidden');
});

// ── CARD BUTTONS ──
document.querySelector('#truth-card').addEventListener('click', async () => {
  const data = await loadTruth();
  if (data) showOverlay(data.question);
});

document.querySelector('#dare-card').addEventListener('click', async () => {
  const data = await loadDare();
  if (data) showOverlay(data.question);
});