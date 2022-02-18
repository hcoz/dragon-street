require('dotenv').config();
const { API_URL, NFT_CONTRACT_ADDRESS, MNEMONIC } = process.env;
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const contract = require('../build/contracts/DragonStreetNFT.json');

async function main(receiver) {
    const provider = new HDWalletProvider(MNEMONIC, API_URL);
    const web3 = createAlchemyWeb3(API_URL, { writeProvider: provider });
    const nftContract = new web3.eth.Contract(
        contract.abi,
        NFT_CONTRACT_ADDRESS,
        { gasLimit: '1000000' }
    );

    try {
        // Creatures issued directly to the owner.
        const result = await nftContract.methods
            .mintTo(receiver)
            .send({
                from: receiver,
                value: web3.utils.toWei('0.01', 'ether')
            });
        console.log('Minted creature. Transaction:', result.transactionHash);

        return result.transactionHash;
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

module.exports = main;
