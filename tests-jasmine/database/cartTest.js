import * as cart from "../../database/cart.js"

describe('test suite: addToCart', ()=>{
    it('adds an existing product to the cart', () =>{

    });

    it('add a new product to the cart', ()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
            console.log(localStorage.getItem('cart'));
        });
        cart.addToCart('16985746213');
        let a = cart.cart.length;
        expect(cart.cart.length).toEqual(1);
    });
})