// ── PLAY NOW scroll ──
document.getElementById('play-btn').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('.pick-your-level').scrollIntoView({ behavior: 'smooth' });
});

// ── LEVEL BUTTONS ──
document.querySelectorAll('.rating-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    let isActive = btn.classList.contains('active');
    document.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('active'));
    if (!isActive) btn.classList.add('active');
  });
});

// ── CARD BUTTONS ──
document.getElementById('truth-card').addEventListener('click', () => {
  alert('TRUTH');
});

document.getElementById('dare-card').addEventListener('click', () => {
  alert('DARE');
});