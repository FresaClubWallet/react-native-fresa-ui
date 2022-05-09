/* Need to pass appContext & connector & address
Because hooks need to call inside body of main function not here
*/
const Storefront = {
    getStorefrontExists: async function (_address) {
        const _exists = await AppContext.contract.readStoreFrontExisits(AppContext.address);
        return _exists;
    },
    getStorefrontActive: async function (_address){
        // TODO: Make this call public within the contract.
    },
    getStorefront: async function(AppContext, _address){
        try {
            const _storefront = await AppContext.contract.readStoreFront(_address);
            return _storefront;
        } catch (e) {
            return []
        }
    },
    // TODO: have bug can't write
    writeStorefront: async function(AppContext, Connector, _storeName, _storeImage, _storeDescription, _storeLat, _storeLong, _active, _address){
        try {
            const signed = await AppContext.contract.populateTransaction["writeStoreFront"](
                _storeName, _storeImage, _storeDescription, _storeLat, _storeLong, _active, {
                    from: _address
                });    
            const signedResponse = await Connector.signTransaction({
            ...signed,
            gasLimit: 1500000
            });
            const res = await Connector.sendTransaction(signed);
        }catch(e){
            console.log(e)
        }
    }
}

export default Storefront;