let hoursElement = document.getElementById('hours');
let minutesElement = document.getElementById('minutes');
let secondsElement = document.getElementById('seconds');
const countdownWrapper = document.querySelector('.countdown-wrapper');

let deadline = new Date();
const current = new Date();
deadline.setTime(current.getTime() + 6 * 60 * 60 * 1000);

function updateDisplay(element, value, animate = false) {
    const formattedValue = value.toString().padStart(2, '0');
    if (element.textContent !== formattedValue) {
        if (animate) {
            element.classList.add('animate');
            setTimeout(() => {
                element.textContent = formattedValue;
                element.classList.remove('animate');
            }, 350);
        } else {
            element.textContent = formattedValue;
        }
    }
}

function showExplosionMessage() {
    countdownWrapper.innerHTML = `
        <h1 class="explosion-message">💥 Boom! You Exploded 💥</h1>
        <button class="reset">Reset</button>
    `;
    
    // Re-attach event listener to new button
    document.querySelector('.reset').addEventListener('click', resetCountdown);
}

function resetCountdown() {
    // Restore original HTML structure
    countdownWrapper.innerHTML = `
        <h1>Coming Soon...</h1>
        <div class="countdown">
            <div class="card">
                <div class="flip" id="hours">00</div>
                <div class="label">HOURS</div>
            </div>
            <div class="card">
                <div class="flip" id="minutes">00</div>
                <div class="label">MINUTES</div>
            </div>
            <div class="card">
                <div class="flip" id="seconds">00</div>
                <div class="label">SECONDS</div>
            </div>
        </div>
        <button class="reset">Reset</button>
    `;
    
    // Update element references
    hoursElement = document.getElementById('hours');
    minutesElement = document.getElementById('minutes');
    secondsElement = document.getElementById('seconds');
    
    clearInterval(interval);
    deadline = new Date();
    deadline.setTime(new Date().getTime() + 12 * 60 * 60 * 1000);
    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
    
    // Re-attach event listener
    document.querySelector('.reset').addEventListener('click', resetCountdown);
}

function updateCountdown() {
    const now = new Date().getTime();
    const diff = deadline.getTime() - now;
    
    if (diff <= 0) {
        clearInterval(interval);
        showExplosionMessage();
        return;
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    updateDisplay(hoursElement, hours);
    updateDisplay(minutesElement, minutes);
    updateDisplay(secondsElement, seconds, true);
}

// Initial update
updateCountdown();

// Update every second
let interval = setInterval(updateCountdown, 1000);

document.querySelector('.reset').addEventListener('click', resetCountdown);