import * as cartModule from "../../database/cart.js";
import { Products } from "../../database/products.js";
import * as toolbox from "../utils/priceAdjuster.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOption } from "../../database/deliveryOptions.js";

let totalItem = 0;
let totalItemFee =0;
let totalshippingfee = 0;
let priceBeforeTax =0;
let pricAfterTax=0;
let summaryhtml =``;

export function updatePrice(cart){
    totalItem = 0;
    totalItemFee =0;
    totalshippingfee = 0;
    priceBeforeTax =0;
    pricAfterTax=0;
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

export function displayCheckoutSummary(){
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