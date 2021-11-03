window.productsListing = function(products)
{
    let productsList = document.getElementById('product-listing')
    let productsListHtml = ''
    
    for(let index=0;index<products.length;index++){
        let wishlistIconClass = "wishlistIconAdd";
        let wishlistEventType = "wishlisteventadd";
        if(checkItemInWishlist(products[index].id)){
            wishlistIconClass = "wishlistIconRemove";
            wishlistEventType = "wishlisteventremove"
        }
        productsListHtml += `
        <div class="outer-product-container">
            <a href = '/product/product.html?id=${products[index].id}'>
            <div class = "product">
                <img src= '${products[index].img}'/></br>
                <span>${products[index].title}</span>
            </div>
            </a>
            <span data-itemid=${products[index].id} data-eventtype=${wishlistEventType} class=${wishlistIconClass}>&#x2764;</span>
        </div>`
    }
    productsList.innerHTML = productsListHtml    
    bindProductListingEvent();
}

function checkItemInWishlist(index){
    
    let wishlist = localStorage.getItem("wishlist");
    if(wishlist){
        wishlist = JSON.parse(wishlist);
        wishlist = wishlist.filter(item => item==index)
        if(wishlist.length===0)
            return false;
        return true;
    }
}

function bindProductListingEvent(){
    document.getElementById("product-listing").addEventListener("click",function(e){

        if(e.target.dataset.eventtype==="wishlisteventadd"){
            wishlistAdd(e.target.dataset.itemid,e.target.dataset.eventtype,e.target);
            e.target.dataset.eventtype="wishlisteventremove";
        }
        else if(e.target.dataset.eventtype==="wishlisteventremove"){
            wishlistRemove(e.target.dataset.itemid,e.target.dataset.eventtype,e.target);
            e.target.dataset.eventtype="wishlisteventadd";
        }
    })
}


