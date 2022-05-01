import { useContext } from "react";
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import AppContext from "../components/AppContext";


const Products = {
    getAppContext: function () {
        return useContext(AppContext);
    },
    getProductCount: async function (_address) {
        const pCount = await Products.getAppContext().contract.readProductCount(_address);
        return pCount;
    },
    getProductExists: async function (_address, _index) {
        const exists = await Products.getAppContext().contract.readProductExists(_address, _index);
        return exists;
    },
    getProduct: async function (_address, _index) {
        const product = await Products.getAppContext().contract.readProduct(_address, _index);
        return product;
    },
    getProducts: async function (_address) {
        let _pcount = await Products.getProductCount(_address);
        let _products = [];

        for (let i = 0; i < _pcount; i++) {
            let _p = new Promise(async (resolve, reject) => {
                let p = await Products.getProduct(_address, i)
                resolve({
                    index: i,
                    key: i,
                    owner: p[0],
                    name: p[1],
                    image: p[2],
                    description: p[3],
                    price: p[4].toString(),
                    sold: p[5].toString(),
                    qty: p[6].toString(),
                    active: p[7]
                })
            })
            _products.push(_p);
            console.log(_p);
        }
        return await Promise.all(_products);
    },
    writeProduct: async function(_name, _image, _description, _price, _qty, _active){
        const connector = useWalletConnect();

        try {
            const signed = await Products.getAppContext().contract.populateTransaction["writeProduct"](
                _name, _image, _description, BigNumber.from(_price), _qty, _active, {
                from: Products.getAppContext().address
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
    editProduct: async function(_index, _name, _image, _description, _price, _qty, _active){
        const connector = useWalletConnect();

        try {
            const signed = await Products.getAppContext().contract.populateTransaction["editProduct"](
                _index, _name, _image, _description, BigNumber.from(_price), _qty, _active, {
                from: Products.getAppContext().address
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
    }
}

export default Products;