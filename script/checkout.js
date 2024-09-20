import * as cartModule from "../database/cart.js";
import { Products } from "../database/products.js";
import * as toolbox from "./utils/priceAdjuster.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOption } from "../database/deliveryOptions.js";


let producthtml =``;
let totalItem = 0;
let totalItemFee =0;
let totalshippingfee = 0;
let priceBeforeTax =0;
let pricAfterTax=0;
let summaryhtml =``;
let headerhtml =`        
        <div class="header">
            <div class="header_logo">
                <a class="logo-link" href="mainpage.html">
                    <button class="logo_button">
                        <img class="img_logo" src="image/jewelry-logo.jpg">
                    </button>
                </a>
            </div>

            <div class="checkout-title">
                <span class="checkout-font">Checkout (<a class="cart-link" herf="http://localhost:5500/mainpage.html">0 items</a>)</span>
            </div>

            <div class="header_cart">
                <a class="checkout-link" href="checkout.html">
                    <button class="cart_Button">
                        <img class="cart_icon" src="image/cartIcon.jpg";>
                        <div class="cart_Qty">0</div>
                        <div class="tooltip">List your cart</div>
                    </button>
                </a>

            </div>
        </div>`;


displayCheckoutItems();
updatePrice(cartModule.cart);


function displayHeader(){

}

function updatePrice(cart){
    totalItem = 0;
    totalItemFee =0;
    totalshippingfee = 0;
    priceBeforeTax =0;
    pricAfterTax=0;
    let summaryhtml =``;
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        let matchingProduct;
    
        Products.forEach((product) =>{
            if(product.id === productId){
                matchingProduct = product;
            }
        })
        totalItem+=cartItem.quantity;
        totalItemFee+=cartItem.quantity*(matchingProduct.price_inCent/100);
        priceBeforeTax = totalItemFee+totalshippingfee;
        pricAfterTax = toolbox.priceAdjust((totalItemFee+totalshippingfee)*113,2);
    })
    displayCheckoutSummary();
    cartModule.displayCartQty();
}

function displayCheckoutItems(){
    cartModule.cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        let matchingProduct;
    
        Products.forEach((product) =>{
            if(product.id === productId){
                matchingProduct = product;
            }
        })

        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOptions;
        deliveryOption.forEach((option)=>{
            if(option.id === deliveryOptionId){
                deliveryOptions = option.deliveryDays;
            }
        })

        const today = dayjs();
        const deliveryDate = today.add(deliveryOptions, 'day');
        const dateString = deliveryDate.format('YYYY, MMMM DD');
        //totalshippingfee=
        
        producthtml += `    <div class="checkout-body-products-cell js-cart-item-${matchingProduct.id}">
                        <p class="delivery-date">
                            ${dateString}
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
                                        <span class="item-quantity-${matchingProduct.id}">quantity: ${cartItem.quantity}</span>&nbsp;&nbsp;&nbsp;<span class="js-update-link js-update-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">Update</span>&nbsp;&nbsp;&nbsp;<span class="js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
                                    </div>
                                </div>
                            </div>
                            <div class="checkout-body-products-cell-deliveryInfo">
                                <div>
                                    <p class="title3">Choose a delivery option</p>
                                </div>
                                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                            </div>
                            
                        </div>
                    </div>`;
        
    })
    document.querySelector('.checkout-body-products').innerHTML = producthtml;
    cartModule.displayCartQty();
}

function deliveryOptionsHTML(matchingProduct, cartItem){
    let html =``;
    deliveryOption.forEach((deliveryOption)=> {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
        const dateString = deliveryDate.format('YYYY, MMMM DD');
        const isChecked = deliveryOption.id ===cartItem.deliveryOptionId;
        const priceString = deliveryOption.priceCent === 0 ? 'FREE' : `$${toolbox.priceAdjust(deliveryOption.priceCent)}`
        html += `
            <div class="delivery-type-info-box">
                <div class="container">
                    <input type="radio" ${isChecked ? 'checked': ''} name="delivery-option-${matchingProduct.id}" >                        
                </div>
                <div>
                    <p>${dateString}</p>
                    <span class="delivery-type">${priceString} shipping</span>
                </div>
            </div>`;
    })

    return html;
}

function displayCheckoutSummary(){
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



    document.querySelector('.checkout-body-summary-box').innerHTML = summaryhtml;

}



document.querySelectorAll('.js-delete-link').forEach((link) =>{
    
    link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;
        const containerhtml = document.querySelector(`.js-cart-item-${productId}`);
        if(cartModule.IsRemove(productId)){
            containerhtml.remove();
        }
        cartModule.removeFromCart(productId);

        updatePrice(cartModule.cart);
    })
})

document.querySelectorAll('.js-update-link').forEach((link) =>{
/**
 *     link.addEventListener('click', ()=>{
        console.log(link);
        const productId = link.dataset.productId;
        const updateHTML = document.querySelector(`.js-update-link-${productId}`);
        updateHTML.innerHTML = '<input class="quantity-input"type="text"> <span class="save-quantity-link">Save</span>'
        const input = document.querySelector('.quantity-input');
        input.focus();

            //need to fix really need to fix please fix this
            document.querySelector('.save-quantity-link').addEventListener('click', ()=>{
                console.log("got it");
                console.log(input.value);
                cartModule.changeQuantity(productId, input.value);
    
                updatePrice(cartModule.cart);
            })


        

        
    })
 *  */    

})



