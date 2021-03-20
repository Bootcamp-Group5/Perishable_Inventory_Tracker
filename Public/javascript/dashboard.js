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

        searchHistory.unshift(pName);
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
    const searchHistory = JSON.parse(localStorage.getItem('history')) || [];
    
    searchHistory.forEach(item => addToList(item));
};

function clearHistory() {
    searchHistory = [];
    localStorage.removeItem('history');

    while (historyList.hasChildNodes()) {
        historyList.removeChild(historyList.firstChild);
    };
}


getAllProducts();
loadHistory();
document.querySelector("#search-product").addEventListener('submit', searchProductHandler);
document.querySelector("#clear").addEventListener('click', clearHistory);
