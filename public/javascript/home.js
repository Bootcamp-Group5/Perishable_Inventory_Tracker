document.querySelector('#add-product').addEventListener('click', addProductHandler);
document.querySelectorAll('.accordion-list').forEach(elm => {
    elm.addEventListener('click', chooseProductHandler);
});
document.querySelectorAll(".list-button").forEach(item => {
    item.addEventListener('click', runAnimate);
});

function insertDate() {
    let today = new Date();
    today = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    const expDate = document.getElementById("date");
    expDate.value = today;
    expDate.setAttribute('min', today);
};

async function addProductHandler(e) {
    e.preventDefault();
    let isOk = true;

    const name = getProductName();
    const category = getCategory();
    const expiration_date = getDate();
    const quantity = +getQuantity();

    const pNameEl = document.querySelector('#p-name');
    const expDateEl = document.querySelector('#date');
    const quantityEl = document.querySelector('#quantity');
    if (!name) {
        pNameEl.classList.add('input-err');
        pNameEl.nextElementSibling.classList.remove('hdn');
        isOk = false;
    } else {
        pNameEl.classList.remove('input-err');
        pNameEl.nextElementSibling.classList.add('hdn');
    };
 
    if (!expiration_date) {
        expDateEl.classList.add('input-err');
        expDateEl.nextElementSibling.classList.remove('hdn');
        isOk = false;
    } else {
        expDateEl.classList.remove('input-err');
        expDateEl.nextElementSibling.classList.add('hdn');
    };

    if (!quantity) {
        quantityEl.classList.add('input-err');
        quantityEl.nextElementSibling.classList.remove('hdn');
        isOk = false;
    } else {
        quantityEl.classList.remove('input-err');
        quantityEl.nextElementSibling.classList.add('hdn');
    };

    if (!category) {
        document.querySelector('select').classList.add('input-err');
        isOk = false;
    };

    if (isOk) {
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
        return "";
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
    if (e.target.closest('li')) {
        const pName = e.target.innerText;
        const card = e.target.closest('.category-card');
        const category = card.querySelector('button').innerText;

        document.querySelector('select').value = category; 
        if (pName !== 'Others') {
            document.querySelector('#p-name').value = pName; 
        } else {
            document.querySelector('#p-name').value = '';
        };
    }
}

function runAnimate(e) {

    // console.log("button clicked.")
    // console.log(e.target.getAttribute("data-clicked"))
    // console.log(e.target)

    /*

    let animated = e.target.getAttribute("data-clicked")


    if (animated === 'false') {

        anime({
            targets: '#dairy-list',
            translateX: 250,
            rotate: '1turn',
            direction: 'alternate'
          });

        e.target.setAttribute("data-clicked", "true")

    } else {

        e.target.setAttribute("data-clicked", "false")
        anime({
            targets: '#dairy-list',
            translateX: -250,
            rotate: '1turn',
            direction: 'alternate'
          });

        
    }
    */

    

    // anime({
    //     // animate different elements at the same time if necessary
    //     //targets: [".animate-category", '.mixed-array-demo .el-02', '.mixed-array-demo .el-03'],
    //     targets: ['.animate-category'],
    //     keyframes: [
    //         {translateY: -40},
    //         {translateX: 250},
    //         {translateY: 40},
    //         {translateX: 0},
    //         {translateY: 0}
    //       ],
    //     borderRadius: 200,
    //     //easing: 'linear',
    //     direction: 'alternate'
    // });  

    // anime({
    //     // animate different elements at the same time if necessary
    //     //targets: [".animate-category", '.mixed-array-demo .el-02', '.mixed-array-demo .el-03'],
    //     targets: ['#dairy-list'],
    //     keyframes: [
    //         {translateY: -40},
    //         {translateX: 250},
    //         {translateY: 40},
    //         {translateX: 0},
    //         {translateY: 0}
    //       ],
    //     borderRadius: 200,
    //     //easing: 'linear',
    //     direction: 'alternate'
    // });  

    // first time, animation is false. Animation will then run.
    // Next run is false, it will not run and it will be changed to false, to run again.



}

insertDate();
