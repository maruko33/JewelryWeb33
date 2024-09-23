import {priceAdjust} from '../../script/utils/priceAdjuster.js';

describe('Test suite: priceAdjuster', () => {
    it('converts cent into dollar', () => {
        expect(priceAdjust(2095,2)).toEqual(20.95);
    });

    it('work with 0', () => {
        expect(priceAdjust(0,2)).toEqual(0.00);
    })

    it('work with rounds up to the nearest cent', ()=>{
        expect(priceAdjust(2000.5,2)).toEqual(20.01)
    })
})