import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Fresaclub__factory } from "../typechain/index";
import { ethers } from "ethers";
import CHAIN_DATA from './ChainData';

const AppContext = createContext({ signed: false, user: {} });

export const AppProvider = ({ children }) => {
  const connector        = useWalletConnect();
  const [address, setAddress] = useState('NOT LOGGED IN');
  const [balance, setBalance] = useState('....');

  const provider = useMemo(
    () => new ethers.providers.JsonRpcProvider(CHAIN_DATA.rpc),
      []
  );

  const contract = useMemo(
    () => new Fresaclub__factory().attach(CHAIN_DATA.CONTRACT_ADDRESS).connect(provider),
    [provider]
  );

  useEffect(async() => {
    if (connector.connected) {
        if (connector.chainId != CHAIN_DATA.chainId) {
            disConnectWallet();
        } else {
          setAddress(connector.accounts[0])
          const none = await provider.getBalance(CHAIN_DATA.cUSD_ADDRESS)
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
        cUSD_ADDRESS : CHAIN_DATA.cUSD_ADDRESS,
        CONTRACT_ADDRESS : CHAIN_DATA.CONTRACT_ADDRESS,
        NETWORK_RPC: CHAIN_DATA.rpc,
        contract,
        chainId: CHAIN_DATA.chainId,
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
