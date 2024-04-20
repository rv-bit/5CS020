let cartProducts = [];
const createCartProducts = (cartItems, refresh) => {
    const cartParentContainer = document.querySelector('[role="main-cart"]');

    const cardsContainerParent = cartParentContainer.querySelector('[role="cart-cards"]');
    const cartTopInfo = cartParentContainer.querySelector('[role="cart-top-info"]');
    const cartBottomInfo = cartParentContainer.querySelector('[role="cart-summary"]');

    const cartContainer = cardsContainerParent.querySelector('[role="cart-item"]');

    if (refresh) {
        cartContainer.innerHTML = '';
    }

    if (cartProducts.length === 0) {
        const emptyCart = `
            <div class="w-full h-full flex flex-col justify-center items-center gap-5">
                <h1 class="font-Kanit text-3xl">Your cart is empty</h1>

                <div class="w-full h-[50px] flex justify-center items-center">
                    <button class="w-[60%] max-sm:w-full h-full relative shadow-2xl"
                        onclick="window.location.href = '../pages/products.html'">
                        <div
                            class="w-full h-full bg-[#646464] text-white font-Kanit text-xl py-3 px-5 rounded-sm z-10">
                        </div>

                        <div
                            class="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-black text-white text-center font-Kanit text-xl py-3 px-5 rounded-sm transition ease-in-out delay-50 hover:-translate-y-2 hover:-translate-x-2 hover:scale-100 z-20 hover:drop-shadow-2xl">
                            Browse products
                        </div>
                    </button>
                </div>
            </div>
        `;

        cartContainer.insertAdjacentHTML('afterbegin', emptyCart);
        cartBottomInfo.classList.add('hidden');
        cartBottomInfo.classList.remove('flex');

        cartTopInfo.classList.add('hidden');
        cartTopInfo.classList.remove('flex');
        return;
    }

    if (cartBottomInfo.classList.contains('hidden')) {
        cartBottomInfo.classList.remove('hidden');
        cartBottomInfo.classList.add('flex');
    }

    if (cartTopInfo.classList.contains('hidden')) {
        cartTopInfo.classList.remove('hidden');
        cartTopInfo.classList.add('flex');
    }

    let cartTotal = cartProducts.reduce((acc, product) => {
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
    const cartTopInfoItemsParent = cartTopInfo.children[1];

    cartTotal = parseFloat((cartTotal + taxes).toFixed(2));
    cartTopInfoItemsParent.innerHTML = `TOTAL <span>(${cartProducts.length} Items)</span> <span class="font-semibold before:content-['£']">${cartTotal}</span>`;

    const cartBottomInfoSummaryContainer = cartBottomInfo.children[0];

    const cartBottomInfoSummaryItems = cartBottomInfoSummaryContainer.children[0];
    const cartBottomInfoSummaryItemsTotal = cartBottomInfoSummaryItems.children[1].children[1];

    cartBottomInfoSummaryItemsTotal.innerHTML = `${cartProducts.length}`;

    const cartBottomInfoTotal = cartBottomInfoSummaryContainer.children[1];
    const cartBottomInfoTaxes = cartBottomInfoTotal.children[0].querySelector('[role="taxes-price"]');
    const cartBottomInfoGrandTotal = cartBottomInfoTotal.children[1];

    cartBottomInfoGrandTotal.innerHTML = `${cartTotal}`;
    cartBottomInfoTaxes.innerHTML = `${taxes}`;

    cartProducts.forEach((product, index) => {
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
            <div role="cart-product"
                class="w-full h-fit max-h-[300px] max-md:max-h-fit flex justify-between max-md:flex-col max-md:justify-start border rounded-sm gap-2 p-5">

                <div class="w-full h-fit flex max-md:flex-col items-center gap-5">
                    <div class="w-fit h-full flex justify-start max-md:justify-center items-center">
                        <img src="${productImage}" alt="product-1" onerror="this.src='../assets/images/utils/error.webp'; this.alt='error-image'"
                            class="size-[200px] object-cover" />
                    </div>

                    <div class="w-[60%] max-md:w-full h-full flex flex-col gap-5">
                        <div class="h-full w-full flex flex-col gap-2">
                            <h1 class="font-Kanit text-3xl truncate">${product.product_name}</h1>

                            <div class="w-full h-full flex flex-col">
                                <div class="flex justify-start items-center mr-2 hover:cursor-pointer"
                                    onclick="closeOptions(this)">
                                    <h1 class="text-xl font-Kanit pr-2">Description</h1>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-plus">
                                        <path d="M5 12h14" />
                                        <path d="M12 5v14" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-minus hidden">
                                        <path d="M5 12h14" />
                                    </svg>
                                </div>

                                <div class="w-full h-full hidden flex-col">
                                    <p
                                        class="font-Kanit text-md text-ellipsis text-ellipsis overflow-hidden">
                                        ${product.product_description}    
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="w-fit h-fit max-md:w-full flex max-extraSm:flex-col gap-5">
                            <div
                                class="flex justify-between flex-row border border-black rounded-[5px] w-[150px] max-md:w-full h-[50px] overflow-hidden">
                                <button onclick="quantityChange(this, '${productId}', 'decrease', updateBasketItems)"
                                    class="size-auto hover:bg-[#8c8c86] opactity-40 max-md:mr-2 px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-minus">
                                        <path d="M5 12h14" />
                                    </svg>
                                </button>
                                <input onchange="quantityChange(this, '${productId}', 'input', updateBasketItems)" type="number" inputmode="numeric"
                                    class="h-full max-w-[60px] max-xl:max-w-[45px] text-center focus:outline-none border-0 focus:ring-transparent no-input-spin"
                                    value="${productQuantity}" />
                                <button onclick="quantityChange(this, '${productId}', 'increase', updateBasketItems)"
                                    class="size-auto hover:bg-[#8c8c86] opactity-40 max-md:ml-2 px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-plus">
                                        <path d="M5 12h14" />
                                        <path d="M12 5v14" />
                                    </svg>
                                </button>
                            </div>

                            <div
                                class="flex justify-center items-center max-extraSm:justify-start gap-2">

                                <button
                                    onclick="window.location.href='../pages/product.html?product_id=${productId}'"
                                    class="w-fit h-full">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-eye transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:text-blue-300 hover:cursor-pointer">
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </button>

                                <button
                                    onclick="addToWishlist('${productId}', updateWishlistItems); removeFromCart('${productId}', updateBasketItems)"
                                    class="w-fit h-full">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-heart transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:text-red-300 hover:cursor-pointer">
                                        <path
                                            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    </svg>
                                </button>

                                <button
                                    onclick="removeFromCart('${productId}', updateBasketItems)"
                                    class="w-fit h-full">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-trash-2 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:text-red-600 hover:cursor-pointer">
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                        <line x1="10" x2="10" y1="11" y2="17" />
                                        <line x1="14" x2="14" y1="11" y2="17" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-fit h-full flex flex-col justify-between max-extraSm:mt-2">
                    <div class="flex flex-col justify-start items-end gap-2">
                        <h2 class="font-Kanit text-lg max-extraSm:text-2xl before:content-['£']">${productPrice}</h2>
                    </div>
                </div>
            </div>
        `;

        cartContainer.insertAdjacentHTML('afterbegin', div);
    });
}

let wishListProducts = [];
const createdSavedProducts = (refresh) => {
    const savedParentContainer = document.querySelector('[role="saved-items"]');

    const cardsContainerParent = savedParentContainer.querySelector('[role="saved-cart-cards"]');
    const savedTopInfo = savedParentContainer.querySelector('[role="saved-cart-top-info"]');

    const savedContainer = cardsContainerParent.querySelector('[role="saved-cart-item"]');

    if (refresh) {
        savedContainer.innerHTML = '';
    }

    if (wishListProducts.length === 0) {
        const emptyCart = `
            <div class="w-full h-full flex flex-col justify-center items-center gap-5">
                <h1 class="font-Kanit text-3xl">Your wishlist is empty</h1>
            </div>
        `;

        savedContainer.insertAdjacentHTML('afterbegin', emptyCart);
        return;
    }

    wishListProducts.forEach((product, index) => {
        var product_image = product.product_image;
        const productId = product.product_name.replace(/\s/g, '-').toLowerCase();
        const productCategory = product.product_category.toLowerCase();

        const productPrice = parseFloat(product.product_price);

        let productImage = `../assets/images/products/${productCategory}/${product_image}`;

        if (typeof product_image === undefined || product_image === '' || product_image === null) {
            productImage = '../assets/images/utils/error.webp';
        } else if (typeof product_image === 'object') {
            productImage = `../assets/images/products/${productCategory}/${product_image[0]}`;
        } else {
            productImage = `../assets/images/products/${productCategory}/${product.product_image}`;
        }

        const div = `
            <div role="saved-cart-product"
                class="w-full h-fit max-h-[300px] max-md:max-h-fit flex justify-between items-center max-md:flex-col max-md:justify-start max-md:items-start border rounded-sm gap-2 p-5">

                <div class="w-full h-fit flex max-md:flex-col items-center max-md:items-start gap-5">
                    <div class="w-fit h-full flex justify-start max-md:justify-center items-center">
                        <img src="${productImage}" alt="product-1" onerror="this.src='../assets/images/utils/error.webp'; this.alt='error-image'"
                            class="size-[200px] object-cover" />
                    </div>

                    <div class="w-[80%] max-xl:w-[60%] max-md:w-full h-full flex flex-col gap-5">
                        <div class="w-full h-full flex flex-col gap-2">
                            <h1 class="font-Kanit text-3xl truncate">${product.product_name}</h1>

                            <div class="w-full h-full flex flex-col">
                                <div class="flex justify-start items-center mr-2 hover:cursor-pointer"
                                    onclick="closeOptions(this)">
                                    <h1 class="text-xl font-Kanit mr-2">Description</h1>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-plus">
                                        <path d="M5 12h14" />
                                        <path d="M12 5v14" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-minus hidden">
                                        <path d="M5 12h14" />
                                    </svg>
                                </div>

                                <div class="w-full h-full hidden flex-col">
                                    <p
                                        class="font-Kanit text-md text-ellipsis text-ellipsis overflow-hidden">
                                        ${product.product_description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onclick="removeFromWishlist('${productId}', updateWishlistItems)"
                            class="w-fit h-fit flex justify-center items-center max-extraSm:justify-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-heart text-red-300 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:text-gray-300 hover:cursor-pointer">
                                <path
                                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                        </button>
                    </div>

                </div>

                <h2 class="font-Kanit text-lg text-center max-extraSm:text-2xl">£39.99</h2>
            </div>
        `

        savedContainer.insertAdjacentHTML('afterbegin', div);
    })
}

const updateBasketItems = (cartItems) => {
    createCartProducts(cartItems, true);

    cartProducts = [];

    fetchItems().then((data) => {
        if (!data) return;

        if (data.length === 0) {
            return;
        }

        const productExists = Object.entries(data).some(([key, value]) => {
            const productId = value.product_name.replace(/\s/g, '-').toLowerCase();
            return cartItems.find(product => product.id === productId);
        })

        if (!productExists) {
            return;
        }

        Object.entries(data).forEach(([key, value]) => {
            const productId = value.product_name.replace(/\s/g, '-').toLowerCase();
            if (cartItems.find(product => product.id === productId)) {
                cartProducts.push(value);
            }
        })
    }).then(() => {
        createCartProducts(cartItems, true);
    });
}

const updateWishlistItems = (wishListItems) => {
    createdSavedProducts(true);

    wishListProducts = [];

    fetchItems().then((data) => {
        if (!data) return;

        if (data.length === 0) {
            return;
        }

        const productExists = Object.entries(data).some(([key, value]) => {
            const productId = value.product_name.replace(/\s/g, '-').toLowerCase();
            return wishListItems.find(product => product.id === productId);
        })

        if (!productExists) {
            return;
        }

        Object.entries(data).forEach(([key, value]) => {
            const productId = value.product_name.replace(/\s/g, '-').toLowerCase();
            if (wishListItems.find(product => product.id === productId)) {
                wishListProducts.push(value);
            }
        });
    }).then(() => {
        createdSavedProducts(true);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartAmount = cartItems.length;

    const wishListItems = JSON.parse(localStorage.getItem('wishlist')) || [];

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
                if (wishListItems.find(product => product.id === productId)) {
                    removeFromCart(productId);
                }
                cartProducts.push(value);
            } else if (wishListItems.find(product => product.id === productId)) {
                wishListProducts.push(value);
            }
        });
    }).then(() => {
        createCartProducts(cartItems);
        createdSavedProducts();
    });
})