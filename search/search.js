function searchProducts ()
{
    const params = new URLSearchParams(window.location.search)
    const searchTerm = params.get('q')

    fetch("../data.json")
    .then(response => response.json())
    .then(products => {
        productsListing(products.filter(function(product){
            if(product.title.toLowerCase().includes(searchTerm) || product.desc.toLowerCase().includes(searchTerm))
                return true;
            return false;
    })) 
    
    })
}
searchProducts()