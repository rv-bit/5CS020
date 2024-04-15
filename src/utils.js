async function fetchItems() {
    try {
        const response = await fetch('../assets/items.json');
        const dataItems = await response.json();

        return dataItems;
    } catch (err) {
        console.error(err);
    }
}

const openMenu = () => {
    const menu = document.getElementById('menu_dropdown');
    const body = document.querySelector('body');

    if (menu.classList.contains('flex')) {
        menu.classList.add('slide-top');

        setTimeout(() => {
            menu.classList.remove('slide-top');

            menu.classList.add('hidden');
            menu.classList.remove('flex');
        }, 500); // Remove the class after 0.5s, which is the duration of the animation

        // Enable scrolling
        body.style.overflow = '';
        return;
    }

    body.style.overflow = 'hidden';

    menu.classList.add('flex');
    menu.classList.remove('hidden');

    menu.classList.add('slide-bottom');
    setTimeout(() => {
        menu.classList.remove('slide-bottom');
    }, 500); // Remove the class after 0.5s, which is the duration of the animation
}

const closeOptions = (selectElement, no_Svg) => { // no_Svg is a boolean that is used to determine if the selectElement is a child of a child of a child
    var parent = selectElement.parentElement;
    var childrenOfParent = parent.children;

    var children = selectElement.children;

    if (no_Svg) {
        var grandParent = parent.parentElement;
        var grandChildren = grandParent.children;

        if (grandChildren[1].classList.contains('flex')) {
            grandChildren[1].classList.remove('flex');
            grandChildren[1].classList.add('hidden');
        } else {
            grandChildren[1].classList.remove('hidden');
            grandChildren[1].classList.add('flex');
        }
        return;
    }

    var childOfChildSVG = children[0].children;
    var childOfChildContent = children[1];

    if (childOfChildSVG.length === 0) {
        childOfChildSVG = childrenOfParent[0].children;
        childOfChildContent = childrenOfParent[1];
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

const quantityChange = (element, trigger) => {
    const elementParent = element.parentElement;
    const elementChildren = elementParent.children;

    const quantity = elementChildren[1];

    if (trigger === 'input') {
        if (quantity.value === '' || parseInt(quantity.value) < 0) {
            quantity.value = 1;
            return;
        }

        if (parseInt(quantity.value) > 10) {
            alert('Maximum quantity reached for this product.');
            quantity.value = 10;
            return;
        }

        return;
    }


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

const slideImages = (trigger) => {
    var element = document.querySelector('.scrollable-div');

    if (trigger === 'next') {
        element.scrollTo({
            left: element.scrollLeft + 100,
            behavior: 'smooth'
        });

        return;
    }

    element.scrollTo({
        left: element.scrollLeft - 100,
        behavior: 'smooth'
    });
}

const addToCart = (id, quantity) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const product = {
        id: id,
        quantity: quantity || 1
    };

    cart.push(product);

    localStorage.setItem('cart', JSON.stringify(cart));
}

const addToWishlist = (id) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const product = {
        id: id
    };

    wishlist.push(product);

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

const updateBasketNumber = () => {
    const amountOfProducts = localStorage.getItem('amountOfProducts') || 0;

    const amount = parseInt(amountOfProducts) + 1;

    localStorage.setItem('amountOfProducts', amount);

    const element = document.querySelectorAll('.product-amount-baskets');
    element.forEach(product => {
        element.textContent = amount;
    })
}

const amountOfProducts = localStorage.getItem('amountOfProducts') || 10;
document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product-amount-baskets');

    products.forEach(product => {
        product.textContent = amountOfProducts;
    })
});