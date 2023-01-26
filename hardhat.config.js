require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const MAINNET_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY;
const TESTNET_PRIVATE_KEY = process.env.TESTNET_PRIVATE_KEY;
const BSC_API_KEY = process.env.BSCSCAN_API_KEY;
const Metamask_Deployer_Account = process.env.Metamask_Deployer_Account;

module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // etherscan: {
  //   // Your API key for Etherscan
  //   // Obtain one at https://bscscan.com/
  //   apiKey: "",
  // },
  defaultNetwork: "testnet",
  networks: {
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: [Metamask_Deployer_Account],
      gas: "auto",
      gasPrice: 10000000000,
    },
  },

  // defaultNetwork: "bsc",
  // networks: {
  //   bsc: {
  //     url: "https://bsc-dataseed.binance.org/",
  //     chainId: 56,
  //     accounts: [""],
  //     gas: "auto",
  //     gasPrice: 5000000000,
  //   },
  // },




};


