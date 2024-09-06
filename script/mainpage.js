import * as cartModule from "../database/cart.js";
import { Products } from "../database/products.js";

let productsHTML = ``;

Products.forEach((Products) => {
    const html =`
                <div class="sale_cell">
                <div>
                    <img class="img_c1" src="${Products.img}">    
                </div>
                
                <div>
                    <p class="JewelryName">${Products.name}</p>
                </div>
                
                <div>
                    ${Products.rate.stars} star
                </div>
                
                <div class="sale_num_link">
                    Qty: ${Products.rate.count}
                </div>
                
                <div>
                    <p class="JewelryPrice">$${(Products.price_inCent/100).toFixed(2)}</p>
                </div>
                
                <div class="buttonbox js-buttonbox">
                    <div class="addedReminder js-addedRiminder-${Products.id}">
                        <div class="addedReminderHide">
                            <div class="goodIconBox"><img class="goodIcon" src="image/goodIcon.png"></div>
                            <div><p class="addedText">Added</p></div>
                        </div>
                    </div>
                        <button class="addtocart js-addtocart"
                        data-product-id="${Products.id}"
                        >ADD TO Cart</button>    
                </div>
            </div>
    `;
    productsHTML+=html;
})



document.querySelector('.js-products-grid').innerHTML = productsHTML;


document.querySelectorAll('.js-addtocart').forEach((button) => {
    button.addEventListener('click', () =>{
        const productId = button.dataset.productId;
        cartModule.addToCart(productId); 
        cartModule.displayCartQty();
        cartModule.displayAddReminder(productId);
        console.log(cartModule.cart);
        //reminder: the function displayAddReminder() is not complete
    })    
})





