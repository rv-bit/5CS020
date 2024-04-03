let isDown = false;
let startX;
let scrollLeft;

async function fetchItems() {
    try {
        const response = await fetch('assets/items.json');
        const dataItems = await response.json();

        return dataItems;
    } catch (err) {
        console.error(err);
    }
}

const smoothScroll = (target, scrollLeft) => {
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const result = Math.min(scrollLeft + progress / 1000 * 300, target.scrollLeft);
        target.scrollLeft = result;
        if (result < target.scrollLeft) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('scrollable-div');

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;

        smoothScroll(slider, slider.scrollLeft);
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });

    const dataItems = [];
    fetchItems().then((data) => {
        dataItems.push(...data);
    });

    dataItems.forEach((item) => {
        console.log(item);
    });
});