export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart =[
        {
            productId: '16985746213',
            quantity:2,
            deliveryOptionId:'1'
        },
        {
            productId: '13455231158',
            quantity:1,
            deliveryOptionId:'2'
        }
    ];
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

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
            quantity: 1,
            deliveryOptionId:'1'
        });
    }
    saveToStorage();
}

export function displayCartQty(){
    let totalQty =0;
    cart.forEach((cartItem) => {
        totalQty+=cartItem.quantity;
    })
    document.querySelector('.cart_Qty').innerHTML = `${totalQty}`;
    if(document.querySelector('.cart-link')!=null){
        document.querySelector('.cart-link').innerHTML =`${totalQty} items`;
    }
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

export function removeFromCart(productId){
    const newCart = []
    cart.forEach((item)=>{
        if(productId!==item.productId){
            newCart.push(item);
        }else{
            if(item.quantity>1){
                item.quantity--;
                newCart.push(item);
            }
        }
    })
    cart = newCart;
    
    saveToStorage();
}

export function IsRemove(productId){
    let result = false;
    cart.forEach((item)=> {
        if(item.productId === productId){
            
            if(item.quantity===1||item.quantity===0){
                result = true;
            }
        }
    });
    return result;
}

export function changeQuantity(productId, num){
    cart.forEach((item)=> {
        if(item.productId === productId){
            item.quantity = num;
        }
    });
}

export function updateDeliveryOption(productIds, deliveryOptionId){
    let matchingitem;
    cart.forEach((cartItem)=> {

        if(productIds === cartItem.productId){
            matchingitem = cartItem;

        }
    
    })
    matchingitem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
    
}