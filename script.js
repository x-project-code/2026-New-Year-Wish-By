const nameForm = document.getElementById("name-form");
const nameInput = document.getElementById("name");
const greeting = document.getElementById("greeting");
const shareUrlInput = document.getElementById("share-url");
const whatsappShare = document.getElementById("whatsapp-share");
const facebookShare = document.getElementById("facebook-share");
const copyBtn = document.getElementById("copy-btn");
const surpriseBtn = document.getElementById("surprise-btn");

const surpriseLinks = [
  "https://otieu.com/4/9964203",
  "https://otieu.com/4/9964213",
];

const getBaseUrl = () =>
  `${window.location.protocol}//${window.location.host}${window.location.pathname}`;

const updateShareLinks = (name) => {
  const baseUrl = getBaseUrl();
  const url = name
    ? `${baseUrl}?name=${encodeURIComponent(name)}`
    : baseUrl;

  shareUrlInput.value = url;

  const message = name
    ? `Happy New Year 2026 from ${name} 🎉✨ ${url}`
    : `Happy New Year 2026 🎆 ${url}`;

  whatsappShare.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
  facebookShare.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
};

const updateGreeting = (name) => {
  greeting.textContent = name
    ? `Happy New Year 2026 from ${name} 🎉✨`
    : "Happy New Year 2026 🎆";
};

const initFromQuery = () => {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  if (name) {
    nameInput.value = name;
  }
  updateGreeting(name);
  updateShareLinks(name);
};

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  updateGreeting(name);
  updateShareLinks(name);
  const baseUrl = getBaseUrl();
  const url = name
    ? `${baseUrl}?name=${encodeURIComponent(name)}`
    : baseUrl;
  window.history.replaceState({}, "", url);
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(shareUrlInput.value);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy Link";
    }, 2000);
  } catch (error) {
    copyBtn.textContent = "Copy failed";
  }
});

surpriseBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * surpriseLinks.length);
  window.open(surpriseLinks[randomIndex], "_blank", "noopener,noreferrer");
});

// Lightweight fireworks/confetti animation using canvas.
const canvas = document.getElementById("confetti");
const context = canvas.getContext("2d");
const particles = [];

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const colors = ["#f5c542", "#5df7ff", "#9b5dff", "#ff6f91", "#ffd166"];

const createFirework = () => {
  const x = Math.random() * canvas.width;
  const y = (Math.random() * canvas.height) / 2;
  const count = 40 + Math.floor(Math.random() * 20);

  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * (2 + Math.random() * 2),
      vy: Math.sin(angle) * (2 + Math.random() * 2),
      alpha: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
};

const animate = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.02;
    particle.alpha -= 0.01;

    if (particle.alpha <= 0) {
      particles.splice(index, 1);
      return;
    }

    context.globalAlpha = particle.alpha;
    context.beginPath();
    context.arc(particle.x, particle.y, 2.2, 0, Math.PI * 2);
    context.fillStyle = particle.color;
    context.fill();
  });

  context.globalAlpha = 1;
  requestAnimationFrame(animate);
};

resizeCanvas();
initFromQuery();
animate();

setInterval(createFirework, 1200);
window.addEventListener("resize", resizeCanvas);
