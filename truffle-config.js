require('dotenv').config();
const { API_URL, MNEMONIC } = process.env;
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
    networks: {
        development: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*'
        },
        mumbai: {
            provider: function () {
                return new HDWalletProvider(MNEMONIC, API_URL)
            },
            network_id: 80001,
            gas: 5000000
        }
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
