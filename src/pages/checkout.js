document.addEventListener('DOMContentLoaded', () => {
    let isDown = false;
    let startX;
    let scrollLeft;

    const scrollableImages = document.querySelector('.scrollable-div');

    scrollableImages.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - scrollableImages.offsetLeft;
        scrollLeft = scrollableImages.scrollLeft;
    });

    scrollableImages.addEventListener('mouseleave', (e) => {
        isDown = false;
        scrollableImages.scrollLeft = scrollableImages.scrollLeft;
    });

    scrollableImages.addEventListener('mouseup', (e) => {
        isDown = false;
        scrollableImages.scrollLeft = scrollableImages.scrollLeft;
    });

    scrollableImages.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX - scrollableImages.offsetLeft;
        const walk = (x - startX);

        scrollableImages.scrollLeft = scrollLeft - walk;
    });
});