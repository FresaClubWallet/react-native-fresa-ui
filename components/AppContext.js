import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Fresa__factory } from "../types";
import { ethers } from "ethers";

const AppContext = createContext({ signed: false, user: {} });

export const AppProvider = ({ children }) => {
  const connector        = useWalletConnect();
  const cUSD_ADDRESS     = '0x874069fa1eb16d44d622f2e0ca25eea172369bc1';
  const CONTRACT_ADDRESS = '0xba2C8354c22F1C8033DF24669a6a0920869157B8';
  const NETWORK          = 'https://alfajores-forno.celo-testnet.org'
  const chainId          = 44787;
  const [address, setAddress] = useState('NOT LOGGED IN');
  const [balance, setBalance] = useState('Loading ....');

  const provider = useMemo(
    () => new ethers.providers.JsonRpcProvider(NETWORK),
      []
  );

  const contract = useMemo(
    () => new Fresa__factory().attach(CONTRACT_ADDRESS).connect(provider),
    [provider]
  );

  useEffect(async() => {
    if (connector.connected) {
        if (connector.chainId != chainId) {
            disConnectWallet();
        } else {
          setAddress(connector.accounts[0])
          const none = await provider.getBalance(cUSD_ADDRESS)
          let q = await ethers.utils.formatEther(none)
          setBalance((+q).toFixed(2))
        }
      }
  }, [connector])  
  
  async function connectWallet() {
    await connector.connect();
  }
  async function disConnectWallet() {
    await connector.killSession();
  }

  return (
    <AppContext.Provider value={{ 
        connector,
        cUSD_ADDRESS,
        CONTRACT_ADDRESS,
        NETWORK,
        contract,
        chainId,
        address,
        balance,
        connectWallet,
        disConnectWallet,
     }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext; 
