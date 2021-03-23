let photo = document.getElementById("image-file").files[0];
// let formData = new FormData();
     
// formData.append("photo", photo);
// fetch('/upload/image', {method: "POST", body: formData});


async function SavePhoto(inp) 
{
    let user = { name:'john', age:34 };
    let formData = new FormData();
    let photo = inp.files[0];      
         
    formData.append("photo", photo);
    formData.append("user", JSON.stringify(user)); 
    
    const ctrl = new AbortController()    // timeout
    setTimeout(() => ctrl.abort(), 5000);
    
    try {
       let r = await fetch('/upload/image', 
         {method: "POST", body: formData, signal: ctrl.signal}); 
       console.log('HTTP response code:',r.status); 
    } catch(e) {
       console.log('Huston we have problem...:', e);
    }
    
}



const historyList = document.querySelector('.list');
let searchHistory = [];

async function getAllProducts() {
    const products = await fetch('/api/products').then(res => res.json());

    saveProducts(products);
};

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

function addToList(item) {
    const liEl = document.createElement('li');
    liEl.textContent = item;

    historyList.prepend(liEl);
};

function getProductName() {
    const productNameEl = document.querySelector("#p-name"); 
    const productName = productNameEl.value.toLowerCase();

    productNameEl.value = '';
    return productName
};

async function searchProduct(pName) {
    // the apiRoute is not correct!!!
    const res = await fetch(`/api/products/${pName}`).then(res => res.json());
    
    if (res.ok) {
        saveProducts(res);
    }
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
//             const amountA = a.amount;
//             const amountB = b.amount;

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


getAllProducts();
loadHistory();
document.querySelector("#search-product").addEventListener('submit', searchProductHandler);
document.querySelector("#clear").addEventListener('click', clearHistory);
historyList.addEventListener('click', historySearchHandler);
document.querySelector("#sort-by-exp").addEventListener('click', sortByExp);
document.querySelector("#sort-by-name").addEventListener('click', sortByName);
// document.querySelector("#sort-by-category").addEventListener('click', sortByCategory);
// document.querySelector("#sort-by-quantity").addEventListener('click', sortByQuantity);