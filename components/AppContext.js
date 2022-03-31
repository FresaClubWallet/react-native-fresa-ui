import { createContext } from 'react';

const AppContext = createContext({
  loggedIn: false,
  address: 'NOT LOGGED IN',
  balance: 'Loading ...',
  onboardingFinished: 'false',
  handleLogIn: null, 
  handleLogOut: null,
  chainId: 44787,
  NETWORK: 'https://alfajores-forno.celo-testnet.org',
  cUSD_ADDRESS: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
  CONTRACT_ADDRESS: '0xba2C8354c22F1C8033DF24669a6a0920869157B8'
})

export default AppContext; 
