// Starfield
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const stars = Array.from({ length: 200 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 1.2 + 0.2,
  alpha: Math.random() * 0.7 + 0.2,
  speed: Math.random() * 0.004 + 0.001,
  phase: Math.random() * Math.PI * 2,
}));

function drawStars(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    const a = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed * 60 + s.phase));
    ctx.beginPath();
    ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
requestAnimationFrame(drawStars);

// Planet click → panel
const panel    = document.getElementById('panel');
const closeBtn = document.getElementById('closeBtn');
const panelDot = document.getElementById('panelDot');
const panelName = document.getElementById('panelName');
const panelInfo = document.getElementById('panelInfo');

document.querySelectorAll('.planet').forEach(planet => {
  planet.addEventListener('click', () => {
    const name  = planet.dataset.name;
    const info  = planet.dataset.info;
    const color = planet.dataset.color;

    panelName.textContent = name;
    panelInfo.textContent = info;
    panelDot.style.background = `radial-gradient(circle at 35% 35%, ${color}cc, ${color}55)`;
    panelDot.style.boxShadow = `0 0 20px ${color}88`;

    panel.classList.add('open');
  });
});

closeBtn.addEventListener('click', () => panel.classList.remove('open'));
