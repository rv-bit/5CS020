async function fetchItems() {
    try {
        const response = await fetch('assets/items.json');
        const dataItems = await response.json();

        return dataItems;
    } catch (err) {
        console.error(err);
    }
}

const products = [
    {
        title: `MacBook Air 13" 2023 - Midnight`,
        description: `The new MacBook Air. Lightness strikes again.`,
        productId: `macbook_air_13_midnight`,
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-config-202402?wid=820&hei=498&fmt=jpeg&qlt=90&.v=1708371033110',
    },

    {
        title: `MacBook Pro 16" 2023 - Space Gray`,
        description: `The new MacBook Pro. Power. Moves.`,
        productId: `macbook_pro_16_space_gray`,
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202110?wid=904&hei=840&fmt=jpeg&qlt=95&.v=1634217871000',
    },

    {
        title: `iPhone 14 Pro - Graphite`,
        description: `The new iPhone 14 Pro. Pro camera. Pro display. Pro performance.`,
        productId: `iphone_14_pro_graphite`,
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-graphite-select-202209?wid=940&hei=1112&fmt=jpeg&qlt=95&.v=1662726826000',
    },

    {
        title: `iPad Pro 12.9" 2023 - Silver`,
        description: `The new iPad Pro. Your next computer is not a computer.`,
        productId: `ipad_pro_12_9_silver`,
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-202104?wid=940&hei=1112&fmt=jpeg&qlt=95&.v=1616704248000',
    },

    {
        title: `Apple Watch Series 8 - Blue`,
        description: `The new Apple Watch Series 8. The future of health is on your wrist.`,
        productId: `apple_watch_series_8_blue`,
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/aw-s8-blue-nc-202109?wid=940&hei=1112&fmt=jpeg&qlt=95&.v=1631636188000',
    },
];

let currentProductIndex = 0;
const updateProduct = () => {
    const product = products[currentProductIndex];

    const titleElement = document.querySelector('[data-top-product-title]');
    const descriptionElement = document.querySelector('[data-top-product-description]');
    const productIdElement = document.querySelector('[data-top-product-product_id]');
    const imageElement = document.querySelector('[data-top-product-image]');

    titleElement.setAttribute('data-top-product-title', product.title);
    descriptionElement.setAttribute('data-top-product-description', product.description);
    productIdElement.setAttribute('data-top-product-product_id', product.productId);

    titleElement.innerHTML = product.title
    descriptionElement.innerHTML = product.description
    productIdElement.href = `product.html?product_id=${product.productId}`;

    imageElement.setAttribute('src', product.image);

    currentProductIndex = (currentProductIndex + 1) % products.length;
}

let dataItems = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchItems().then((data) => {
        dataItems.push(...data);
    });

    dataItems.forEach((item) => {
        console.log(item);
    });

    // Update product every 5 seconds and at the beginning
    updateProduct();
    setInterval(updateProduct, 5000); // Change product every 5 seconds
});