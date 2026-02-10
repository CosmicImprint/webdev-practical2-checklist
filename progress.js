const checkboxes = document.querySelectorAll('#content input[type="checkbox"]');
const progressBar = document.getElementById('progress');
const progressText = document.getElementById('progress-text');

function updateProgress() {
  const total = checkboxes.length;
  const checked = document.querySelectorAll('#content input[type="checkbox"]:checked').length;
  const percentage = Math.round((checked / total) * 100);

  progressBar.value = percentage;
  progressText.textContent = `${percentage}%`;

  localStorage.setItem('checklistProgress', JSON.stringify(
    Array.from(checkboxes).map(cb => cb.checked)
  ));
}

// Load saved progress
const saved = JSON.parse(localStorage.getItem('checklistProgress'));
if (saved) {
  checkboxes.forEach((cb, i) => cb.checked = saved[i]);
}

checkboxes.forEach(cb => cb.addEventListener('change', updateProgress));
updateProgress();
