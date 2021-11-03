function wishlistAdd(itemid,wishlistEventStatus=undefined,tag=undefined){

    let wishlist = localStorage.getItem('wishlist');
    if(wishlist){
        wishlist = JSON.parse(wishlist);

        let tempWishlist = wishlist.filter(index => index==itemid)
        if(tempWishlist.length!=0){
            return;
        }
        wishlist.push(itemid);
        localStorage.setItem('wishlist',JSON.stringify(wishlist))    
    }
    else{
        wishlist=[itemid];
        localStorage.setItem('wishlist',JSON.stringify(wishlist))    
    }
    if(wishlistEventStatus && tag){
        if(wishlistEventStatus==="wishlisteventadd"){
            tag.classList.remove("wishlistIconAdd");
            tag.classList.add("wishlistIconRemove");
        }
    }
}

function wishlistRemove(itemid,wishlistEventStatus=undefined,tag=undefined){
    let wishlist = localStorage.getItem('wishlist');
    if(wishlist){
        wishlist = JSON.parse(wishlist);
        wishlist = wishlist.filter(index => index!=itemid);
        localStorage.setItem('wishlist',JSON.stringify(wishlist))    
    }

    if(wishlistEventStatus && tag){
        if(wishlistEventStatus==="wishlisteventremove"){
            tag.classList.remove("wishlistIconRemove");
            tag.classList.add("wishlistIconAdd");
        }    
    }
}