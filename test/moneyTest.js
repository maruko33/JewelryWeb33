import {priceAdjust} from '../script/utils/priceAdjuster.js'

console.log('test suite: priceAdjuster');
console.log('converts cent into dollar');
if(priceAdjust(2095,2) === 20.95){
    
    console.log('passed');
}else{
    console.log(priceAdjust(2095,2));
    console.log('failed');
}

console.log('work with zero');
if(priceAdjust(0,2)==0.00){
    console.log('passed');
}else{
    console.log('failed');
}

console.log('rounds up to the nearest cent');
if(priceAdjust(2000.5,2)===20.01){
    console.log('passed');
}else{
    console.log(priceAdjust(2000.5,2));
    console.log('failed')
}