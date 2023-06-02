"use strict";
/** @format */
const landPrices = ({ numberOfPlayers, govtFunds, landLeft }) => {
    return numberOfPlayers * (1 / govtFunds) * (1 / landLeft) * 100000;
};
