class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCart {
    constructor() {
        this.cart = [];
    }

    addToCart(product) {
        this.cart = [...this.cart, {...product,quantity:1}]; // spread operator combines properties of current cart , product and add a new qty propery in  a single array
        this.updateCart();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id!== productId); // creates a new array from this.cart that satisfy the given condition and updates existing array
        // it will loop thorugh the cart items and if any of the items have item.id == productID it will not take and will return the rest of them
        this.updateCart(); 
    }

    updateCart() {
        this.renderCart();
        this.calculateTotal();
    }

    renderCart() {
        const cartList = document.getElementById("cart");
        cartList.innerHTML = ''; // returns an empty string /// What if we didnt give this code

        const cartHeading = document.createElement("h2");
        cartHeading.textContent = "Your CartItems";
        cartList.appendChild(cartHeading);

        this.cart.forEach(item => {
           
            const listItem = document.createElement("li"); // created a li element under ul element
            listItem.innerHTML = `${item.name} - $${item.price.toFixed(2)} - ${item.quantity}
            <button onclick = "removeItem(${item.id})">Remove </button>`;// added cartitems to li element and created a button to remove cart item based on id

            cartList.appendChild(listItem);
        });
    }

        calculateTotal() {
            const totalElement = document.getElementById("total");
            const total = this.cart.reduce((acc, item) => acc + item.price * item.quantity,0);
            //reduce method is used to accumulate a single value from the elements of an array
            totalElement.textContent = `Total: $${total.toFixed(2)}`; // set the text content with value of total

 
        }
    
 }

 const products = [
    new Product(1, 'HP Laptop', 300.00),
    new Product(2, 'Moto G Stylus 5G', 194.40),
    new Product(3, 'BlackDecker Food Processor', 420.35)
 ]

 //we have products in hand we need to add to cart !!

 const shoppingcart =  new ShoppingCart();

 function addToCart(productID) {
    const selectedProduct = products.find(product=> product.id === productID);
    if(selectedProduct) {
        shoppingcart.addToCart(selectedProduct);
    }

 }

 function removeItem(productID) {
    shoppingcart.removeFromCart(productID);
 }
 