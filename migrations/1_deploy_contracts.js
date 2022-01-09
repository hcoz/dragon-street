require('dotenv').config();
const { PROXY_REGISTRY_ADDRESS } = process.env;
const DragonStreetNFT = artifacts.require('./DragonStreetNFT.sol');

module.exports = function (deployer) {
    deployer.deploy(DragonStreetNFT, PROXY_REGISTRY_ADDRESS);
};
