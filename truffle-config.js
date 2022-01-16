require('dotenv').config();
const { OWNER_ADDRESS, MNEMONIC, API_URL } = process.env;
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
    networks: {
        development: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*'
        },
        mumbai: {
            provider: () => new HDWalletProvider(MNEMONIC, API_URL),
            from: OWNER_ADDRESS,
            network_id: 80001,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true
        },
        // mumbai: {
        //     provider: () => new HDWalletProvider(MNEMONIC, 'https://rpc-mumbai.maticvigil.com/v1/1c698d35dd607e60eeb43b31ccd8cd0b4621b174'),
        //     from: OWNER_ADDRESS,
        //     network_id: 80001,
        //     confirmations: 2,
        //     timeoutBlocks: 200,
        //     skipDryRun: true
        // },
        // matic: {
        //     provider: () => new HDWalletProvider(MNEMONIC, 'https://rpc-mainnet.maticvigil.com/v1/1c698d35dd607e60eeb43b31ccd8cd0b4621b174'),
        //     from: OWNER_ADDRESS,
        //     network_id: 80001,
        //     confirmations: 2,
        //     timeoutBlocks: 200,
        //     skipDryRun: true
        // }
    },
    compilers: {
        solc: {
            version: '^0.8.0',
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 20 // Optimize for how many times you intend to run the code
                }
            }
        }
    }
};
