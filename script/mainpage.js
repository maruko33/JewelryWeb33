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

        let matchingitem;
        cart.forEach((item)=> {
            if(productId === item.productId){
                
                matchingitem = item;
            }
        });
        if(matchingitem){
            matchingitem.quantity+=1;
        }else{
            cart.push({productId: productId,
                quantity: 1
            });
        }
        displayCartQty();
        displayAddReminder(productId);
        console.log(cart);
        //reminder: the function displayAddReminder() is not complete
    })    
})


function displayCartQty(){
    let totalQty =0;
    cart.forEach((item) => {
        totalQty+=item.quantity;
    })
    document.querySelector('.cart_Qty').innerHTML = `${totalQty}`
}

const addedMessageTimeouts= {};

function displayAddReminder(productId){
    const previousTimeID = addedMessageTimeouts[productId];
    
    if(previousTimeID){
        clearTimeout(previousTimeID);
    }

    document.querySelector(`.js-addedRiminder-${productId}`).innerHTML =`
    <div class="addedReminderShow">    
        <div class="goodIconBox"><img class="goodIcon" src="image/goodIcon.png"></div>
        <div><p class="addedText">Added</p></div>
    </div>` 
    const currentTimeID =setTimeout(() => {
        document.querySelector(`.js-addedRiminder-${productId}`).innerHTML =`
    <div class="addedReminderHide">    
        <div class="goodIconBox"><img class="goodIcon" src="image/goodIcon.png"></div>
        <div><p class="addedText">Added</p></div>
    </div>`
}, 2000);

    

    addedMessageTimeouts[productId] = currentTimeID;
    
}