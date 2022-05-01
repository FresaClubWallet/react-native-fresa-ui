import { useContext } from "react";
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import AppContext from "../components/AppContext";

const Storefront = {
    getAppContext: function () {
        return useContext(AppContext);
    },
    getStorefrontExists: async function (_address) {
        const _exists = await Storefront.getAppContext().contract.readStoreFrontExisits(_address);
        return _exists;
    },
    getStorefrontActive: async function (_address){
        // TODO: Make this call public within the contract.
    },
    getStorefront: async function(_address){
        const _storefront = await Storefront.getAppContext().contract.readStoreFront(_address);
        return _storefront;
    },
    writeStorefront: async function(_storeName, _storeImage, _storeDescription, _storeLat, _storeLong, _active){
        const connector = useWalletConnect();
        const signed = await Storefront.getAppContext().contract.populateTransaction["writeStoreFront"](
            _storeName, _storeImage, _storeDescription, _storeLat, _storeLong, _active, {
                from: Storefront.getAppContext().address
            });    
          const signedResponse = await connector.signTransaction({
            ...signed,
            gasLimit: 1500000
          });
          const res = await connector.sendTransaction(signed);
    }
}

export default Storefront;