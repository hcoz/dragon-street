require('dotenv').config();

const { API_URL, PRIVATE_KEY, PUBLIC_KEY } = process.env;

const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(API_URL);

const contract = require('../artifacts/contracts/MyNFT.sol/MyNFT.json');
const contractAddress = '0x609e460FAb1Fd07D2651a14aA733b1b6F669caA7';
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
    // get the latest nonce
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

    // the transaction
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        // value: '200000000000000',
        nonce: nonce,
        gas: 500000,
        // maxPriorityFeePerGas: 1,
        data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    };

    web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            `The hash of your transaction is: ${hash}
                            Check Alchemy's Mempool to view the status of your transaction!`
                        )
                    } else {
                        console.log(
                            'Something went wrong when submitting your transaction:',
                            err
                        )
                    }
                }
            )
        })
        .catch((err) => {
            console.log(' Promise failed:', err)
        });
}

mintNFT(
    'https://gateway.pinata.cloud/ipfs/QmUbFSFnhUjb3svqdTWhWzMwR2GU9kCZiH3mYes1x6eEwq' // nft-metadata url
);
