document.addEventListener("DOMContentLoaded", function(){ 


    const products = [        //  list of products that we'll display in product list
        {id : 1 , name : "Product 1" , price : 29.99} ,
        {id : 2 , name : "Product 2" , price : 39.99} ,
        {id : 3 , name : "Product 3" , price : 49.99} ,
    ]


    let cart = []   // for storing the value ki kon-kon aaya 

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");

     // for inserting every product element to get displayed
    products.forEach( (product) => {     

        // 1. Creating the element
        const productDiv = document.createElement('div')
        productDiv.classList.add("product")  // Css hai iski hence add kiya class
        productDiv.innerHTML = `
            <span> ${product.name} - $${product.price.toFixed(2)} </span>    
            <button data-id = "${product.id}" >Add to Cart</button>
        `
        // 2. Adding it to product-list
        productList.appendChild(productDiv)

    }  )  // tofixed(2) : 2 decimal tk fix krega  
    


    //  add to cart btn functionality
    productList.addEventListener("click" , (e) => {
        if(e.target.tagName === 'BUTTON') {
            const productId = parseInt(e.target.getAttribute('data-id'))  // parseint coz string receieved
            const product = products.find((p) => (p.id === productId))
            addToCart(product)
        }
    })


    
    function addToCart(product){
        cart.push(product)
        saveCart()
        renderCart()
    }

    function renderCart(){
        cartItems.innerText = ""
        let totalPrice = 0

        if(cart.length) {
            emptyCartMessage.classList.add('hidden')
            cartTotalMessage.classList.remove("hidden");

            cart.forEach((item) => {
                totalPrice += item.price  // adding to price

                const cartItem = document.createElement('div')  // creating a div to insert
                cartItem.classList.add("product")  // for styling the btn
                cartItem.innerHTML = `
                <span>${item.name} - ${item.price.toFixed(2)}</span>
                <button item-id = ${item.id}>Remove</button>
                `;
                

                cartItems.appendChild(cartItem)
                totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
            })

        }else{
             emptyCartMessage.classList.remove("hidden");
             totalPriceDisplay.textContent = `$0.00`;
        }
    }
    
    checkOutBtn.addEventListener("click", () => {
      cart.length = 0;
      alert("Checkout successfully");
      renderCart();
    });



    // assignment to add remove btn : Issue -> same products saare ek sath remove ho rhe hai .. coz id se difn kr rhe hai so same id wale saare hattt ja rhe hai
    // SOLUTION ?
    cartItems.addEventListener('click',function(e){
        if(e.target.tagName === "BUTTON"){
            const itemId = parseInt(e.target.getAttribute('item-id'))

            cart = cart.filter((item) => item.id !== itemId)
            console.log(cart);

            renderCart()
        }
    })


    
    function saveCart(){
        localStorage.setItem("cart" , JSON.stringify(cart))
    }



})