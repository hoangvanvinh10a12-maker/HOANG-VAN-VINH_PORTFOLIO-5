const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('portfolioTheme') || 'light';

function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    localStorage.setItem('portfolioTheme', 'dark');
  } else {
    body.classList.remove('dark');
    localStorage.setItem('portfolioTheme', 'light');
  }
}

setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const nextTheme = body.classList.contains('dark') ? 'light' : 'dark';
  setTheme(nextTheme);
});

const projects = {
  bookmark: {
    title: 'Bookmark Design',
    description: 'Thiết kế bookmark hướng tới trải nghiệm cá nhân hoá, chất liệu nhẹ nhàng và cảm xúc tinh tế.',
    images: [
      { label: 'Concept layout', background: 'linear-gradient(145deg, #f8dab0 0%, #d68f61 100%)' },
      { label: 'Moodboard palette', background: 'linear-gradient(145deg, #fbe3ce 0%, #c37b52 100%)' },
      { label: 'Final interface', background: 'linear-gradient(145deg, #f8d4aa 0%, #c27057 100%)' }
    ]
  },
  model: {
    title: '3D Model Design',
    description: 'Dự án 3D thể hiện giao diện sản phẩm cùng cảnh sắc hoàng hôn, ánh sáng và độ sâu tinh tế.',
    images: [
      { label: '3D concept', background: 'linear-gradient(145deg, #f4d5b7 0%, #c2875f 100%)' },
      { label: 'Material study', background: 'linear-gradient(145deg, #efdbc3 0%, #ae6d49 100%)' },
      { label: 'Final render', background: 'linear-gradient(145deg, #f8e1c7 0%, #b56d41 100%)' }
    ]
  }
};

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalGallery = document.getElementById('modalGallery');
const modalClose = document.getElementById('modalClose');

function openModal(projectKey) {
  const project = projects[projectKey];
  if (!project) return;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalGallery.innerHTML = project.images.map(image => {
    return `<div class="modal-image" role="img" aria-label="${image.label}" style="background-image: ${image.background}"></div>`;
  }).join('');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

const projectButtons = document.querySelectorAll('[data-project]');
projectButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const projectKey = event.currentTarget.dataset.project;
    if (projectKey) {
      openModal(projectKey);
    }
  });

  button.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const projectKey = event.currentTarget.dataset.project;
      if (projectKey) {
        openModal(projectKey);
      }
    }
  });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal || event.target === document.querySelector('.modal-backdrop')) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});

const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

function createLeaf(index) {
  const leaf = document.createElement('span');
  leaf.className = 'leaf';
  const startX = Math.random() * 120 - 10;
  const startY = Math.random() * -24 - 20;
  const endX = Math.random() * 120 - 10;
  const endY = 110 + Math.random() * 30;
  const rotate = Math.floor(Math.random() * 60 - 30) + 'deg';
  const duration = 14 + Math.random() * 12;
  const delay = -Math.random() * duration;
  const size = 10 + Math.random() * 18;
  const depth = Math.random() > 0.6 ? 0.9 : 0.6;

  leaf.style.setProperty('--x-start', startX + 'vw');
  leaf.style.setProperty('--y-start', startY + 'vh');
  leaf.style.setProperty('--x-end', endX + 'vw');
  leaf.style.setProperty('--y-end', endY + 'vh');
  leaf.style.setProperty('--leaf-rotate', rotate);
  leaf.style.setProperty('--leaf-duration', duration + 's');
  leaf.style.width = `${size}px`;
  leaf.style.height = `${size * 1.1}px`;
  leaf.style.opacity = depth;
  leaf.style.filter = `blur(${depth < 0.75 ? '0px' : '0.4px'})`;
  leaf.style.left = Math.random() * 100 + '%';
  leaf.style.top = Math.random() * 8 + '%';
  document.getElementById('leafContainer').appendChild(leaf);
}

for (let i = 0; i < 16; i += 1) {
  createLeaf(i);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.18,
});

document.querySelectorAll('[data-animate]').forEach((element) => {
  observer.observe(element);
});
