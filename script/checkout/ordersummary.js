import * as cartModule from "../../database/cart.js";
import { Products } from "../../database/products.js";
import * as toolbox from "../utils/priceAdjuster.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOption } from "../../database/deliveryOptions.js";
import { updatePrice } from "./paymentsummary.js";



let producthtml =``;



export function displayCheckoutItems(){
    producthtml =``;
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

    document.querySelectorAll('.container').forEach((element) =>{
        element.addEventListener('click',() => {
            const {productId,deliveryOptionId} = element.dataset;
            cartModule.updateDeliveryOption(productId, deliveryOptionId);
            displayCheckoutItems();
            updatePrice(cartModule.cart);
        })
    })

    function deliveryOptionsHTML(matchingProduct, cartItem){
        let html =``;
        deliveryOption.forEach((deliveryOption)=> {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
            const dateString = deliveryDate.format('YYYY, MMMM DD');
            const isChecked = deliveryOption.id ===cartItem.deliveryOptionId;
            const priceString = deliveryOption.priceCent === 0 ? 'FREE' : `$${toolbox.priceAdjust(deliveryOption.priceCent,2)}`
            html += `
                <div class="delivery-type-info-box">
                    <div class="container" data-delivery-option-id="${deliveryOption.id}" data-product-id="${matchingProduct.id}">
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
}