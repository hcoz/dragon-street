require('dotenv').config();
const { PROXT_REGISTRY_ADDRESS } = process.env;
const DragonStreetNFT = artifacts.require('./DragonStreetNFT.sol');

module.exports = function (deployer) {
    deployer.deploy(DragonStreetNFT, PROXT_REGISTRY_ADDRESS);
};
