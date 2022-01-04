require('dotenv').config();

const { API_URL, PRIVATE_KEY, PUBLIC_KEY } = process.env;
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const contract = require('../artifacts/contracts/DragonStreetNFT.sol/DragonStreetNFT.json');

const contractAddress = '0x36c705C8e066b742969F4f5C03215d000d0DD50e';
const web3 = createAlchemyWeb3(API_URL);
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
    try {
        const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
        console.log('nonce: ', nonce);
        const data = nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI();
        console.log('data: ', data);
        const estimatedGas = await web3.eth.estimateGas({
            // 'from': PUBLIC_KEY,
            'to': contractAddress,
            // 'nonce': nonce,
            value: 100,
            'data': data
        });
        console.log('estimatedGas: ', estimatedGas);
        // const maxPriorityFeePerGas = await web3.eth.getMaxPriorityFeePerGas();
        // console.log('maxPriorityFeePerGas: ', maxPriorityFeePerGas);
        const block = await web3.eth.getBlock("pending");
        console.log('block: ', block);
        const baseFee = Number(block.baseFeePerGas);
        console.log('baseFee: ', baseFee);
        const tip = block.gasLimit;
        const max = Number(tip) + baseFee - 1; // less than the sum
        console.log('max: ', max);

        //the transaction
        const tx = {
          'from': PUBLIC_KEY,
          'to': contractAddress,
          'nonce': nonce,
          'gas': estimatedGas,
          'maxPriorityFeePerGas': Number(tip),
          'maxFeePerGas': max,
          value: 100,
          'data': data
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
        console.log('signedTx: ', signedTx);
        const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
    } catch (error) {
        console.log('error: ', error);
    }
}

mintNFT(
    'https://gateway.pinata.cloud/ipfs/QmUbFSFnhUjb3svqdTWhWzMwR2GU9kCZiH3mYes1x6eEwq' // nft-metadata url
);
