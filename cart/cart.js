function updateCart(cartList,products){

    let cartContainer = document.getElementById("cart-container");
    let cartHtml = '';

    for(let index in cartList){

        const product = products.filter(product => {
            return product.id==cartList[index];
        })[0]

        cartHtml+=`
        <div class="item">
            <img src='${product.img}'/>
            <div class="content">
                <a href='/product/product.html?id=${product.id}'><p class="title">${product.title}</p></a>
                <span class="price">$200</span>
                <div class="wishlistAdd">
                    <span data-eventtype='wishlistAdd' data-itemid=${product.id}>&#x2764;</span>
                    <span data-eventtype='wishlistAdd' data-itemid=${product.id}>Save</span>                    
                </div>
            </div>
            <span class="cartRemove" data-eventType='cartRemove' data-itemid=${product.id}>&#10006;</span>
        </div>
        <hr class="horizontalLine">
        `
    }
    cartContainer.innerHTML = cartHtml;
}

function cartLoad(){
    fetch('../data.json')
    .then(response => response.json())
    .then(products => {

    let cartList = localStorage.getItem('cartList');
        if(cartList){
            cartList = JSON.parse(cartList)
            updateCart(cartList,products)
            bindCartEvents(products);
        }
    })
}

cartLoad()

function cartRemoveInit(cartList,e,products){
    cartList = JSON.parse(cartList);
    const itemid = e.target.dataset.itemid;
    cartList = cartList.filter( index => index!=itemid);
    updateCart(cartList,products);
    localStorage.setItem('cartList',JSON.stringify(cartList));
}

function bindCartEvents(products){
    document.getElementById('cart-container').addEventListener('click',function(e){
        let cartList = localStorage.getItem('cartList');
        if(e.target.dataset.eventtype==="cartRemove"){
            cartRemoveInit(cartList,e,products)
        }
        else if(e.target.dataset.eventtype==="wishlistAdd"){
            wishlistAdd(e.target.dataset.itemid);
            cartRemoveInit(cartList,e,products);
        }
    })    
}