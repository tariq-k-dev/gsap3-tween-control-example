// --- Accessibility fix for Firefox button focus ---
document.addEventListener('click', function (event) {
  if (event.target.matches('button')) {
    event.target.focus();
  }
});

// --- DOM Elements ---
const fred = document.querySelector('.fred');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const reverseBtn = document.getElementById('reverse');
const restartBtn = document.getElementById('restart');
const resetBtn = document.getElementById('reset');

// --- GSAP Tween Setup ---
gsap.set(fred, { x: 0 }); // Ensure initial position
const tween = gsap.to(fred, {
  duration: 3,
  x: 600,
  ease: 'linear',
  paused: true,
});

// --- Utility: Clear console on button click ---
function clearAnd(fn) {
  return function (...args) {
    console.clear();
    fn(...args);
  };
}

// --- Button Event Handlers ---
playBtn.onclick = clearAnd(() => tween.play());
pauseBtn.onclick = clearAnd(() => tween.pause());
reverseBtn.onclick = clearAnd(() => tween.reverse());
restartBtn.onclick = clearAnd(() => tween.restart(true, true));
resetBtn.onclick = clearAnd(() => {
  tween.pause(0).progress(0);
  gsap.set(fred, { x: 0 });
  console.log("Sprite's x position:", gsap.getProperty(fred, 'x'));
});

// --- Log x position only while tween is active ---
tween.eventCallback('onUpdate', () => {
  if (tween.isActive()) {
    console.log("Sprite's x position:", gsap.getProperty(fred, 'x'));
  }
});
