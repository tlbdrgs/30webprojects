const btn = document.querySelector('.btn');

btn.addEventListener('mouseenter', (e) => {
    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientY - e.target.getBoundingClientRect().top;

    ripple = document.createElement('div');
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;
    ripple.classList.add('ripple');
    btn.prepend(ripple);
})

btn.addEventListener('mouseleave', () => {
    ripple.remove();
});