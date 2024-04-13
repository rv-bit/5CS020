const adjustWidthSelectors = (selectedElement) => {
    var tempElement = document.createElement('span');

    console.log(selectedElement.options[selectedElement.selectedIndex].text)

    tempElement.innerHTML = selectedElement.options[selectedElement.selectedIndex].text;
    tempElement.style.visibility = 'hidden'; // make it invisible but still rendered
    tempElement.style.position = 'absolute'; // prevent it from affecting other elements

    document.body.appendChild(tempElement);
    selectedElement.style.width = tempElement.offsetWidth + 10 + 'px';
    document.body.removeChild(tempElement);
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
        element.classList.remove('slide-bottom');
    }, 500); // Remove the class after 0.5s, which is the duration of the animation
}

const openProductPage = (element) => {
    const elementParent = element.parentElement;
    const elementGrandParent = elementParent.parentElement;
    const elementGreatGrandParent = elementGrandParent.parentElement;
    const elementGreatGreatGrandParent = elementGreatGrandParent.parentElement;

    const productID = elementGreatGreatGrandParent.getAttribute('data-product-id');

    window.location.href = `product.html?product_id=${productID}`;
}

document.addEventListener('DOMContentLoaded', () => {
    var selectElement = document.querySelectorAll('.sort-selector');
    selectElement.forEach(element => {
        adjustWidthSelectors(element);
    });
});