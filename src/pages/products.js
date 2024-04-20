const products = [];

const sortOptions = [
    { name: 'Price: Low to High', value: 'price-low-to-high', sortFunc: (a, b) => a.product_price - b.product_price },
    { name: 'Price: High to Low', value: 'price-high-to-low', sortFunc: (a, b) => b.product_price - a.product_price },
    { name: 'Best Sellers', value: 'best-sellers', sortFunc: (a, b) => b.product_sales - a.product_sales },
    { name: 'Top Rated', value: 'top-rated', sortFunc: (a, b) => b.product_rating - a.product_rating }
];

const filters = {};
const categoryActive = []

const adjustWidthSelectors = (selectedElement) => {
    var tempElement = document.createElement('span');

    tempElement.innerHTML = selectedElement.options[selectedElement.selectedIndex].text;
    tempElement.style.visibility = 'hidden'; // make it invisible but still rendered
    tempElement.style.position = 'absolute'; // prevent it from affecting other elements

    document.body.appendChild(tempElement);
    selectedElement.style.width = tempElement.offsetWidth + 30 + 'px';
    document.body.removeChild(tempElement);

    let value = selectedElement.value;
    document.querySelectorAll('.sort-selector').forEach(element => {
        element.addEventListener('change', (event) => {
            value = event.target.value;

            sortOptions.forEach(option => {
                if (option.value === value) {
                    const filteredProducts = filterProducts(filters);
                    createProductElements(filteredProducts, option.sortFunc);
                    return;
                }
            });
        });

        element.value = value;
    });
}

const openFilterMenu = () => {
    const element = document.getElementById('menu_dropdown_filters');

    const filtersOnPhone = document.querySelector('[role="filters-opened-phone"]');
    const style = window.getComputedStyle(filtersOnPhone);
    const display = style.getPropertyValue('display');

    if (display === 'none') {
        return;
    }

    const body = document.querySelector('body');
    const header = document.querySelector('header');

    if (element.classList.contains('flex')) {
        element.classList.add('slide-top');

        setTimeout(() => {
            element.classList.remove('slide-top');

            element.classList.add('hidden');
            element.classList.remove('flex');

            header.classList.remove('hidden');
        }, 500); // Remove the class after 0.5s, which is the duration of the animation

        // Enable scrolling
        body.style.overflow = '';
        return;
    }

    body.style.overflow = 'hidden';

    element.classList.add('flex');
    element.classList.remove('hidden');

    header.classList.add('hidden');

    element.classList.add('slide-bottom');
    setTimeout(() => {
        element.classList.remove('slide-bottom');
    }, 500); // Remove the class after 0.5s, which is the duration of the animation
}

function generateRanges(min, max, step) {
    const ranges = [];
    for (let i = min; i < max; i += step) {
        ranges.push({ min: i, max: i + step });
    }
    return ranges;
}

const filterProducts = (filters) => {
    const filtersCopy = { ...filters };

    const filteredProducts = products.filter(product => {
        const productPrice = product.product_price;
        const productBrand = product.product_brand;
        const productColor = product.product_color;
        const productSize = product.product_size;
        const productQuantity = product.product_quantity;

        const priceFilter = filtersCopy.price;
        const brandFilter = filtersCopy.brand;
        const colorFilter = filtersCopy.color;
        const sizeFilter = filtersCopy.size;
        const quantityFilter = filtersCopy.quantity;

        return (
            (!priceFilter || priceFilter.some(price => {
                const [min, max] = price.split('_');
                return (parseInt(productPrice) >= parseInt(min) && productPrice <= parseInt(max));
            })) &&
            (!brandFilter || brandFilter.some(brand => {
                return productBrand === brand;
            })) &&
            (!colorFilter || colorFilter.some(color => {
                return productColor === color;
            })) &&
            (!sizeFilter || sizeFilter.some(size => {
                return productSize === size;
            })) &&
            (!quantityFilter || quantityFilter.some(quantity => {
                const [min, max] = quantity.split('_');
                return (parseInt(productQuantity) >= parseInt(min) && productQuantity <= parseInt(max));
            })) &&
            (categoryActive.length === 0 || categoryActive.some(category => {
                return category === product.product_category;
            }))
        );
    });

    return filteredProducts;
}

const createFiltersBasedOnProducts = () => {
    const parentDiv = document.querySelectorAll('[role="filters"]');
    const categorySelector = document.querySelectorAll('[role="category-selector"]');

    const categories = [...new Set(products.map(product => product.product_category))];
    const prices = [...new Set(products.map(product => product.product_price))];
    const brands = [...new Set(products.map(product => product.product_brand))];
    const colors = [...new Set(products.map(product => product.product_color ? product.product_color : 'No color'))];
    const sizes = [...new Set(products.map(product => product.product_size ? product.product_size : 'No size'))];
    const quantities = [...new Set(products.map(product => product.product_quantity))];

    categorySelector.forEach(element => {
        const categoryData = element.children[0].children[1];

        categories.forEach(category => {
            const divCategory = `
                <button
                    onclick="categorySelector(this, '${category}')"
                    class="w-fit bg-inherit text-slate-400 font-medium transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:text-[#3f7ef0]">
                    ${category}
                </button>
            `;

            categoryData.insertAdjacentHTML('afterbegin', divCategory);
        });
    });

    const filtersToAdd = [
        { name: 'price', values: prices, ranges: 150 },
        { name: 'brand', values: brands.sort() },
        { name: 'color', values: colors.sort() },
        { name: 'size', values: sizes.sort() },
        { name: 'quantity', values: quantities, ranges: 50 }
    ];

    parentDiv.forEach((div, index) => {
        div.id = `filters_${index}`;

        filtersToAdd.forEach(filter => {
            const minPrice = filter.ranges ? 0 : null;
            const maxPrice = filter.ranges ? Math.max(...filter.values) : null;
            const ranges = filter.ranges ? generateRanges(minPrice, maxPrice, filter.ranges) : null;

            const filterName = filter.name.charAt(0).toUpperCase() + filter.name.slice(1);

            const divFilter = `
                <div class="flex flex-col gap-2">
                    <div class="flex justify-between items-center mr-2 hover:cursor-pointer" onclick="closeOptions(this)">
                        <h1 class="text-xl font-bold">${filterName}</h1>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="lucide lucide-chevron-down hidden">
                            <path d="m6 9 6 6 6-6" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="lucide lucide-chevron-up">
                            <path d="m18 15-6-6-6 6" />
                        </svg>
                    </div>

                    <div class="custom-options">
                    
                    ${ranges ? ranges.map(range => {
                const min = range.min.toFixed(0);
                const max = range.max.toFixed(0);

                return `
                    <div class="w-full flex items-center text-left gap-2">
                        <input type="checkbox" name="${filter.name}" value="${min}_${max}" id="${filter.name}_${min}_${max}_${div.id}">
                        ${filter.name === 'Price' ?
                        `<label for="${filter.name}_${min}_${max}_${div.id}" class="text-lg font-medium w-full before:content-['£'] hover:cursor-pointer" onclick="updateProductsAfterFilter(this)">${min} - ${max}</label>`
                        :
                        `<label for="${filter.name}_${min}_${max}_${div.id}" class="text-lg font-medium w-full hover:cursor-pointer" onclick="updateProductsAfterFilter(this)">${min} - ${max}</label>`
                    }
                    </div>
                `
            }).join('')
                    : filter.values.map(value => `
                        <div class="w-full flex items-center text-left gap-2">
                            <input type="checkbox" name="${filter.name}" value="${value}" id="${filter.name}_${value}_${div.id}">
                            <label for="${filter.name}_${value}_${div.id}" class="text-lg font-medium w-full hover:cursor-pointer" onclick="updateProductsAfterFilter(this)">${value}</label>
                        </div>
                    `).join('')}
                        
                        </div>
                    </div>
                `;

            div.insertAdjacentHTML('afterbegin', divFilter);
        });
    });
}

const categorySelector = (element, category) => {
    const allProducts = [...products];
    const categoryNameElement = document.getElementById('category-name');

    if (category === categoryActive[0]) {
        categoryActive.splice(categoryActive.indexOf(category), 1);
        element.classList.remove('text-blue-600');

        const filteredProducts = filterProducts(filters);
        createProductElements(filteredProducts);

        categoryNameElement.textContent = 'All Products';

        openFilterMenu();
        return;
    }

    if (categoryActive.length === 0) {
        categoryActive.push(category);
        element.classList.add('text-blue-600');

        const filteredProducts = filterProducts(filters);
        createProductElements(filteredProducts);

        categoryNameElement.textContent = category;

        openFilterMenu();
        return;
    }

    if (!categoryActive.includes(category)) {
        categoryActive.forEach(category => {
            const elements = document.querySelectorAll('[role="category-selector"] button');

            elements.forEach(element => {
                element.classList.remove('text-blue-600');
                categoryActive.splice(categoryActive.indexOf(category), 1);
            });
        });

        element.classList.add('text-blue-600');
        categoryActive.push(category);

        categoryNameElement.textContent = category;

        const filteredProducts = filterProducts(filters);
        createProductElements(filteredProducts);

        openFilterMenu();
    }
}

const deleteFilter = (filterName, filterValue, element) => {
    const parentDiv = document.querySelectorAll('[role="filters"]');
    const elementParent = element.parentElement;

    elementParent.remove();

    if (!filters[filterName]) {
        filters[filterName] = [];
    }

    const index = filters[filterName].indexOf(filterValue);
    if (index !== -1) {
        parentDiv.forEach(div => {
            const checkBox = div.querySelector(`input[name="${filterName}"][value="${filterValue}"]`);
            checkBox.checked = false;
        });

        filters[filterName].splice(index, 1);
        filters[filterName].length === 0 && delete filters[filterName];
    }

    updateProductsAfterFilter();
}

const updateProductsAfterFilter = (checkBox) => {
    const addedFilters = document.querySelector('[role="filters-added"]');

    if (checkBox) {
        const filterName = checkBox.parentElement.children[0].name;
        const filterValue = checkBox.parentElement.children[0].value;

        if (!filters[filterName]) {
            filters[filterName] = [];
        }

        if (!checkBox.parentElement.children[0].checked) {
            filters[filterName].push(filterValue);

            let valueFilter = null;
            if (filterValue.includes('_')) {
                valueFilter = filterValue.split('_').join(' - ');
            } else {
                valueFilter = filterValue;
            }

            const divFilter = `
                <div class="flex flex-row gap-2 bg-[#f5f5f5] px-5 py-3 rounded-lg opacity-60 shrink-0">
                    <p class="text-base font-medium">${valueFilter}</p>

                    <div
                        class="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:cursor-pointer" onclick="deleteFilter('${filterName}', '${filterValue}', this)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="lucide lucide-x">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </div>
                </div>
            `;

            addedFilters.insertAdjacentHTML('beforeend', divFilter);
        } else {
            const index = filters[filterName].indexOf(filterValue);
            if (index !== -1) {
                filters[filterName].splice(index, 1);

                filters[filterName].length === 0 && delete filters[filterName];
            }

            const divFilter = addedFilters.querySelectorAll('div');

            let valueFilter = null;
            if (filterValue.includes('_')) {
                valueFilter = filterValue.split('_').join(' - ');
            } else {
                valueFilter = filterValue;
            }

            divFilter.forEach(div => {
                if (div.children[0].textContent === valueFilter) {
                    div.remove();
                }
            });
        }
    }

    if (addedFilters.children.length === 0) {
        addedFilters.classList.add('mb-2', 'py-2');
        addedFilters.classList.remove('mb-5', 'py-5');
    } else {
        addedFilters.classList.remove('mb-2', 'py-2');
        addedFilters.classList.add('mb-5', 'py-5');
    }

    const filteredProducts = filterProducts(filters);
    createProductElements(filteredProducts);
}

const createSort = () => {
    const parentDiv = document.querySelectorAll('.sort-selector');
    const divSort = sortOptions.map(option => `
        <option value="${option.value}">${option.name}</option>
    `);

    parentDiv.forEach(element => {
        element.insertAdjacentHTML('afterbegin', divSort.join(''));
    });
}

const createProductElements = (filteredProducts, sorting) => {
    const parentDiv = document.getElementById('data_products');

    if (filteredProducts) {
        parentDiv.innerHTML = '';
    }

    if (filteredProducts && filteredProducts.length === 0) {
        const div = `
            <div class="flex justify-center items-center w-full h-full">
                <h1 class="text-2xl font-bold text-slate-400">No products found withing filters</h1>
            </div>
        `;

        parentDiv.insertAdjacentHTML('beforeend', div)
        return;
    }

    const allProducts = (filteredProducts && filteredProducts.length > 0) ? filteredProducts : products;

    if (sorting) {
        allProducts.sort(sorting);
    }

    allProducts.forEach((product, index) => {
        var product_image = product.product_image;
        const productId = product.product_name.replace(/\s/g, '-').toLowerCase();
        const productCategory = product.product_category.toLowerCase();

        let productImage = `../ assets / images / products / ${productCategory} /${product_image}`;

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

        parentDiv.insertAdjacentHTML('beforeend', div);
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
        createFiltersBasedOnProducts();
        createSort();

        var selectElement = document.querySelectorAll('.sort-selector');
        selectElement.forEach(element => {
            adjustWidthSelectors(element);

            selectElement.value = sortOptions[0].value;
        });

        const categoryFromLocalStorage = localStorage.getItem('category');

        if (categoryFromLocalStorage) {
            const categoryNameElement = document.getElementById('category-name');
            categoryActive.push(categoryFromLocalStorage);
            categoryNameElement.textContent = categoryFromLocalStorage;

            const elements = document.querySelectorAll('[role="category-selector"] button');

            elements.forEach(element => {
                if (element.textContent === categoryFromLocalStorage) {
                    element.classList.add('text-blue-600');
                }
            });

            localStorage.removeItem('category');
        }

        const filteredProducts = filterProducts(filters);
        createProductElements(filteredProducts, sortOptions[0].sortFunc);
    });
});