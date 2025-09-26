const halfCircles = document.querySelectorAll('.half-circle');
const halfCircleTop = document.querySelector('.half-circle-top');
const progressBarCircle = document.querySelector('.progressbar-circle');

document.addEventListener('scroll', () => {
    const pageViewPortHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const scrolledPortion = window.pageYOffset;
    const scrolledPortionPercent = (scrolledPortion / (pageHeight - pageViewPortHeight)) * 100;
    const scrolledPortionDegree = (scrolledPortion / (pageHeight - pageViewPortHeight)) * 360;

    halfCircles.forEach(halfCircle => {
        halfCircle.style.transform = `rotate(${scrolledPortionDegree}deg)`;

        if(scrolledPortionDegree >= 180) {
            halfCircles[0].style.transform = 'rotate(180deg)';
            halfCircleTop.style.opacity = '0';
        } else {
            halfCircleTop.style.opacity = '1';
        }
    })

    progressBarCircle.textContent = `${Math.round(scrolledPortionPercent)}%`;
})