const inputFormFields = [
    {
        id: 'card-card-number"',
        type: 'text',
        placeholder: 'xxxx xxxx xxxx xxxx',
        required: true,

        requiredText: 'Card number is required',
    },
    {
        id: 'card-expiry-date',
        type: 'text',
        placeholder: 'MM/YY',
        required: true,

        requiredText: 'Expiry date is required',
    },
    {
        id: 'card-cvv',
        type: 'text',
        placeholder: 'xxx',
        required: true,

        requiredText: 'CVV is required',
    },
    {
        id: 'email',
        type: 'email',
        placeholder: 'example@gmail.com',
        required: true,

        requiredText: 'Email is required',
    },
]

const inputAddressFields = [
    {
        id: 'post_code',
        type: 'text',
        placeholder: 'WV10 0AU',
        required: true,

        requiredText: 'Post code is required',
    },
    {
        id: 'house_number',
        type: 'text',
        placeholder: 'House Number',
        required: true,

        requiredText: 'Address is required',
    },
    {
        id: 'city',
        type: 'text',
        placeholder: 'City',
        required: true,

        requiredText: 'City is required',
    },
    {
        id: 'country',
        type: 'text',
        placeholder: 'United Kingdom',
        required: true,

        requiredText: 'Country is required',
    },
]

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

    let totalElements = totalOrderParent.children.length;

    const promoCodeExist = localStorage.getItem('promoCode');
    const promoCode = JSON.parse(promoCodeExist);
    const cartSubTotal = cartTotal;

    if (promoCodeExist) {
        const promoCodeDiscount = promoCode.discount / 100 * cartTotal;

        cartTotal = parseFloat((cartTotal - promoCodeDiscount + taxes).toFixed(2));
    } else {
        cartTotal = parseFloat((cartTotal + taxes).toFixed(2));
    }

    const div = `
        <div class="w-full h-fit flex justify-between items-center py-5 border-b-2 text-md font-medium">
            <h1>Subtotal</h1>
            <h1 class="before:content-['£']">${cartSubTotal}</h1>
        </div>

        ${promoCodeExist ? `
            <div class="w-full h-fit flex justify-between items-center py-5 border-b-2 text-md text-zinc-600">
                <h1 class="opacity-40">Discount</h1>
                <h1 class="opacity-40 after:content-['%']">${promoCode.code} - ${promoCode.discount}</h1>
            </div>
        ` : ''}

        <div class="w-full h-fit flex justify-between items-center py-5 border-b-2 text-md text-zinc-600">
            <h1 class="opacity-40">Tax</h1>
            <h1 class="opacity-40 before:content-['£']">${taxes}</h1>
        </div>

        <div class="w-full h-fit flex justify-between items-center py-5 text-lg font-semibold">
            <h1>Total</h1>
            <h1 class="before:content-['£']">${cartTotal}</h1>
        </div>
    `

    totalOrderParent.insertAdjacentHTML('afterbegin', div);

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
            <div class="w-[200px] h-full flex flex-col justify-start items-start shrink-0 gap-2">
                <img src="${productImage}" alt="checkout" onerror="this.src='../assets/images/utils/error.webp'; this.alt='error-image'"
                    class="size-[120px] object-cover">

                <div class="w-full h-full flex flex-col gap-5 justify-start items-start">
                    <h1
                        class="w-full max-h-[85px] tex-center text-xl font-medium text-ellipsis overflow-hidden break-words">${product.product_name}</h1>
                    <h1 class="text-xl font-medium before:content-['£']">${productPrice}</h1>
                </div>
            </div>
        `

        itemsContainerParent.insertAdjacentHTML('afterbegin', div);

    });
}

const checkoutPayment = () => {
    const billingSameAsShipping = document.getElementById('billing-same').checked;

    const billingLocationSearch = document.querySelector('[role="address_search_billing"]');
    const billingInputs = document.querySelectorAll('[role="address_information_billing"] input');

    if (billingSameAsShipping) {
        billingInputs.forEach((input) => {
            input.required = false;
        });

        billingLocationSearch.required = false;
    } else {
        billingInputs.forEach((input) => {
            input.required = true;
        });

        billingLocationSearch.required = true;
    }

    const section = document.querySelector('section[role="form-section"]');
    const inputs = section.querySelectorAll('input');

    let inputsArrayOfNotFilled = [];

    inputs.forEach(function (input) {
        if (input.required) {
            if (input.value === '' || input.value === null || input.value === undefined) {
                if (input.type === 'email') {
                    input.parentElement.querySelector('p').classList.remove('peer-placeholder-shown:!hidden');
                    input.parentElement.querySelector('p').classList.remove('hidden');
                } else {
                    input.parentElement.querySelector('p').classList.remove('hidden');
                    input.parentElement.querySelector('p').classList.add('content');
                }

                inputsArrayOfNotFilled.push(input);
            } else {
                if (input.type === 'email') {
                    input.parentElement.querySelector('p').classList.add('peer-placeholder-shown:!hidden');
                    input.parentElement.querySelector('p').classList.add('hidden');
                } else {
                    input.parentElement.querySelector('p').classList.add('hidden');
                    input.parentElement.querySelector('p').classList.remove('content');
                }

                inputsArrayOfNotFilled = inputsArrayOfNotFilled.filter(function (item) {
                    return item !== input;
                });
            }
        }
    });

    if (inputsArrayOfNotFilled.length > 0) {
        return;
    }

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const promoCodeExist = localStorage.getItem('promoCode') || [];

    cartItems.splice(0, cartItems.length); // Clear the cart

    localStorage.setItem('cart', JSON.stringify(cartItems));

    if (promoCodeExist) {
        localStorage.removeItem('promoCode');
    }

    window.location.href = 'cart.html';
}

const goBackTocCart = () => {
    const buyNowProduct = JSON.parse(localStorage.getItem('buyNow')) || [];
    const buyNowAmount = buyNowProduct.length;

    if (buyNowAmount > 0) {
        localStorage.removeItem('buyNow');
    };

    window.location.href = 'cart.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartAmount = cartItems.length;

    const buyNowProduct = JSON.parse(localStorage.getItem('buyNow')) || [];
    const buyNowAmount = buyNowProduct.length;

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        window.location.href = '../pages/account.html';
        return;
    }

    if (user.loggedIn !== true) {
        window.location.href = '../pages/account.html';
        return;
    }

    if (cartAmount > 0) {
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

                if (buyNowProduct.find(product => product.id === productId)) {
                    checkoutProducts.push(value);
                } else if (cartItems.find(product => product.id === productId)) {
                    checkoutProducts.push(value);
                }
            });
        }).then(() => {
            if (buyNowAmount > 0) {
                checkoutProducts = checkoutProducts.filter(value => {
                    const productId = value.product_name.replace(/\s/g, '-').toLowerCase();
                    return buyNowProduct.find(product => product.id === productId);
                });

                createCheckoutItems(buyNowProduct);
                return;
            }

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

    const userEmailAddress = document.querySelector('[role="email"]');

    if (userEmailAddress) {
        userEmailAddress.value = user.email;
    }

    document.querySelector('[role="card-card-number"').addEventListener('input', function (e) {
        var target = e.target,
            value = target.value;
        start = target.selectionStart,
            end = target.selectionEnd;

        // Remove all whitespace characters from the input and remove all non-digit characters
        value = value.replace(/\s/g, '');
        value = value.replace(/\D/g, '');

        if (value.length >= 16) {
            value = value.substring(0, 16); // Truncate to 16 digits if more are entered

            document.querySelector('[role="card-card-number"').parentElement.querySelector('p').classList.add('hidden');
            document.querySelector('[role="card-card-number"').parentElement.querySelector('p').classList.remove('content');
        } else {
            document.querySelector('[role="card-card-number"').parentElement.querySelector('p').classList.add('content');
            document.querySelector('[role="card-card-number"').parentElement.querySelector('p').classList.remove('hidden');
        }

        // Add a space after every 4 digits
        target.value = value.replace(/(.{4})/g, '$1 ').trim();

        // Adjust the cursor position
        if (value.length % 4 === 0 && start === value.length) {
            start++;
        }
        target.setSelectionRange(start, end);
    });

    document.querySelector('[role="card-expiry-date"').addEventListener('input', function (e) {
        var target = e.target,
            value = target.value;
        start = target.selectionStart,
            end = target.selectionEnd;

        // Remove all non-digit characters
        var digits = value.replace(/\D/g, '');
        if (digits.length >= 4) {
            digits = digits.substring(0, 4); // Truncate to 4 digits if more are entered

            document.querySelector('[role="card-expiry-date"').parentElement.querySelector('p').classList.add('hidden');
            document.querySelector('[role="card-expiry-date"').parentElement.querySelector('p').classList.remove('content');
        } else {
            document.querySelector('[role="card-expiry-date"').parentElement.querySelector('p').classList.add('content');
            document.querySelector('[role="card-expiry-date"').parentElement.querySelector('p').classList.remove('hidden');
        }

        if (digits.length > 2) {
            // If there are more than 2 digits, add a slash between the second and third digits
            target.value = digits.substring(0, 2) + '/' + digits.substring(2);
        } else {
            target.value = digits;
        }

        // Adjust the cursor position
        if (digits.length === 2 && start === digits.length) {
            start++;
        }
        target.setSelectionRange(start, end);
    });

    document.querySelector('[role="card-cvv"').addEventListener('input', function (e) {
        var target = e.target,
            value = target.value;

        // Remove all non-digit characters  
        target.value = value.replace(/\D/g, '');

        if (value.length >= 3) {
            target.value = value.substring(0, 3); // Truncate to 3 digits if more are entered

            document.querySelector('[role="card-cvv"').parentElement.querySelector('p').classList.add('hidden');
            document.querySelector('[role="card-cvv"').parentElement.querySelector('p').classList.remove('content');
        } else {
            document.querySelector('[role="card-cvv"').parentElement.querySelector('p').classList.add('content');
            document.querySelector('[role="card-cvv"').parentElement.querySelector('p').classList.remove('hidden');
        }
    });

    document.querySelector('[role="address_search"]').addEventListener('input', function (e) {
        if (e.target.value === '' || e.target.value === null || e.target.value === undefined) {
            document.querySelector('[role="address_information"]').classList.add('hidden');
            document.querySelector('[role="address_information"]').classList.remove('flex');
        }
    });

    document.querySelector('[role="address_search_billing"]').addEventListener('input', function (e) {
        if (e.target.value === '' || e.target.value === null || e.target.value === undefined) {
            document.querySelector('[role="address_information_billing"]').classList.add('hidden');
            document.querySelector('[role="address_information_billing"]').classList.remove('flex');
        }
    });

    const addressSearch = document.querySelector('[role="address_information"]');
    const addressSearchBilling = document.querySelector('[role="address_information_billing"]');
    inputAddressFields.forEach((field) => {
        const div = `
            <label class="w-full h-fit flex flex-col">
                <input type="${field.type}" placeholder="${field.placeholder}" id="${field.id}" required="${field.required}"
                    class="w-full flex h-9 rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">

                <p class="mt-2 hidden text-red-600">
                    ${field.requiredText}
                </p>
            </label>
        `

        const div2 = `
            <label class="w-full h-fit flex flex-col">
                <input type="${field.type}" placeholder="${field.placeholder}" id="${field.id + '-billing'}" required="${field.required}"
                    class="w-full flex h-9 rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">

                <p class="mt-2 hidden text-red-600">
                    ${field.requiredText}
                </p>
            </label>
        `

        addressSearch.insertAdjacentHTML('beforeend', div);
        addressSearchBilling.insertAdjacentHTML('beforeend', div2);
    });

});