import { useContext } from "react";
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import AppContext from "../components/AppContext";

const Favourites = {
    getAppContext: function () {
        return useContext(AppContext);
    },
    writeFavourite: async function(_address){
        const connector = useWalletConnect();

        try {
            const signed = await Favourites.getAppContext().contract.populateTransaction["writeFavourite"](
                _address, {
                from: Favourites.getAppContext().address
            });
            const signedResponse = await connector.signTransaction({
                ...signed,
                gasLimit: 1500000
            });
            const res = await connector.sendTransaction(signed);
        } catch (e) {
            console.error(e);
            return false;
        }
        return true;
    },
    getFavouriteCount: async function(_address){
        const fCount = await Favourites.getAppContext().contract.readFavouriteCount(_address);
        return fCount;
    },
    getFavourite: async function(_index){
        const _favourite = await Favourites.getAppContext().contract.readFavourite(_index);
        return _favourite;
    }
}

export default Favourites;