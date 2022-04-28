import React, { useEffect, useState, useContext } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from "react-native";
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import { icons, images, SIZES, COLORS, FONTS } from '../constants'

import SubNav from "../components/SubNav";
import Header from "../components/Header";
import MyProductsSlider from "../components/dashboard/MyProductsSlider"
import MyOrders from "../components/dashboard/MyOrders";
import AppContext from '../components/AppContext'; 

const products = [];

const Home = ({ navigation }) => {
    const connector = useWalletConnect();
    const appContext = useContext(AppContext);
    const [products, setProducts] = useState([])
    const [messageProduct, setMessageProduct] = useState("");

    useEffect(()=>{
        readProductCount();
    },[connector])

    const readProductCount = async () => {
        try {    
            const readProductCount = await appContext.contract.readProductCount(appContext.address);
            const _productsLength = await readProductCount.toString();
            console.log("Product count" + _productsLength);

            if (_productsLength == 0) {
                setMessageProduct("You have not yet added any products to your Fresa Storefront.")
            } else {
                const _products = []
                for (let i = 0; i < _productsLength; i++) {
                    let _product = new Promise(async (resolve, reject) => {
                    let p = await appContext.contract.readProduct(appContext.address, i)
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
                    _products.push(_product)
                }
                setProducts(await Promise.all(_products));
            }
        } catch (e) {
            //setMessageProduct(e.errorArgs[0]);
            //console.error(e);
        }
      };

    function renderHeader() {
        return (
            <Header navigation={navigation}></Header>
        )
    }

    function renderProducts() {
        return (
            <MyProductsSlider products={products} navigation={navigation}></MyProductsSlider>
        )
    }

    // Used to display balance & wallet address.
    function renderSubNav() {
        return (
            <SubNav balance={appContext.balance} address={appContext.address} ></SubNav>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderSubNav()}
            {products.length >0 ? renderProducts() : <View></View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default Home