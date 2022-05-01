import { useContext } from "react";
import AppContext from "../components/AppContext";

const Metrics = {
    getAppContext: function () {
        return useContext(AppContext);
    },
    getFresaStoreCount: async function(){
        const _storecount = await Metrics.getAppContext().contract.readFresaStoreCount();
        return _storecount;
    },
    getFresaProductCount: async function(){
        const _productCount = await Metrics.getAppContext().contract.readFresaProductCount();
        return _productCount;
    },
    readFresaSaleCount: async function(){
        const _saleCount = await Metrics.getAppContext().contract.readFresaSaleCount();
        return _saleCount;
    }
}

export default Metrics;