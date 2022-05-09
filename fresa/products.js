import { BigNumber } from "ethers";
/* Need to pass appContext & connector & address
Because hooks need to call inside body of main function not here
*/
const Products =  {
    getProductCount: async function (AppContext, _address) {
        const pCount = await AppContext.contract.readProductCount(_address);
        return pCount;
    },
    getProductExists: async function (_address, _index) {
        const exists = await AppContext.contract.readProductExists(_address, _index);
        return exists;
    },
    getProduct: async function (AppContext, _address, _index) {
        const product = await AppContext.contract.readProduct(_address, _index);
        return product;
    },
    getProducts: async function (AppContext, _address) {
        let _pcount = await this.getProductCount(AppContext, _address);
        let _products = [];

        for (let i = 0; i < _pcount; i++) {
            let _p = new Promise(async (resolve, reject) => {
                let p = await this.getProduct(AppContext, _address, i)
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
    writeProduct: async function(AppContext, Connector, _name, _image, _description, _price, _qty, _active, _address){
        try {
            const signed = await AppContext.contract.populateTransaction["writeProduct"](
                _name, _image, _description, _price, _qty, _active, {
                from: _address
            });
            console.log({ signed });

            const signedResponse = await Connector.signTransaction({
                ...signed,
                gasLimit: 1500000
            });
            console.log({ signedResponse });
            const res = await Connector.sendTransaction(signed);
            console.log({ res });
        } catch (e) {
            console.error(e);
            return false;
        }
        return true;
    },
    editProduct: async function(AppContext, Connector,_index, _name, _image, _description, _price, _qty, _active, _address){
        try {
            const signed = await AppContext.contract.populateTransaction["editProduct"](
                _index, _name, _image, _description, _price, _qty, _active, {
                from: _address
            });
            console.log({ signed });

            const signedResponse = await Connector.signTransaction({
                ...signed,
                gasLimit: 1500000
            });
            console.log({ signedResponse });

            const res = await Connector.sendTransaction(signed);
            console.log({ res });

        } catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }
}

export default Products;