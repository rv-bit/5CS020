const selectImage = (element) => {
    const elementChildren = element.children;

    const elementParent = element.parentElement;
    const elementGrandParent = elementParent.parentElement;
    const elementParentChildren = elementGrandParent.children;

    const imageOfElement = element.children[0].src;

    elementParentChildren[0].children[1].children[0].src = imageOfElement;

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

let product = [];
const createProductElement = () => {
    const parentDiv = document.getElementById('data_product_information');

    const parentChildren = parentDiv.children;

    let productMainImageSection = parentChildren[0].children[0].children[1].children[0];
    let productImagesSection = parentChildren[0].children[1];
    let productImageControls = parentChildren[0].children[2];

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

    productMainImageSection.src = productImage;

    if (typeof product_image === 'object') {
        productImagesSection.innerHTML = '';
        productImageControls.classList.remove('hidden');

        product_image.forEach(image => {
            const divImages = `
                <button onclick="selectImage(this)"
                    class="product-thumbnail w-auto h-auto flex justify-center items-center p-2 bg-inherit border border-black border-opacity-30 rounded-[25px] max-sm:rounded-full shrink-0 disable-dbl-tap-zoom">
                    <img src="../assets/images/products/${productCategory}/${image}" alt="product"
                        class="w-full h-[100px] max-sm:h-[90px]" />
                </button>
            `

            productImagesSection.innerHTML += divImages;
        });
    } else {
        productImageControls.classList.add('hidden');
    }

    const productInfoSection = parentChildren[1].children[0];

    let productTitleSection = parentChildren[1].children[0].children[0];
    let productPriceSection = parentChildren[1].children[0].children[1];
    let productDescriptionSection = parentChildren[1].children[0].children[2];

    productTitleSection.innerText = product.product_name;
    productPriceSection.innerText = `£${product.product_price}`;
    productDescriptionSection.innerText = product.product_description;

    // const productSizesSection = parentChildren[1].children[1].children[0];
    // const productColorsSection = parentChildren[1].children[1].children[1];

    // if (product.product_sizes) {
    //     productSizesSection.innerHTML = '';
    //     product.product_sizes.forEach(size => {
    //         const divSizes = `
    //             <button onclick="selectFilters(this, 'size-filter')"
    //                 class="size-filter w-auto h-auto flex justify-center items-center p-2 bg-inherit border border-black border-opacity-30 rounded-[25px] shrink-0 disable-dbl-tap-zoom">
    //                 ${size}
    //             </button>
    //         `

    //         productSizesSection.innerHTML += divSizes;
    //     });
    // }

    // if (product.product_colors) {
    //     productColorsSection.innerHTML = '';
    //     product.product_colors.forEach(color => {
    //         const divColors = `
    //             <button onclick="selectFilters(this, 'color-filter')"
    //                 class="color-filter w-auto h-auto flex justify-center items-center p-2 bg-inherit border border-black border-opacity-30 rounded-[25px] shrink-0 disable-dbl-tap-zoom">
    //                 ${color}
    //             </button>
    //         `

    //         productColorsSection.innerHTML += divColors;
    //     });
    // }

    const productAddToCartParentElement = parentDiv.querySelector('[role="add-to-cart-buy-now"]');

    const divAddToCart = `
        <div class="col-span-2 flex flex-row max-sm:flex-col justify-center items-center gap-2">
            <div
                class="flex justify-between flex-row border border-black rounded-[5px] w-2/5 max-sm:w-full h-[50px] overflow-hidden">
                <button onclick="quantityChange(this, '${productId}')"
                    class="size-auto hover:bg-[#8c8c86] opactity-40 max-md:mr-2 px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus">
                        <path d="M5 12h14" />
                    </svg>
                </button>
                <input onchange="quantityChange(this, '${productId}', 'input')" type="number" inputmode="numeric"
                    class="h-full max-w-[60px] max-xl:max-w-[45px] text-center focus:outline-none border-0 focus:ring-transparent no-input-spin"
                    value="1" />
                <button onclick="quantityChange(this, '${productId}', 'increase')"
                    class="size-auto hover:bg-[#8c8c86] opactity-40 max-md:ml-2 px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                    </svg>
                </button>
            </div>

            <button onclick="addToCart('${productId}')"
                class="w-3/5 max-sm:w-full h-[50px] bg-black text-white text-base text-center font-medium rounded-[5px] flex justify-center items-center">
                Add To Cart
            </button>
        </div>

        <button
            class="col-span-2 w-full h-[50px] bg-[#3f7ef0] text-white text-base text-center font-medium rounded-[5px] flex justify-center items-center">
            Buy Now
        </button>
    `

    productAddToCartParentElement.insertAdjacentHTML('afterbegin', divAddToCart);

    const productExtraDetailsSection = parentDiv.querySelector('[role="extra-details"]');
    const productExtraDetails = productExtraDetailsSection.children[0].children[1];
    const dataTags = generateTags(product);

    const div = `
        <div class="flex flex-row justify-between items-center">
            <h1 class="text-base font-medium text-[#4c4c44]">SKU</h1>
            <p class="text-base font-medium text-[#8c8c86]">${productId}</p>
        </div>

        <div class="flex flex-row justify-between items-center">
            <h1 class="text-base font-medium text-[#4c4c44]">Category</h1>
            <p class="text-base font-medium text-[#8c8c86]">${productCategory.toUpperCase()}</p>
        </div>

        <div class="flex flex-row justify-between items-center">
            <h1 class="text-base font-medium text-[#4c4c44]">Tags</h1>
            <p class="text-base font-medium text-[#8c8c86]">${dataTags.join(', ')}</p>
        </div>
    `
    productExtraDetails.insertAdjacentHTML('afterbegin', div);
}

const generateTags = (data) => {
    const tags = [];

    tags.push(data.product_category);
    tags.push(data.product_name);
    tags.push(data.product_brand);

    if (data.product_colors) {
        data.product_colors.forEach(color => {
            tags.push(color);
        });
    }

    if (data.product_sizes) {
        data.product_sizes.forEach(size => {
            tags.push(size);
        });
    }

    return tags;
}

document.addEventListener('DOMContentLoaded', () => {
    const searchParams = new URLSearchParams(window.location.search);
    const product_id = searchParams.get('product_id');

    if (product_id) {
        fetchItems().then((data) => {
            if (!data) return;

            if (data.length === 0) {
                return;
            }

            const productExists = Object.entries(data).some(([key, value]) => {
                const productId = value.product_name.replace(/\s/g, '-').toLowerCase();
                return productId === product_id;
            })

            if (!productExists) {
                window.location.href = 'products.html';
            }

            Object.entries(data).forEach(([key, value]) => {
                const productId = value.product_name.replace(/\s/g, '-').toLowerCase();
                if (productId !== product_id) return;

                product = value;
            });
        }).then(() => {
            createProductElement();
        });
    } else {
        window.location.href = 'products.html';
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