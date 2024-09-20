export function priceAdjust(priceInCent, decimalNum){
    return parseFloat((priceInCent/100).toFixed(decimalNum));
}