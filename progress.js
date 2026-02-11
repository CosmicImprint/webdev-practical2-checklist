// Grab all checkboxes and progress bar
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progressBar = document.getElementById('progress');

// Duck audio
const quack = new Audio('duck.mp3');
quack.volume = 0.5;

// Prevent repeated effects
let ducksFired = false;

// Track which sections have already quacked
const completedSections = new Set();

// Load saved checkbox state
checkboxes.forEach((box, index) => {
  const saved = localStorage.getItem(`check-${index}`);
  box.checked = saved === "true";
});

// Listen for checkbox changes
checkboxes.forEach((box, index) => {
  box.addEventListener('change', () => {
    localStorage.setItem(`check-${index}`, box.checked);
    updateProgress();
    updateSections();
  });
});

// Update overall progress bar + trigger duck shower
function updateProgress() {
  const total = checkboxes.length;
  const checked = document.querySelectorAll('input[type="checkbox"]:checked').length;
  const percent = Math.round((checked / total) * 100);

  if (progressBar) {
    progressBar.value = percent;
  }

  // Duck shower at 100%
  if (percent === 100 && !ducksFired) {
    duckShower();
    ducksFired = true;
  }

  // Allow re-trigger if progress drops
  if (percent < 100) {
    ducksFired = false;
  }
}

// Update section completion indicators + quack
function updateSections() {
  document.querySelectorAll('details').forEach((section, index) => {
    const boxes = section.querySelectorAll('input[type="checkbox"]');
    const checked = section.querySelectorAll('input[type="checkbox"]:checked');
    const status = section.querySelector('.status');

    if (!status || boxes.length === 0) return;

    // Section completed
    if (boxes.length === checked.length) {
      status.textContent = "✔ Complete";
      status.classList.add("complete");

      // Quack only once per section
      if (!completedSections.has(index)) {
        quack.currentTime = 0;
        quack.play();
        completedSections.add(index);
      }
    } else {
      status.textContent = "";
      status.classList.remove("complete");
      completedSections.delete(index); // allow re-quack if undone
    }
  });
}

// Duck shower animation (100% completion)
function duckShower() {
  for (let i = 0; i < 30; i++) {
    const duck = document.createElement('div');
    duck.textContent = "🦆";
    duck.className = "duck";
    duck.style.left = Math.random() * 100 + "vw";
    duck.style.animationDuration = 2 + Math.random() * 2 + "s";
    document.body.appendChild(duck);

    setTimeout(() => duck.remove(), 4000);
  }
}

// Initial run on page load
updateProgress();
updateSections();
