const slideImages = (element, trigger) => {
    const elementParent = element.parentElement;
    const elementChildren = elementParent.children;

    const imageSlider = elementChildren[1];

    imageSlider.style.scrollBehavior = 'smooth';

    if (trigger === 'next') {
        imageSlider.scrollLeft += 100;
        return;
    }

    imageSlider.scrollLeft -= 100;
}

const selectImage = (element) => {
    const elementChildren = element.children;

    const elementParent = element.parentElement;
    const elementGrandParent = elementParent.parentElement;
    const elementParentChildren = elementGrandParent.children;

    const imageOfParentChildren = elementParentChildren[0].children[0].src;
    const imageOfElement = element.children[0].src;

    elementParentChildren[0].children[0].src = imageOfElement;

    const buttons = document.querySelectorAll('.product-thumbnail');
    buttons.forEach(button => {
        button.classList.remove('ring-2', 'ring-offset-1', 'transition', 'ease-in-out', 'delay-50', '-translate-y-1', 'scale-110', 'ring-[#FEE7DB]');
    });

    element.classList.add('ring-2', 'ring-offset-1', 'transition', 'ease-in-out', 'delay-50', '-translate-y-1', 'scale-110', 'ring-[#FEE7DB]');
}

const selectFilters = (element, elementClass) => {
    const buttons = document.querySelectorAll(`.${elementClass}`);
    buttons.forEach(button => {
        button.classList.remove('ring-2', 'ring-offset-1', 'transition', 'ease-in-out', 'delay-50', '-translate-y-1', 'scale-110', 'ring-[#FEE7DB]');
    });

    element.classList.add('ring-2', 'ring-offset-1', 'transition', 'ease-in-out', 'delay-50', '-translate-y-1', 'scale-110', 'ring-[#FEE7DB]');

    // const dataAttribute = element.dataset;
    // if (Object.keys(dataAttribute).length > 0) {
    //     console.log('data attribute exists', dataAttribute);
    //     const dataAttributeValue = Object.values(dataAttribute)[0];

    //     const urlParams = new URLSearchParams(window.location.search);
    //     urlParams.set(elementClass, dataAttributeValue);

    //     const newUrl = window.location.pathname + '?' + urlParams.toString();
    //     history.pushState({ state: urlParams.toString() }, '', newUrl);

    //     return;
    // }

    // const urlParams = new URLSearchParams(window.location.search);
    // urlParams.set(elementClass, element.innerText);

    // const newUrl = window.location.pathname + '?' + urlParams.toString();
    // history.pushState({ state: urlParams.toString() }, '', newUrl);
}

const quantityChange = (element, trigger) => {
    const elementParent = element.parentElement;
    const elementChildren = elementParent.children;

    const quantity = elementChildren[1];

    if (trigger === 'increase') {
        if (quantity.value === '10') {
            alert('Maximum quantity reached for this product.');
            return;
        }

        quantity.value = parseInt(quantity.value) + 1;
        return;
    }

    if (quantity.value === '1') {
        return;
    }

    quantity.value = parseInt(quantity.value) - 1;
}

// window.addEventListener('popstate', function (event) {
//     const params = window.location.search.substring(1).split('&');

//     if (Object.keys(params).length <= 0) {
//         return;
//     }

//     for (const key of Object.keys(params)) {
//         const param = params[key];
//         const [keyParam, value] = param.split('=');

//         if (keyParam === 'product_id') {
//             continue;
//         }

//         const buttons1 = document.querySelectorAll('.color-filter');
//         const buttons2 = document.querySelectorAll('.size-filter');

//         buttons1.forEach(button => {
//             button.classList.remove('ring-2', 'ring-offset-1', 'transition', 'ease-in-out', 'delay-50', '-translate-y-1', 'scale-110', 'ring-[#FEE7DB]');
//         });
//         buttons2.forEach(button => {
//             button.classList.remove('ring-2', 'ring-offset-1', 'transition', 'ease-in-out', 'delay-50', '-translate-y-1', 'scale-110', 'ring-[#FEE7DB]');
//         });

//         if (keyParam === 'size-filter') {
//             const buttons = document.querySelectorAll(`.${keyParam}`);
//             buttons.forEach(button => {
//                 button.classList.remove('ring-2', 'ring-offset-1', 'transition', 'ease-in-out', 'delay-50', '-translate-y-1', 'scale-110', 'ring-[#FEE7DB]');
//             });

//             buttons.forEach(b => {
//                 if (b.innerText !== '' && b.innerText === value) {
//                     b.classList.add('ring-2', 'ring-offset-1', 'transition', 'ease-in-out', 'delay-50', '-translate-y-1', 'scale-110', 'ring-[#FEE7DB]');
//                 }
//             });
//         }

//         if (keyParam === 'color-filter') {
//             const buttons = document.querySelectorAll(`.${keyParam}`);
//             buttons.forEach(button => {
//                 button.classList.remove('ring-2', 'ring-offset-1', 'transition', 'ease-in-out', 'delay-50', '-translate-y-1', 'scale-110', 'ring-[#FEE7DB]');
//             });

//             buttons.forEach(b => {
//                 const dataAttribute = b.dataset;

//                 if (Object.keys(dataAttribute).length > 0) {
//                     const dataAttributeValue = Object.values(dataAttribute)[0];
//                     if (dataAttributeValue === value) {
//                         b.classList.add('ring-2', 'ring-offset-1', 'transition', 'ease-in-out', 'delay-50', '-translate-y-1', 'scale-110', 'ring-[#FEE7DB]');
//                     }
//                 }
//             });
//         }
//     };
// });

document.addEventListener('DOMContentLoaded', () => {
    window.onload = function () {
        console.log('loaded');
    }

    let isDown = false;
    let startX;
    let scrollLeft;

    const scrollableImages = document.querySelector('.scrollable-div');

    scrollableImages.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - scrollableImages.offsetLeft;
        scrollLeft = scrollableImages.scrollLeft;
    });

    scrollableImages.addEventListener('mouseleave', () => {
        isDown = false;
        scrollableImages.scrollLeft = scrollLeft;
    });

    scrollableImages.addEventListener('mouseup', () => {
        isDown = false;
        console.log('mouseup');
    });

    scrollableImages.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX - scrollableImages.offsetLeft;
        const walk = (x - startX);

        scrollableImages.scrollLeft = scrollLeft - walk;
    });
});