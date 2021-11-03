function updateWishlist(wishlist,products){
    
    wishlist = JSON.parse(wishlist);
    let wishlistContainer = document.getElementById("wishlist-container");
    let wishlistHtml = '';
    
    for(let index in wishlist){
        const product = products.filter(product => {
            return product.id==wishlist[index];
        })[0]

        wishlistHtml+=`
        <div class="item">
            <div><a href="#">
                <img src='${product.img}'/>
                <p class="title">${product.title}</p>
                <p class="price">$200</p>
            </a></div>
            <span data-eventtype='wishlistremove' data-itemid=${product.id} class="wishlistIconImg">&#x2764;</span>
        </div>
        `
    }
    wishlistContainer.innerHTML = wishlistHtml;        
}

function wishlistLoad(){
    fetch('../data.json')
    .then(response => response.json())
    .then(products => {

    let wishlist = localStorage.getItem('wishlist');
        if(wishlist){        
            updateWishlist(wishlist,products);
            bindWishlistEvent(products);
        }
    })
}

wishlistLoad()

function bindWishlistEvent(products){
    document.getElementById('wishlist-container').addEventListener('click',function(e){
        if(e.target.dataset.eventtype==="wishlistremove"){
            wishlistRemove(e.target.dataset.itemid);
            let wishlist = localStorage.getItem('wishlist');
            updateWishlist(wishlist,products);
        }
    })    
}