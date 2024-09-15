export function priceAdjust(priceInCent, decimalNum){
    return (priceInCent/100).toFixed(decimalNum);
}