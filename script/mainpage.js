const Products = [{
    img: 'image/firstclass01.jpg',
    name: 'A1',
    price_inCent: 2000,
    rate: {stars: 5, count: 0}},
    {img: 'image/firstclass02.jpg',
    name: 'A2',
    price_inCent: 1500,
    rate: {stars: 5, count: 0}},
    {img: 'image/firstclass03.jpg',
    name: 'A3',
    price_inCent: 1500,
    rate: {stars: 5, count: 0}}
];

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
                    <button class="addtocart">ADD TO Cart</button>    
                </div>
            </div>
    `;
    
    
    
    productsHTML+=html;

})

console.log(productsHTML);

document.querySelector('.js-products-grid').innerHTML = productsHTML;