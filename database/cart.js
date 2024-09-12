export const cart = [
    {
        productId: '16985746213',
        quantity:2
    },
    {
        productId: '13455231158',
        quantity:1
    }
];

export function addToCart(productId){
    let matchingitem;
    cart.forEach((cartItem)=> {
        if(productId === cartItem.productId){
            
            matchingitem = cartItem;
        }
    });
    if(matchingitem){
        matchingitem.quantity+=1;
    }else{
        cart.push({productId: productId,
            quantity: 1
        });
    }
}

export function displayCartQty(){
    let totalQty =0;
    cart.forEach((cartItem) => {
        totalQty+=cartItem.quantity;
    })
    document.querySelector('.cart_Qty').innerHTML = `${totalQty}`;
}

const addedMessageTimeouts= {};

export function displayAddReminder(productId){
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