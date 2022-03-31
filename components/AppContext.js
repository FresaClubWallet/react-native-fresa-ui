import { createContext } from 'react';

const AppContext = createContext({
  address: 'NOT LOGGED IN',
  chainId: 44787,
  balance: 'Loading ....',
  provider: null,
  contract: null,
  NETWORK: 'https://alfajores-forno.celo-testnet.org',
  cUSD_ADDRESS: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
  CONTRACT_ADDRESS: '0xba2C8354c22F1C8033DF24669a6a0920869157B8'
})

export default AppContext; 
