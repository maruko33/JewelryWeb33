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
                <div class="buttonbox">
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

        console.log(cart);
    })    
})