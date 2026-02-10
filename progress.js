const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progressBar = document.getElementById('progress');

// Load saved state
checkboxes.forEach((box, index) => {
  const saved = localStorage.getItem(`check-${index}`);
  box.checked = saved === "true";
});

// Save state + update UI
checkboxes.forEach((box, index) => {
  box.addEventListener('change', () => {
    localStorage.setItem(`check-${index}`, box.checked);
    updateProgress();
    updateSections();
  });
});

function updateProgress() {
  const total = checkboxes.length;
  const checked = document.querySelectorAll('input[type="checkbox"]:checked').length;
  const percent = Math.round((checked / total) * 100);

  if (progressBar) {
    progressBar.value = percent;
    progressBar.textContent = `${percent}%`;
  }
}

function updateSections() {
  document.querySelectorAll('details').forEach(section => {
    const boxes = section.querySelectorAll('input[type="checkbox"]');
    const checked = section.querySelectorAll('input[type="checkbox"]:checked');
    const status = section.querySelector('.status');

    if (!status) return;

    if (boxes.length > 0 && boxes.length === checked.length) {
      status.textContent = "✔ Complete";
      status.classList.add("complete");
    } else {
      status.textContent = "";
      status.classList.remove("complete");
    }
  });
}

// Initial update
updateProgress();
updateSections();
