// script.js

// Elements
const timerButtons = document.querySelectorAll('.timer-button');
const customTimerButton = document.getElementById('custom-timer');
const customTimerModal = document.getElementById('custom-timer-modal');
const closeModalButton = document.getElementById('close-modal');
const setCustomTimerButton = document.getElementById('set-custom-timer');
const customDurationInput = document.getElementById('custom-duration');
const modalOverlay = document.getElementById('modal-overlay');
const timerDisplay = document.getElementById('timer-display');

let originalDuration = 0; // in seconds
let remainingTime = 0; // in seconds
let timerInterval = null;

// Function to format time in MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formattedMins = mins < 10 ? `0${mins}` : mins;
  const formattedSecs = secs < 10 ? `0${secs}` : secs;
  return `${formattedMins}:${formattedSecs}`;
}

// Function to start the timer
function startTimer(duration) {
  clearTimer(); // Clear any existing timer
  originalDuration = duration;
  remainingTime = duration;
  timerDisplay.textContent = formatTime(remainingTime);
  
  timerInterval = setInterval(() => {
    remainingTime--;
    timerDisplay.textContent = formatTime(remainingTime);
    
    if (remainingTime <= 0) {
      clearTimer();
      alert('Time is up!');
      offerTimerExtension();
    }
  }, 1000);
}

// Function to clear the timer
function clearTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// Function to handle timer extension
function offerTimerExtension() {
  const halfDuration = Math.ceil(originalDuration / 2);
  const minutes = Math.floor(halfDuration / 60);
  const seconds = halfDuration % 60;
  const halfDurationFormatted = formatTime(halfDuration);
  
  const extend = confirm(`Would you like to extend your focus session by ${minutes} minute(s) and ${seconds} second(s)?`);
  if (extend) {
    startTimer(halfDuration);
  }
}

// Event listeners for predefined timer buttons
timerButtons.forEach(button => {
  button.addEventListener('click', () => {
    const durationMinutes = parseInt(button.getAttribute('data-duration'), 10);
    const durationSeconds = durationMinutes * 60;
    startTimer(durationSeconds);
  });
});

// Event listener for Custom Timer button
customTimerButton.addEventListener('click', () => {
  openModal();
});

// Function to open the custom timer modal
function openModal() {
  customTimerModal.style.display = 'block';
  modalOverlay.style.display = 'block';
  customDurationInput.value = '';
  customDurationInput.focus();
}

// Function to close the custom timer modal
function closeModal() {
  customTimerModal.style.display = 'none';
  modalOverlay.style.display = 'none';
}

// Event listener for closing the modal
closeModalButton.addEventListener('click', closeModal);

// Event listener for clicking outside the modal to close it
window.addEventListener('click', (event) => {
  if (event.target == modalOverlay) {
    closeModal();
  }
});

// Event listener for setting the custom timer
setCustomTimerButton.addEventListener('click', () => {
  const customMinutes = parseFloat(customDurationInput.value);
  if (isNaN(customMinutes) || customMinutes <= 0) {
    alert('Please enter a valid positive number for minutes.');
    return;
  }
  const customSeconds = Math.round(customMinutes * 60);
  closeModal();
  startTimer(customSeconds);
});

// Function to handle keyboard shortcuts (optional)
// Example: Press 'Escape' to close the modal
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (customTimerModal.style.display === 'block') {
      closeModal();
    }
  }
});
