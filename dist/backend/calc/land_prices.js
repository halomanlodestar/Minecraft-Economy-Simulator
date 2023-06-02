"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.landPrices = void 0;
const landPrices = ({ numberOfPlayers, govtFunds, landLeft, }) => {
    return numberOfPlayers * (1 / govtFunds) * (1 / landLeft) * 100000;
};
exports.landPrices = landPrices;
