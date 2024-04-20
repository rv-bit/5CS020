const products_top = [];
const products_featured = [];

let currentProductIndex = 0;
const updateProduct = () => {
    console.log('Updating product...', currentProductIndex);
    const product = products_top[currentProductIndex];

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

        const productID = product.product_name.replace(/\s/g, '-').toLowerCase();

        const briefDescription = product.product_description.length > 100 ? // if the description is more than 100 characters long than only show the characters before the first period
            product.product_description.substring(0, product.product_description.indexOf('.')).concat('.') :
            product.product_description;

        titleElement.setAttribute('data-top-product-title', product.product_name);
        descriptionElement.setAttribute('data-top-product-description', briefDescription);
        productIdElement.setAttribute('data-top-product-product_id', productID);

        titleElement.innerHTML = product.product_name
        descriptionElement.innerHTML = briefDescription
        productIdElement.href = `../pages/product.html?product_id=${productID}`;

        var product_image = product.product_image;
        const productCategory = product.product_category.toLowerCase();

        let productImage = `assets/images/products/${productCategory}/${product_image}`;

        if (typeof product_image === undefined || product_image === '' || product_image === null) {
            productImage = 'assets/images/utils/error.webp';
        } else if (typeof product_image === 'object') {
            productImage = `assets/images/products/${productCategory}/${product_image[0]}`;
        } else {
            productImage = `assets/images/products/${productCategory}/${product.product_image}`;
        }

        imageElement.setAttribute('src', productImage);

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

const createFeaturedProducts = () => {
    console.log('Creating featured products...');
    const parentDiv = document.getElementById('data_home_featured_products');

    const maxProducts = 8;
    let productGoneThrough = 0;

    products_featured.forEach((product, index) => {
        productGoneThrough += 1;

        if (productGoneThrough > maxProducts) {
            return;
        }

        var product_image = product.product_image;
        const productId = product.product_name.replace(/\s/g, '-').toLowerCase();
        const productCategory = product.product_category.toLowerCase();

        let productImage = `assets/images/products/${productCategory}/${product_image}`;

        if (typeof product_image === undefined || product_image === '' || product_image === null) {
            productImage = 'assets/images/utils/error.webp';
        } else if (typeof product_image === 'object') {
            productImage = `assets/images/products/${productCategory}/${product_image[0]}`;
        } else {
            productImage = `assets/images/products/${productCategory}/${product.product_image}`;
        }

        const div = `
            <div
                class="flex flex-col bg-[#f6f6f6] rounded-xl border-2 w-[350px] md:w-[320px] max-md:w-full h-full overflow-hidden">
                <div class="flex justify-end items-end my-3 mx-3 text-slate-500">

                    <button
                        onclick="addToWishlist('${productId}'); removeFromCart('${productId}')" // Remove from cart if it is in the cart
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

                <section role="product-image"
                    class="w-full h-full flex justify-center items-center relative my-10">
                    <img src="${productImage}"
                        alt="product-image" onerror="this.src='assets/images/utils/error.webp'; this.alt='error-image'" class="w-[260px] h-[300px] max-sm:size-[70%] object-cover bg-no-white">
                </section>

                <section role="product-info" class="border-t-2 w-full h-full">
                    <div class="grid grid-cols-2 justify-center items-center mx-3 my-3 gap-3">
                        <h1 data-title-product=${product.product_name} class="col-span-2 text-xl font-bold truncate">${product.product_name}</h1>

                        <section role="information"
                            class="flex justify-between max-sm:flex-col w-full h-full col-span-2 max-sm:gap-3">
                            <div role="pricing-products" class="flex flex-col gap-[0.05rem]">
                                <p class="text-sm text-slate-400 font-medium">Price:</p>
                                <h1 data-price-product=${product.product_price} class="text-2xl font-semibold">£${product.product_price}</s>
                            </div>

                            <div role="product-actions" class="flex justify-end max-sm:justify-start items-center gap-2">
                                <button
                                    onclick="window.location.href='../pages/product.html?product_id=${productId}'"

                                    class="bg-gray-200 text-black font-medium rounded-lg py-3 px-4 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 w-max flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-eye">
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </button>

                                <button onclick="addToCart('${productId}')"
                                    class="bg-[#3f7ef0] text-white rounded-lg p-2 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 w-max flex justify-center items-center">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-shopping-basket">
                                        <path d="m15 11-1 9" />
                                        <path d="m19 11-4-7" />
                                        <path d="M2 11h20" />
                                        <path
                                            d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
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

        parentDiv.insertAdjacentHTML('afterbegin', div);
    });
}

const goToProductsWithCategory = (category) => {
    localStorage.setItem('category', category);

    window.location.href = `../pages/products.html`;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchItems().then((data) => {
        if (!data) return;

        if (data.length === 0) {
            return;
        }

        Object.entries(data).forEach(([key, value]) => {
            if (value['top_seller']) {
                products_top.push(value);
            }

            products_featured.push(value);
        });
    }).then(() => {
        createFeaturedProducts();

        updateProduct();
        setInterval(updateProduct, 5000); // Change product every 5 seconds
    });
});