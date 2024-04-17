let checkoutProducts = [];
const createCheckoutItems = (cartItems) => {
    if (cartItems.length <= 0) {
        window.location.href = '../pages/cart.html';
        return
    }

    const parentDiv = document.querySelector('[role="summary-items"]');
    const totalOrderParent = document.querySelector('[role="total-order"]');

    const infoContainer = parentDiv.children[0];
    const infoContainerAmountItems = infoContainer.children[0];
    const infoContainerAmountTotal = infoContainer.children[1].children[0];

    const itemsContainerParent = parentDiv.children[1].children[0];

    itemsContainerParent.innerHTML = '';
    infoContainerAmountItems.innerHTML = `${cartItems.length} Items`;

    let cartTotal = checkoutProducts.reduce((acc, product) => {
        const cartItem = cartItems.find(item => item.id === product.product_name.replace(/\s/g, '-').toLowerCase());

        if (cartItem) {
            return acc + parseFloat((product.product_price * cartItem.quantity).toFixed(2));
        }

        return acc;
    }, 0);

    if (typeof cartTotal !== 'number') {
        console.log('Cart total is not a number or is undefined.');
        return;
    }

    const taxes = parseFloat(generateTaxes(cartTotal).toFixed(2));

    infoContainerAmountTotal.innerHTML = `${cartTotal}`;

    const subTotalElement = totalOrderParent.children[0].children[1];
    const taxesElement = totalOrderParent.children[1].children[1];
    const totalElement = totalOrderParent.children[2].children[1];

    subTotalElement.innerHTML = `${cartTotal}`;
    taxesElement.innerHTML = `${taxes}`;
    totalElement.innerHTML = `${(cartTotal + taxes).toFixed(2)}`;

    checkoutProducts.forEach((product, index) => {
        var product_image = product.product_image;
        const productId = product.product_name.replace(/\s/g, '-').toLowerCase();
        const productCategory = product.product_category.toLowerCase();

        const cartItem = cartItems.find(product => product.id === productId);

        const productQuantity = cartItem ? cartItem.quantity : 1;
        const productPrice = parseFloat((product.product_price * productQuantity).toFixed(2));

        let productImage = `../assets/images/products/${productCategory}/${product_image}`;

        if (typeof product_image === undefined || product_image === '' || product_image === null) {
            productImage = '../assets/images/utils/error.webp';
        } else if (typeof product_image === 'object') {
            productImage = `../assets/images/products/${productCategory}/${product_image[0]}`;
        } else {
            productImage = `../assets/images/products/${productCategory}/${product.product_image}`;
        }

        const div = `
            <div class="w-[200px] h-full flex justify-start items-center shrink-0">
                <img src="${productImage}" alt="checkout"
                    class="size-[120px] object-cover">
            </div>
        `

        itemsContainerParent.insertAdjacentHTML('afterbegin', div);

    });
}

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartAmount = cartItems.length;

    if (cartAmount > 0) {
        fetchItems().then((data) => {
            if (!data) return;

            if (data.length === 0) {
                return;
            }

            const productExists = Object.entries(data).some(([key, value]) => {
                const productId = value.product_name.replace(/\s/g, '-').toLowerCase();
                return cartItems.find(product => product.id === productId) || wishListItems.find(product => product.id === productId);
            })

            if (!productExists) {
                return;
            }

            Object.entries(data).forEach(([key, value]) => {
                const productId = value.product_name.replace(/\s/g, '-').toLowerCase();

                if (cartItems.find(product => product.id === productId)) {
                    checkoutProducts.push(value);
                }
            });
        }).then(() => {
            createCheckoutItems(cartItems);
        });
    } else {
        window.location.href = '../pages/cart.html';
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