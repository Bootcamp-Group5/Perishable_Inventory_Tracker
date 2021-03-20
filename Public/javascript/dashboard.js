const historyList = document.querySelector('.list');
let searchHistory = [];

// async function getAllProducts() {
//     const products = await fetch('/api/products').then(res => res.json());

//     saveProducts(products);
// };

function searchProductHandler(e) {
    e.preventDefault();
    const productName = getProductName();

    if(!productName) {
        return alert('You need to enter an item!');
    };

    searchProduct(productName);
    addToSearchHistory(productName);
};

function addToSearchHistory(pName) {
    let isIncluded = false;
    for (let i = 0; i < searchHistory.length; i++) {
        if (searchHistory[i] === pName) {
            isIncluded = true;
            break;
        }
    }
    
    if (!isIncluded) {
        addToList(pName);

        searchHistory.push(pName);
        localStorage.setItem('history', JSON.stringify(searchHistory));
    }
};

function getProductName() {
    const productNameEl = document.querySelector("#p-name"); 
    let productName = productNameEl.value.trim();
    productName = productName[0].toUpperCase() + productName.substring(1).toLowerCase();

    productNameEl.value = '';
    console.log(productName);
    return productName
};

function searchProduct(pName) {
    // should have a apiRoute to fetch
};

function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
};

function loadHistory() {
    searchHistory = JSON.parse(localStorage.getItem('history')) || [];
    
    searchHistory.forEach(item => addToList(item));
};

function clearHistory() {
    searchHistory = [];
    localStorage.removeItem('history');

    while (historyList.hasChildNodes()) {
        historyList.removeChild(historyList.firstChild);
    };
};

function historySearchHandler(e) {
    if (e.target.closest('li')) {
        const product = e.target.textContent;
        searchProduct(product);
    };
};

function sortByExp() {
    const products = JSON.parse(localStorage.getItem('products'));
    if (products) {
        products.sort((a,b) => {
            const expA = a.expiration_date;
            const expB = b.expiration_date;

            if (expA > expB) {
                return 1;
            };

            if (expA < expB) {
                return -1;
            };

            return 0;
        });
    };

    console.log(products)
};

function sortByName() {
    const products = JSON.parse(localStorage.getItem('products'));

    if (products) {
        products.sort((a,b) => {
            const nameA = a.name;
            const nameB = b.name;

            if (nameA > nameB) {
                return 1;
            };

            if (nameA < nameB) {
                return -1;
            };

            return 0;
        });
    }

    console.log(products);
};

// *************************************************************************** //
// ** These two functions work fine, if products have quantity or category ** //
// *************************************************************************** //
// function sortByQuantity() {
//     const products = JSON.parse(localStorage.getItem('products'));

//     if (products) {
//         products.sort((a,b) => {
//             const amountA = a.quantity;
//             const amountB = b.quantity;

//             if (amountA < amountB) {
//                 return 1;
//             };

//             if (amountA > amountB) {
//                 return -1;
//             };

//             return 0;
//         });
//     };

//     console.log(products);
// };

// function sortByCategory() {
//     const products = JSON.parse(localStorage.getItem('products'));

//     if (products) {
//         products.sort((a,b) => {
//             const catA = a.category;
//             const catB = b.categoy;

//             if (catA > catB) {
//                 return 1;
//             };

//             if (catA < nameB) {
//                 return -1;
//             };

//             return 0;
//         });
//     };

//     console.log(products);
// };

async function updateProductHandler(e) {
    e.preventDefault();
    const card = e.target.closest('.p-card');
    const id = card.getAttribute('data-id');

    const quantity = card.querySelector('.quantity-nu').value;
    await fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            quantity,
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    alert('successfully updated!!')
};


document.querySelector("#search-product").addEventListener('submit', searchProductHandler);
document.querySelector("#clear").addEventListener('click', clearHistory);
historyList.addEventListener('click', historySearchHandler);
document.querySelector("#sort-by-exp").addEventListener('click', sortByExp);
document.querySelector("#sort-by-name").addEventListener('click', sortByName);
// document.querySelector("#sort-by-category").addEventListener('click', sortByCategory);
// document.querySelector("#sort-by-quantity").addEventListener('click', sortByQuantity);
document.querySelectorAll(".update").forEach(item => {
    item.addEventListener('click', updateProductHandler);
})