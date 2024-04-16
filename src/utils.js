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

const quantityChange = (element, productId, trigger, cb) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const elementParent = element.parentElement;
    const elementChildren = elementParent.children;

    const quantity = elementChildren[1];

    if (cartItems.length > 0) {
        const productExists = cartItems.find(product => product.id === productId);
        const location = window.location.href;

        if (productExists && !location.includes('cart.html')) {
            window.location.href = '../pages/cart.html';
            return;
        }
    }

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

        updateCart(productId, parseInt(quantity.value), cb);
        return;
    }

    if (trigger === 'increase') {
        if (quantity.value === '10') {
            alert('Maximum quantity reached for this product.');
            return;
        }

        quantity.value = parseInt(quantity.value) + 1;

        updateCart(productId, parseInt(quantity.value), cb);
        return;
    }

    if (quantity.value === '1') {
        return;
    }

    quantity.value = parseInt(quantity.value) - 1;
    updateCart(productId, parseInt(quantity.value), cb);
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

const generateTaxes = (total) => {
    return taxes = total * 0.15;
}

const addToCart = (id, quantity) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const productExists = cartItems.find(product => product.id === id);

    var quantity = parseInt(quantity) || 1;

    if (productExists) {
        window.location.href = '../pages/cart.html';
        return;
    }

    const productExistsInWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const productExistsWishlist = productExistsInWishlist.find(product => product.id === id);

    if (productExistsWishlist) {
        removeFromWishlist(id);
    }

    const tempCart = JSON.parse(localStorage.getItem('tmpCart')) || [];
    const productExistsTemp = tempCart.find(product => product.id === id);
    const productIndexTemp = tempCart.findIndex(product => product.id === id);

    const product = {
        id: id,
        quantity: productExistsTemp ? productExistsTemp.quantity : quantity
    };

    cartItems.push(product);
    tempCart.splice(productIndexTemp, 1);

    localStorage.setItem('cart', JSON.stringify(cartItems));
    localStorage.setItem('tmpCart', JSON.stringify(tempCart));

    const location = window.location.href;

    if (!location.includes('cart.html')) {
        window.location.href = '../pages/cart.html';
    }

    updateBasketNumber();
}

const updateCart = (id, quantity, cb) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const productExists = cartItems.find(product => product.id === id);

    if (!productExists) {
        const tempCart = JSON.parse(localStorage.getItem('tmpCart')) || [];
        const productExistsTemp = tempCart.find(product => product.id === id);

        if (productExistsTemp) {
            productExistsTemp.quantity = quantity;

            localStorage.setItem('tmpCart', JSON.stringify(tempCart));
            return;
        }

        const product = {
            id: id,
            quantity: quantity
        };

        tempCart.push(product);

        localStorage.setItem('tmpCart', JSON.stringify(tempCart));
        return;
    }

    productExists.quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cartItems));

    if (typeof cb === 'function') {
        cb(cartItems);
    }
}

const removeFromCart = (id, cb) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cartItems.findIndex(product => product.id === id);

    if (productIndex === -1) {
        return;
    }

    cartItems.splice(productIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    updateBasketNumber();

    if (cb) {
        cb(cartItems);
    }
}

const addToWishlist = (id, cb) => {
    console.log('Adding to wishlist...', id);

    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const productExists = wishlist.find(product => product.id === id);

    const location = window.location.href;

    if (productExists) {
        if (!location.includes('cart.html')) {
            window.location.href = '../pages/cart.html';
        }
        return;
    }

    const product = {
        id: id
    };

    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    if (cb) {
        cb(wishlist);
    } else {
        const productExistsInCart = JSON.parse(localStorage.getItem('cart')) || [];
        const productExistsCart = productExistsInCart.find(product => product.id === id);

        if (productExistsCart) {
            removeFromCart(id);
        }
    }

    if (!location.includes('cart.html')) {
        // console.log('Redirecting to cart...');
        window.location.href = '../pages/cart.html';
    }
}

const removeFromWishlist = (id, cb) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const productIndex = wishlist.findIndex(product => product.id === id);

    if (productIndex === -1) {
        return;
    }

    wishlist.splice(productIndex, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    if (cb) {
        cb(wishlist);
    }
}

const updateBasketNumber = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartAmount = cartItems.length;

    const productAmn = document.querySelectorAll('.product-amount-baskets');
    productAmn.forEach(element => {
        element.textContent = cartAmount;
    })
}

document.addEventListener('DOMContentLoaded', () => {
    updateBasketNumber();
});