fetch("../data.json")
  .then(response => response.json())
  .then(products => {
    
    const params = new URLSearchParams(window.location.search)
    const itemId = params.get('id')

    const product = products.filter(product => {
      return product.id==itemId;
    })[0]

    document.getElementById("productImage").src = product.img;
    document.getElementById("productTitle").textContent = product.title;
    document.getElementById("productDesc").innerHTML = product.desc;

    let wishlistTag = document.getElementById('product').querySelector('span');

    if(checkItemInWishlist(itemId)){
      wishlistTag.dataset.eventtype = "wishlisteventremove";
      wishlistTag.classList.remove('wishlistIconAdd');
      wishlistTag.classList.remove('wishlistIconRemove');
    }
});

document.getElementById("addtocart").addEventListener("click",function(){
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get('id');

  let cartList = localStorage.getItem("cartList");
  if(cartList){
    cartList = JSON.parse(cartList);
    const tempCartList = cartList.filter(ele => ele==itemId);
    if(tempCartList.length!=0){
      return;
    }

    cartList.push(itemId);
    localStorage.setItem('cartList',JSON.stringify(cartList));
  }
  else{
    const cartList = [itemId];
    localStorage.setItem('cartList',JSON.stringify(cartList));
  }
  alert("Product added to cart!");
})

function checkItemInWishlist(itemId){
    
  let wishlist = localStorage.getItem("wishlist");
  if(wishlist){
      wishlist = JSON.parse(wishlist);
      wishlist = wishlist.filter(item => item==itemId)
      if(wishlist.length===0)
          return false;
      return true;
  }
}

document.getElementById("addtowishlist").addEventListener("click",function(e){
  const params = new URLSearchParams(window.location.search);
  const itemid = params.get('id');
  
  if(e.target.dataset.eventtype==="wishlisteventadd"){
    wishlistAdd(itemid,e.target.dataset.eventtype,e.target);
    e.target.dataset.eventtype="wishlisteventremove";
  }
  else if(e.target.dataset.eventtype==="wishlisteventremove"){
      wishlistRemove(itemid,e.target.dataset.eventtype,e.target);
      e.target.dataset.eventtype="wishlisteventadd";
  }

})