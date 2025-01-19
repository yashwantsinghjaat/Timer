// Main Timer Logic
let mainTimerInterval;
let mainTime = 0;

function setMainTimer() {
    const userTime = document.getElementById('user-time').value;
    const timeParts = userTime.split(':');
    if (timeParts.length === 3) {
        const hrs = parseInt(timeParts[0]) || 0;
        const mins = parseInt(timeParts[1]) || 0;
        const secs = parseInt(timeParts[2]) || 0;
        mainTime = hrs * 3600 + mins * 60 + secs;
        document.getElementById('main-timer').innerText = formatTime(mainTime);
    }
}


function startMainTimer() {
    if (mainTime > 0) {
        mainTimerInterval = setInterval(() => {
            if (mainTime > 0) {
                mainTime--;
                document.getElementById('main-timer').innerText = formatTime(mainTime);
            } else {
                stopMainTimer();
            }
        }, 1000);
    }
}

function stopMainTimer() {
    clearInterval(mainTimerInterval);
}

function resetMainTimer() {
    stopMainTimer();
    mainTime = 0;
    document.getElementById('main-timer').innerText = "00:00:00";
    document.getElementById('user-time').value = "";
}

let stopwatchTime = 0;  // Time in seconds
let stopwatchInterval;  // Interval ID for the stopwatch
let isRunning = false;  // Flag to track if stopwatch is running

// Start the stopwatch
function startStopwatch() {
    if (isRunning) return;  // If the stopwatch is already running, do nothing

    isRunning = true;
    stopwatchInterval = setInterval(() => {
        stopwatchTime++;
        updateStopwatchDisplay(stopwatchTime);
    }, 1000);
}

// Stop the stopwatch
function stopStopwatch() {
    clearInterval(stopwatchInterval);
    isRunning = false;
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    isRunning = false;
    updateStopwatchDisplay(stopwatchTime);
}

// Update the stopwatch display
function updateStopwatchDisplay(time) {
    const stopwatchDisplay = document.getElementById('stopwatch-display');
    stopwatchDisplay.innerText = formatTime(time);
}

// Format time (HH:MM:SS)
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// Attach event listeners to buttons (assuming these buttons exist in your HTML)
document.getElementById('start-btn').addEventListener('click', startStopwatch);
document.getElementById('stop-btn').addEventListener('click', stopStopwatch);
document.getElementById('reset-btn').addEventListener('click', resetStopwatch);


//Break timer logic
let timer;
let timeLeft = 300; // 5 minutes in seconds

// Start Timer
function startTimer() {
    if (timer) return; // Prevent multiple timers running at once

    timer = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timer); // Stop timer when time is up
            alert("Time's up!");
            return;
        }
        timeLeft--; // Decrease time
        document.getElementById('timer').innerText = formatTime(timeLeft);
    }, 1000); // Updates every second
}

// Stop Timer
function stopTimer() {
    clearInterval(timer); // Stop the timer
    timer = null;
}

// Reset Timer
function resetTimer() {
    stopTimer();
    timeLeft = 300; // Reset to 5 minutes
    document.getElementById('timer').innerText = "05:00";
}

// Format time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;
}


// Background Upload Logic
function uploadBackground() {
    const file = document.getElementById('upload-background').files[0];
    const background = document.getElementById('background');
    if (file.type.includes('image')) {
        background.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Background">`;
    } else if (file.type.includes('video')) {
        background.innerHTML = `<video src="${URL.createObjectURL(file)}" autoplay loop muted></video>`;
    }
}

function stretchBackground(stretch) {
    const bg = document.querySelector('.background img, .background video');
    bg.style.objectFit = stretch ? 'cover' : 'contain';
}

// Music Logic
let music;
function uploadMusic() {
    const file = document.getElementById('upload-music').files[0];
    if (file) {
        music = new Audio(URL.createObjectURL(file));
    }
}

function playMusic() {
    if (music) music.play();
}

function pauseMusic() {
    if (music) music.pause();
}

// Timer Color Logic
function changeTimerColor() {
    const color = document.getElementById('color-picker').value;
    document.getElementById('main-timer').style.color = color;
}

// Weather Update Logic
async function fetchWeather() {
    const weatherElement = document.getElementById('weather');
    try {
        const response = await fetch('https://api.weatherapi.com/v1/current.json?key=f7cd48c33ff14fe6b21211010251801&q=auto:ip');
        if (!response.ok) throw new Error("Weather API request failed.");

        const weatherData = await response.json();
        const { name } = weatherData.location;
        const { temp_c, condition } = weatherData.current;
        weatherElement.innerText = `Location: ${name}, Temp: ${temp_c}°C, ${condition.text}`;
    } catch (error) {
        weatherElement.innerText = "Unable to fetch weather.";
    }
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

// Initialize Weather
fetchWeather();
