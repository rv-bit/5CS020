async function fetchItems() {
    try {
        const response = await fetch('assets/items.json');
        const dataItems = await response.json();

        return dataItems;
    } catch (err) {
        console.error(err);
    }
}

const products_top = [];
let currentProductIndex = 0;
const updateProduct = () => {
    console.log('Updating product...', currentProductIndex);
    const product = products_top[currentProductIndex];

    console.log(product);

    if (!product) {
        return;
    }

    const parentDiv = document.getElementById('data_home_top_products');
    const contentDivs = parentDiv.querySelectorAll('.flex');

    contentDivs.forEach(div => div.classList.add('slide-out'));

    setTimeout(() => {
        const titleElement = document.querySelector('[data-top-product-title]');
        const descriptionElement = document.querySelector('[data-top-product-description]');
        const productIdElement = document.querySelector('[data-top-product-product_id]');
        const imageElement = document.querySelector('[data-top-product-image]');

        titleElement.setAttribute('data-top-product-title', product.product_name);
        descriptionElement.setAttribute('data-top-product-description', product.product_description);
        productIdElement.setAttribute('data-top-product-product_id', product.product_id);

        titleElement.innerHTML = product.product_name
        descriptionElement.innerHTML = product.product_description
        productIdElement.href = `product.html?product_id=${product.product_id}`;

        imageElement.setAttribute('src', product.product_image);

        contentDivs.forEach(div => {
            div.classList.remove('slide-out');
            div.classList.add('slide-in');
        });

        setTimeout(() => {
            contentDivs.forEach(div => div.classList.remove('slide-in'));
            currentProductIndex = (currentProductIndex + 1) % products_top.length;
        }, 500); // Remove the class after 0.5s, which is the duration of the animation

    }, 500);
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

document.addEventListener('DOMContentLoaded', () => {
    fetchItems().then((data) => {
        if (data.length === 0) {
            return;
        }

        Object.entries(data).forEach(([key, value]) => {
            if (value['top_seller']) {
                products_top.push(value);
            }
        });
    }).then(() => {
        updateProduct();
        setInterval(updateProduct, 5000); // Change product every 5 seconds
    });
});