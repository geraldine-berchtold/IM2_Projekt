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

// ── OVERLAY ELEMENTS ──
let resultBox = document.querySelector('.result-box');
let overlayText = document.querySelector('.overlay-text');
let wheelAnimation = document.querySelector('#wheel-animation');
let goBack = document.querySelector('#go-back');

// ── SHOW OVERLAY ──
let showOverlay = (text, wheelSrc) => {
  // clear previous question
  overlayText.textContent = '';
  overlayText.classList.add('hidden');
  goBack.classList.add('hidden');

  // show overlay and wheel
  resultBox.classList.remove('hidden');
  wheelAnimation.setAttribute('src', wheelSrc);
  wheelAnimation.style.display = 'block';

  // after 3 seconds hide wheel and show question
  setTimeout(() => {
    wheelAnimation.style.display = 'none';
    overlayText.textContent = text;
    overlayText.classList.remove('hidden');
    goBack.classList.remove('hidden');
  }, 3000);
};

// ── CLOSE OVERLAY ──
goBack.addEventListener('click', () => {
  resultBox.classList.add('hidden');
});

// ── CARD BUTTONS ──
document.querySelector('#truth-card').addEventListener('click', async () => {
  const data = await loadTruth();
  if (data) showOverlay(data.question, './images/truth-fortune-wheel.json');
});

document.querySelector('#dare-card').addEventListener('click', async () => {
  const data = await loadDare();
  if (data) showOverlay(data.question, './images/dare-fortune-wheel.json');
});