document.addEventListener('DOMContentLoaded',function(){

  // grabbing all the elements for conveineince
   const productList = document.getElementById("product-list");
   const cartTotal = document.getElementById("cart-total");
   const emptyCartMessage = document.getElementById("empty-cart");
   const checkOutButton = document.getElementById("checkout-btn");
   const totalPrice = document.getElementById("total-price");
   const cartItems = document.getElementById("cart-items");

   // array for storing ki kitne products add to cart hua
   let cart = []
   
   // manually listing the products that we a website has 
   let products = [
    {id:1 , name : "Product 1" , price : 19.99} , 
    {id:2, name : "Product 2" , price : 39.99} , 
    {id:3 , name : "Product 3" , price : 54.99} , 
   ] 

   // displaying each element 
   products.forEach((product) => {
    // creating a div with all the content
      const productDiv = document.createElement('div')
      productDiv.classList.add("product");  // this is because iski css bni hui hai 
      productDiv.innerHTML = `
        <span>${product.name} - ${product.price}</span>
        <button data-id = ${product.id}>Add to cart</button>
      `
      // inserting it to product list 
      productList.appendChild(productDiv)
   })

   //  add to cart btn functionality
   productList.addEventListener("click", (e) => {
      if(e.target.tagName === 'BUTTON') {
        emptyCartMessage.classList.add('hidden')
        cartTotal.classList.remove('hidden')     // ParseInt coz we received string 
        const productId = parseInt(e.target.getAttribute('data-id'))   // console krle 
        const product = products.filter((p) => p.id === productId)
        console.log(product);
        
        addToCart(product)
      }


      // checkOut btn functionality 
      checkOutButton.addEventListener('click' , function(){
        alert("Checkout Successful !")
        emptyCartMessage.classList.remove("hidden")
        cartItems.classList.add("hidden")
        cartTotal.classList.add("hidden")
      })


      function addToCart(product){
        const p = document.createElement('div')
        p.classList.add("product");
        p.innerHTML = `
        
        `
        cartItems.appendChild(p)
      }
   })














})