const adjustWidthSelectors = (selectedElement) => {
    var tempElement = document.createElement('span');

    console.log(selectedElement.options[selectedElement.selectedIndex].text)

    tempElement.innerHTML = selectedElement.options[selectedElement.selectedIndex].text;
    tempElement.style.visibility = 'hidden'; // make it invisible but still rendered
    tempElement.style.position = 'absolute'; // prevent it from affecting other elements

    document.body.appendChild(tempElement);
    console.log(tempElement.offsetWidth); // log the width
    selectedElement.style.width = tempElement.offsetWidth + 10 + 'px';
    document.body.removeChild(tempElement);
}

const closeOptions = (selectElement) => {
    var children = selectElement.children;
    var childOfChildSVG = children[0].children;
    var childOfChildContent = children[1];

    if (childOfChildSVG[2] === undefined) {
        childOfChildSVG = childOfChildSVG[0].children;
    }

    if (childOfChildContent === undefined) {
        childOfChildContent = children[0].children[1];
    }

    if (childOfChildSVG[1].classList.contains('hidden')) {
        childOfChildSVG[1].classList.remove('hidden');
        childOfChildSVG[2].classList.add('hidden');

        childOfChildContent.classList.add('hidden');
    } else {
        childOfChildSVG[1].classList.add('hidden');
        childOfChildSVG[2].classList.remove('hidden');

        childOfChildContent.classList.remove('hidden');
    }
}

const openFilterMenu = () => {
    const element = document.getElementById('menu_dropdown_filters');
    const body = document.querySelector('body');

    if (element.classList.contains('flex')) {
        element.classList.add('slide-top');

        setTimeout(() => {
            element.classList.remove('slide-top');

            element.classList.add('hidden');
            element.classList.remove('flex');
        }, 500); // Remove the class after 0.5s, which is the duration of the animation

        // Enable scrolling
        body.style.overflow = '';
        return;
    }

    body.style.overflow = 'hidden';

    element.classList.add('flex');
    element.classList.remove('hidden');

    element.classList.add('slide-bottom');
    setTimeout(() => {
        menu.classList.remove('slide-bottom');
    }, 500); // Remove the class after 0.5s, which is the duration of the animation
}

document.addEventListener('DOMContentLoaded', () => {
    window.onload = function () {
        var selectElement = document.getElementById('sort');
        adjustWidthSelectors(selectElement);
    } // onload, adjust the width of the select element
});