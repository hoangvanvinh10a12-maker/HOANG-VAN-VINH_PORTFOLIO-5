const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    localStorage.setItem('portfolioTheme', 'dark');
  } else {
    body.classList.remove('dark');
    localStorage.setItem('portfolioTheme', 'light');
  }
}

const savedTheme = localStorage.getItem('portfolioTheme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const nextTheme = body.classList.contains('dark') ? 'light' : 'dark';
  setTheme(nextTheme);
});

function createLeaf(index) {
  const leaf = document.createElement('span');
  leaf.className = 'leaf';
  const startX = Math.random() * 120 - 10;
  const startY = Math.random() * -18 - 22;
  const endX = (Math.random() * 180 - 60) + 20;
  const endY = 120 + Math.random() * 40;
  const rotate = Math.floor(Math.random() * 40 - 20) + 'deg';
  const duration = 16 + Math.random() * 14;
  const delay = -Math.random() * duration;

  leaf.style.setProperty('--x-start', startX + 'vw');
  leaf.style.setProperty('--y-start', startY + 'vh');
  leaf.style.setProperty('--x-end', endX + 'vw');
  leaf.style.setProperty('--y-end', endY + 'vh');
  leaf.style.setProperty('--leaf-rotate', rotate);
  leaf.style.setProperty('--leaf-duration', duration + 's');
  leaf.style.opacity = 0.65 + Math.random() * 0.25;
  leaf.style.left = Math.random() * 100 + '%';
  leaf.style.top = Math.random() * 10 + '%';
  document.getElementById('leafContainer').appendChild(leaf);
}

for (let i = 0; i < 14; i += 1) {
  createLeaf(i);
}

const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});
