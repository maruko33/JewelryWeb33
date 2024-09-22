export function priceAdjust(priceInCent, decimalNum){
    return parseFloat((Math.round(priceInCent)/100).toFixed(decimalNum));
}

