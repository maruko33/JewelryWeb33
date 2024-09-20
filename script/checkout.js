import * as cartModule from "../database/cart.js";
import { Products } from "../database/products.js";
import * as toolbox from "./utils/priceAdjuster.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOption } from "../database/deliveryOptions.js";
import {displayCheckoutItems} from "./checkout/ordersummary.js";
import {displayCheckoutSummary, updatePrice } from "./checkout/paymentsummary.js";





let headerhtml =`        
        <div class="header">
            <div class="header_logo">
                <a class="logo-link" href="mainpage.html">
                    <button class="logo_button">
                        <img class="img_logo" src="image/jewelry-logo.jpg">
                    </button>
                </a>
            </div>

            <div class="checkout-title">
                <span class="checkout-font">Checkout (<a class="cart-link" herf="http://localhost:5500/mainpage.html">0 items</a>)</span>
            </div>

            <div class="header_cart">
                <a class="checkout-link" href="checkout.html">
                    <button class="cart_Button">
                        <img class="cart_icon" src="image/cartIcon.jpg";>
                        <div class="cart_Qty">0</div>
                        <div class="tooltip">List your cart</div>
                    </button>
                </a>

            </div>
        </div>`;


displayCheckoutItems();
updatePrice(cartModule.cart);


function displayHeader(){

}
















