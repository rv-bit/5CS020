const products = [];

const adjustWidthSelectors = (selectedElement) => {
    var tempElement = document.createElement('span');

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

const createProductElements = () => {
    const parentDiv = document.getElementById('data_products');

    products.forEach((product, index) => {
        var product_image = product.product_image;
        const productId = product.product_name.replace(/\s/g, '-').toLowerCase();
        const productCategory = product.product_category.toLowerCase();

        let productImage = `../assets/images/products/${productCategory}/${product_image}`;

        if (typeof product_image === undefined || product_image === '' || product_image === null) {
            productImage = '../assets/images/utils/error.webp';
        } else if (typeof product_image === 'object') {
            productImage = `../assets/images/products/${productCategory}/${product_image[0]}`;
        } else {
            productImage = `../assets/images/products/${productCategory}/${product.product_image}`;
        }

        const div = `
            <div
                class="flex flex-col bg-[#f6f6f6] rounded-xl border-2 lg:w-[350px] md:w-full max-md:w-full h-full overflow-hidden">
                <div class="flex justify-end items-end my-3 mx-3 text-slate-500">

                    <button
                        onclick="addToWishlist('${productId}')"
                        class="w-fit h-full flex justify-end items-end">

                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-heart transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:text-red-400 hover:cursor-pointer">
                            <path
                                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                    </button>
                </div>

                <section role="product-image" class="w-full h-full flex justify-center items-center relative">
                    <img src="${productImage}"
                        alt="product-image" onerror="this.src='../assets/images/utils/error.webp'; this.alt='error-image'" class="w-[260px] h-[300px] max-sm:size-[70%] object-cover bg-no-white">
                </section>

                <section role="product-info" class="border-t-2 w-full h-full" data-product-id="${productId}">
                    <div class="grid grid-cols-2 justify-center items-center mx-3 my-3 gap-3">
                        <h1 data-title-product=${product.product_name} class="col-span-2 text-xl font-bold truncate">${product.product_name}</h1>

                        <section role="information" class="flex justify-between max-sm:flex-col max-sm:gap-3 w-full h-full col-span-2">
                            <div role="pricing-products" class="flex flex-col gap-[0.05rem]">
                                <p class="text-sm text-slate-400 font-medium">Price:</p>
                                <h1 data-price-product=${product.product_price} class="text-2xl font-semibold">£${product.product_price}</s>
                            </div>

                            <div class="flex justify-end max-sm:justify-start items-center gap-2">
                                <button onclick="openProductPage(this)"
                                    class="bg-gray-200 text-black font-medium rounded-lg py-3 px-4 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 w-max flex justify-center items-center gap-2">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-eye">
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </button>

                                <button onclick="addToCart('${productId}')"
                                    class="bg-[#3f7ef0] text-white rounded-lg p-2 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 w-max flex justify-center items-center">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-shopping-basket">
                                        <path d="m15 11-1 9" />
                                        <path d="m19 11-4-7" />
                                        <path d="M2 11h20" />
                                        <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
                                        <path d="M4.5 15.5h15" />
                                        <path d="m5 11 4-7" />
                                        <path d="m9 11 1 9" />
                                    </svg>
                                </button>
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        `;

        parentDiv.innerHTML += div;
    });
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

    fetchItems().then((data) => {
        if (!data) return;

        if (data.length === 0) {
            return;
        }

        Object.entries(data).forEach(([key, value]) => {
            products.push(value);
        });
    }).then(() => {
        createProductElements();
    });
});