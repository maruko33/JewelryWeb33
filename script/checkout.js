import * as cartModule from "../database/cart.js";
import { Products } from "../database/products.js";
const Cart = cartModule.cart;
cartModule.displayCartQty();

let html =``;

Cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;

    Products.forEach((product) =>{
        if(product.id === productId){
            matchingProduct = product;
        }
    })

    console.log(matchingProduct);

    html = `    <div class="checkout-body-products-cell">
                    <p class="delivery-date">
                        order 1
                    </p>
                    <div class="checkout-body-products-cell-box">
                        <div class="checkout-body-products-cell-productInfo">
                            <div class="checkout-body-products-cell-productInfo-img">
                                <img class="checkout-product-img" src=${matchingProduct.img}    >
                            </div>

                            <div class="checkout-body-products-cell-productInfo-detail">
                                <div>
                                    <p class="JewelryName">${matchingProduct.name}</p>
                                </div>
                                <div class="JewelryPrice">
                                    price: ${matchingProduct.price_inCent/100}$
                                </div>
                                <div>
                                    <span>quantity: ?</span>&nbsp;&nbsp;&nbsp;<a href="http://localhost:5500/mainpage.html">Update</a>&nbsp;&nbsp;&nbsp;<a href="http://localhost:5500/mainpage.html">Delete</a>
                                </div>
                            </div>
                        </div>

                        <div class="checkout-body-products-cell-deliveryInfo">
                            <div>
                                <p class="title3">Choose a delivery option</p>
                            </div>
                                                            
               
                                <div class="delivery-type-info-box">
                                    <div class="container">
                                        <input type="radio" name="radio">
                                        
                                    </div>
                                    <div>
                                        <p>Sunday, September 22</p>
                                        <span class="delivery-type">Free shipping</span>
                                    </div>
                                </div>

                                <div class="delivery-type-info-box">
                                    <div class="container">
                                        <input type="radio" name="radio">
                                        
                                    </div>
                                    <div>
                                        <p>Sunday, September 15</p>
                                        <span class="delivery-type">Fast shipping</span>
                                    </div>
                                </div>

                                <div class="delivery-type-info-box">
                                    <div class="container">
                                        <input type="radio" name="radio">                                 
                                    </div>
                                    <div>
                                        <p>Tomorrow, September 11 </p>  
                                        <span class="delivery-type">One Day shipping</span>
                                    </div>
                                </div>

                                
                        </div>
                    </div>
                </div>`
})

