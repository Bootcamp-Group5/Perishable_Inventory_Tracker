async function getAllProducts() {
    products = await fetch('/api/products').then(res => res.json());

    saveProducts(products);
};

function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
};

getAllProducts();