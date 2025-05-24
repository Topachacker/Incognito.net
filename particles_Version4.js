const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 50;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createParticle() {
  return {
    x: randomBetween(0, canvas.width),
    y: randomBetween(0, canvas.height),
    r: randomBetween(2, 8),
    dx: randomBetween(-0.3, 0.3),
    dy: randomBetween(-0.3, 0.3),
    alpha: randomBetween(0.2, 0.7)
  };
}

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }
}
initParticles();
window.addEventListener('resize', initParticles);

function drawParticle(p) {
  ctx.save();
  ctx.globalAlpha = p.alpha;
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#000';
  ctx.shadowColor = '#222';
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(let p of particles) {
    drawParticle(p);

    // Move particle
    p.x += p.dx;
    p.y += p.dy;

    // Bounce on borders
    if (p.x < -p.r) p.x = canvas.width + p.r;
    if (p.x > canvas.width + p.r) p.x = -p.r;
    if (p.y < -p.r) p.y = canvas.height + p.r;
    if (p.y > canvas.height + p.r) p.y = -p.r;
  }

  requestAnimationFrame(animate);
}

animate();