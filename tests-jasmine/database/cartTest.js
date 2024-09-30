import * as cart from "../../database/cart.js"

describe('test suite: addToCart', ()=>{
    it('adds an existing product to the cart', () =>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{    //spyOn(object, method wanna use)
            return JSON.stringify([{
                productId: '16985746213',
                quantity:1,
                deliveryOptionId:'1'
            }]);                      //in {} we overwrite origin method
                                                             //we overwrite getItem and return a cart with no item([])


        cart.addToCart('16985746213');
        expect(cart.cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cart[0].productId).toEqual('16985746213');
        expect(cart.cart[0].quantity).toEqual(2);
        });
        cart.loadFromStorage();
    });

    it('add a new product to the cart', ()=>{
        spyOn(localStorage, 'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{    //spyOn(object, method wanna use)
            return JSON.stringify([]);                      //in {} we overwrite origin method
                                                             //we overwrite getItem and return a cart with no item([])
        });
        cart.loadFromStorage();
        cart.addToCart('16985746213');
        expect(cart.cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cart[0].productId).toEqual('16985746213');
        expect(cart.cart[0].quantity).toEqual(1);
    });

    it('delete a exist product from cart', ()=>{
        spyOn(localStorage, 'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{    
            return JSON.stringify([{
                productId: '16985746213',
                quantity:2,
                deliveryOptionId:'1'
            }]);                      
        });
        cart.loadFromStorage();
        console.log(cart.cart);
        cart.removeFromCart('16985746213');
        cart.loadFromStorage();
        console.log(cart.cart);

        expect(cart.cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cart[0].productId).toEqual('16985746213');
        expect(cart.cart[0].quantity).toEqual(1);

    })
})
