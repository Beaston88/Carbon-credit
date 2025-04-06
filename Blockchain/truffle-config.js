require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777", // Match any network id
    },
    sepolia: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, process.env.SEPOLIA_RPC_URL),
      network_id: 11155111, // Sepolia Testnet ID
      gas: 5000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.28"
    }
  }
};
