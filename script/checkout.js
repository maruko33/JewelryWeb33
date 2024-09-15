import * as cartModule from "../database/cart.js";
import { Products } from "../database/products.js";
import * as toolbox from "./utils/priceAdjuster.js"
const Cart = cartModule.cart;
cartModule.displayCartQty();

let producthtml =``;
let totalItem = 0;
let totalItemFee =0;
let totalshippingfee = 0;
let priceBeforeTax =0;
let pricAfterTax=0;
let summaryhtml =``;

Cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;

    Products.forEach((product) =>{
        if(product.id === productId){
            matchingProduct = product;
        }
    })

    totalItem+=cartItem.quantity;
    totalItemFee+=cartItem.quantity*(matchingProduct.price_inCent/100);
    //totalshippingfee=
    
    producthtml += `    <div class="checkout-body-products-cell">
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
                                    price: ${toolbox.priceAdjust(matchingProduct.price_inCent,2)}$
                                </div>
                                <div>
                                    <span>quantity: ${cartItem.quantity}</span>&nbsp;&nbsp;&nbsp;<span class="js-update-link" >Update</span>&nbsp;&nbsp;&nbsp;<span class="js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
                                </div>
                            </div>
                        </div>

                        <div class="checkout-body-products-cell-deliveryInfo">
                            <div>
                                <p class="title3">Choose a delivery option</p>
                            </div>
                                                            
               
                                <div class="delivery-type-info-box">
                                    <div class="container">
                                        <input type="radio" name="delivery-option-${matchingProduct.id}" >
                                        
                                    </div>
                                    <div>
                                        <p>Sunday, September 22</p>
                                        <span class="delivery-type">Free shipping</span>
                                    </div>
                                </div>

                                <div class="delivery-type-info-box">
                                    <div class="container">
                                        <input type="radio" name="delivery-option-${matchingProduct.id}">
                                        
                                    </div>
                                    <div>
                                        <p>Sunday, September 15</p>
                                        <span class="delivery-type">Fast shipping</span>
                                    </div>
                                </div>

                                <div class="delivery-type-info-box">
                                    <div class="container">
                                        <input type="radio" name="delivery-option-${matchingProduct.id}">                                 
                                    </div>
                                    <div>
                                        <p>Tomorrow, September 11 </p>  
                                        <span class="delivery-type">One Day shipping</span>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>`;

})

priceBeforeTax = totalItemFee+totalshippingfee;
pricAfterTax = toolbox.priceAdjust((totalItemFee+totalshippingfee)*113,2);

summaryhtml = `                
                <div>
                    <p class="title2">Order Summary</p>
                </div>
                <div class="parallel-grid-box">
                    <div>
                        <p>Item(${totalItem}):</p>
                    </div>
                    <div>
                        <p>${totalItemFee}$</p>
                    </div>
                </div>
            
                <div class="parallel-grid-box">
                    <div>
                        <p>Shipping & handling:</p>
                    </div>
                    <div>
                        <p>${totalshippingfee}$</p>
                    </div>
                </div>
                <br>
                <div class="parallel-grid-box">
                    <div>
                        <p>Total before tax:</p>
                    </div>
                    <div>
                        <p>${priceBeforeTax}$</p>
                    </div>
                </div>
                <div class="parallel-grid-box">
                    <div>
                        <p>Estimated tax(13%):</p>
                    </div>
                    <div>
                        <p>${pricAfterTax}$</p>
                    </div>
                </div>     
                <hr>
                <div class="parallel-grid-box">
                    <div>
                        <p class="title2">Order total:</p>
                    </div>
                    <div>
                        <p class="title2">${pricAfterTax}$</p>
                    </div>
                </div>
                <div>
                    <button class="placeyourorder">Place your order</button>
                </div>
`;


document.querySelector('.checkout-body-products').innerHTML = producthtml;
document.querySelector('.checkout-body-summary-box').innerHTML = summaryhtml;

document.querySelectorAll('.js-delete-link').forEach((link) =>{
    addEventListener('click', ()=>{
        const productId = link.dataset.productId;
        console.log(productId);
        cartModule.removeFromCart(productId);
    })
})