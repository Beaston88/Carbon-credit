require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545", // Default RPC server for Ganache
      accounts: ["0x14642786f5370fcb6c94f43bfd3b98b490272c55a257a662afb937763a33c7c8"] // Use your Ganache private key
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
