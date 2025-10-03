const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

const deadline = new Date();
const current = new Date();
deadline.setTime(current.getTime() + 12 * 60 * 60 * 1000);

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

function updateCountdown() {
    const now = new Date().getTime();
    const diff = deadline.getTime() - now;
    
    if (diff <= 0) {
        clearInterval(interval);
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
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

document.querySelector('.reset').addEventListener('click', () => {
    clearInterval(interval);
    const newDeadline = new Date();
    newDeadline.setTime(new Date().getTime() + 12 * 60 * 60 * 1000);
    deadline.setTime(newDeadline.getTime());
    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
});