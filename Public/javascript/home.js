function insertDate() {
    const today = new Date();

    document.getElementById("date").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
};

function addProductHandler(e) {
    e.preventDefault();
    console.log('clicked');

    const name = getProductName();
    const category = getCategory();
    const expiration_date = getDate();
    const quantity = +getQuantity();

    if (!category) {
        return alert('You need to select a category');
    };

    fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({
            name,
            category,
            expiration_date,
            quantity
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => console.log(res));
};

function getProductName() {
    const pName = document.querySelector('#p-name').value.trim();

    if (!pName) {
        return alert('You need to enter the product name!');
    }
    
    return pName[0].toUpperCase() + pName.substring(1).toLowerCase();  
};

function getCategory() {
    return document.querySelector('select').value;
};

function getDate() {
    return document.querySelector('#date').value;
};

function getQuantity() {
    return document.querySelector('#quantity').value;
}

insertDate();
document.querySelector('#add-product').addEventListener('click', addProductHandler);