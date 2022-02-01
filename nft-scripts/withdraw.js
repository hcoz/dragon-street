require('dotenv').config();
const { API_URL, NFT_CONTRACT_ADDRESS, OWNER_ADDRESS, MNEMONIC } = process.env;
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const contract = require('../build/contracts/DragonStreetNFT.json');

async function main() {
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
            .withdrawPayments(OWNER_ADDRESS)
            .send({
                from: OWNER_ADDRESS,
                to: OWNER_ADDRESS,
                value: web3.utils.toWei('0.01', 'ether')
            });
        console.log('Withdrawed. Transaction:', result.transactionHash);
    } catch (error) {
        console.log('error: ', error);
    }
}

main();
