"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeValue = void 0;
const abundancyScale = {
    coal: 24.74,
    iron: 22.76,
    lapisLazuli: 6.45,
    gold: 24.09,
    diamond: 1.09,
    emerald: 40.12,
    // abundancies of gold, iron and emeraly are increased because these resource can be farmed very easiy
};
const normalizeValue = (resorces) => {
    const arr = resorces.sort((a, b) => a.quantity - b.quantity);
    // console.log(arr);
    const qtyOfDiamond = arr[0].quantity;
    const normalizedValues = arr.map(({ name, valueWRTDiamond, quantity }) => {
        ///////////////////////////////////
        // name - name of the resource
        // valueWRTDiamond - the quantity of the resource you will need in exchange of one diamond
        // quantity - quantity of the resource in the Gov's treasurey
        ///////////////////////////////////
        const newValue = Math.floor(
        /////////////////////////////////
        // If the quantity goes up, the expression will also increase
        // Increasing the quantity you will need in exchange of one diamond
        // If the quantity goes down, the expression will also decrease
        // the fall in the quantity of diamonds will increase the value of the resource
        // the
        /////////////////////////////////
        (quantity / valueWRTDiamond / qtyOfDiamond) * abundancyScale[name] * 2.5);
        return {
            name,
            valueWRTDiamond: newValue,
            quantity,
        };
    });
    // console.log(normalizedValues);
    return normalizedValues;
};
exports.normalizeValue = normalizeValue;
