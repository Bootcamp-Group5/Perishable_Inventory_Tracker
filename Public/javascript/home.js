function insertDate() {
    let today = new Date();
    today = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    const expDate = document.getElementById("date");
    expDate.value = today;
    expDate.setAttribute('min', today);
};

async function addProductHandler(e) {
    e.preventDefault();

    const name = getProductName();
    const category = getCategory();
    const expiration_date = getDate();
    const quantity = +getQuantity();

    if (!category) {
        return alert('You need to select a category');
    };

    const product = {
        name,
        category,
        expiration_date,
        quantity
    };

    await saveProduct(product);
    resetForm();
    alert('Added!');
};

function saveProduct(product) {
    fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify( product ),
        headers: { 'Content-Type': 'application/json' }
    })
    .catch(err => {
        console.log(err);
    })
};

function resetForm() {
    document.querySelector('#p-name').value = '';
    document.querySelector('select').selectedIndex = 0;
    insertDate();
    document.querySelector('#quantity').value = 1;
}

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

function chooseProductHandler(e) {
    const pName = e.target.innerText;
    const card = e.target.closest('.card');
    const category = card.querySelector('button').innerText;

    document.querySelector('select').value = category; 
    document.querySelector('#p-name').value = pName; 
}

insertDate();
document.querySelector('#add-product').addEventListener('click', addProductHandler);
document.querySelector('#dairy-list').addEventListener('click', chooseProductHandler);