import { ENV } from '@env'

// Document refer: https://docs.celo.org/getting-started/wallets/using-metamask-with-celo/manual-setup
const DATA = {
    testnet: {
        name:             "Celo Alfajores",
        rpc:              "https://alfajores-forno.celo-testnet.org",
        symbol:           "CELO",
        CONTRACT_ADDRESS: "0x4385F8519dC1435cb5B742C2f64efdB45E5dF6Cc",
        cUSD_ADDRESS:     "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
        cEUR_ADDRESS:     "0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f",
        chainId:          "44787",
        blockExplorer:    "https://alfajores-blockscout.celo-testnet.org",
        testnet:          "true"
    },
    mainnet: {
        name:             "Celo Mainnet",
        rpc:              "https://forno.celo.org",
        symbol:           "CELO",
        CONTRACT_ADDRESS: "",
        cUSD_ADDRESS:     "0x765de816845861e75a25fca122bb6898b8b1282a",
        cEUR_ADDRESS:     "0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73",
        chainId:          "42220",
        blockExplorer:    "https://explorer.celo.org",
        testnet:          "false"
    }
  };

export const CHAIN_DATA = ENV ? DATA[ENV] : DATA["testnet"];