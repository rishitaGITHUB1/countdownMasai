// Select DOM elements
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const timerDisplay = document.getElementById('timerDisplay');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

// Initialize variables
let timerInterval;
let isPaused = false;
let totalSeconds = 0;

// Start Timer Function
function startTimer() {
    // Read input values
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;

    // Convert to total seconds
    totalSeconds = minutes * 60 + seconds;

    // Disable start button and enable pause/reset
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;

    // Start the countdown
    if (timerInterval) clearInterval(timerInterval); // Clear any previous intervals
    timerInterval = setInterval(updateDisplay, 1000);
}

// Update the countdown display every second
function updateDisplay() {
    if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        timerDisplay.textContent = '00:00';
        startButton.disabled = false;
        pauseButton.disabled = true;
        resetButton.disabled = true;
        return;
    }

    totalSeconds--;

    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    // Format the timer display
    timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

// Pause Timer Function
function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
    startButton.disabled = false; // Allow resuming
    pauseButton.disabled = true;  // Disable pause button when paused
}

// Reset Timer Function
function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 0;
    timerDisplay.textContent = '00:00';
    minutesInput.value = '';
    secondsInput.value = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
}

// Helper function to format time as MM:SS
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Event listeners for buttons
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
