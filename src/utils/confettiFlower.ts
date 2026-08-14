import confetti from 'canvas-confetti';

const FLOWER_EMOJIS = ['🌸', '🌺', '🌼', '🌻', '🌷', '💐', '🌹', '🏵️', '💮', '🪷', '✨', '🎉'];

// Trigger celebratory flower and confetti shower that appears and automatically disappears
export const triggerFlowerConfetti = () => {
  // 1. Multi-stage canvas-confetti bursts
  // Center burst
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.55 },
    colors: ['#f97316', '#2563eb', '#38bdf8', '#fbbf24', '#ec4899', '#10b981', '#a855f7'],
    shapes: ['circle', 'square'],
    scalar: 1.2,
  });

  // Left cannon burst
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0.05, y: 0.65 },
      colors: ['#f97316', '#3b82f6', '#fb923c', '#e11d48', '#f43f5e'],
      scalar: 1.1,
    });
  }, 120);

  // Right cannon burst
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 0.95, y: 0.65 },
      colors: ['#2563eb', '#f97316', '#10b981', '#f59e0b', '#ec4899'],
      scalar: 1.1,
    });
  }, 240);

  // 2. DOM Flower Rain: Spawns real floating flowers across the screen, then automatically removes them
  createFloatingFlowers();
};

function createFloatingFlowers() {
  if (typeof document === 'undefined') return;

  const container = document.createElement('div');
  container.id = 'flower-confetti-container';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '99999';
  container.style.overflow = 'hidden';

  document.body.appendChild(container);

  const flowerCount = 35;
  for (let i = 0; i < flowerCount; i++) {
    const flower = document.createElement('div');
    const randomEmoji = FLOWER_EMOJIS[Math.floor(Math.random() * FLOWER_EMOJIS.length)];
    flower.innerText = randomEmoji;

    const startX = Math.random() * 100; // 0% to 100% viewport width
    const startY = Math.random() * -20 - 10; // start slightly above viewport
    const duration = 1.8 + Math.random() * 1.2; // 1.8s to 3s
    const delay = Math.random() * 0.4; // 0s to 0.4s delay
    const size = 20 + Math.random() * 24; // 20px to 44px
    const rotation = (Math.random() - 0.5) * 720;
    const horizontalDrift = (Math.random() - 0.5) * 120;

    flower.style.position = 'absolute';
    flower.style.left = `${startX}vw`;
    flower.style.top = `${startY}vh`;
    flower.style.fontSize = `${size}px`;
    flower.style.userSelect = 'none';
    flower.style.pointerEvents = 'none';
    flower.style.opacity = '0';
    flower.style.transition = `all ${duration}s cubic-bezier(0.25, 1, 0.5, 1)`;
    flower.style.transform = `translate(0, 0) rotate(0deg) scale(0.5)`;

    container.appendChild(flower);

    // Trigger animation via RAF
    setTimeout(() => {
      flower.style.opacity = '1';
      flower.style.transform = `translate(${horizontalDrift}px, ${window.innerHeight + 100}px) rotate(${rotation}deg) scale(1.1)`;
    }, delay * 1000 + 20);

    // Fade out towards end
    setTimeout(() => {
      flower.style.opacity = '0';
    }, (duration - 0.4) * 1000);
  }

  // Automatically remove entire container and clean up after 2.8 seconds
  setTimeout(() => {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }, 2800);
}
