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

import {SubNav, Header, AppContext, MyProductsSlider, LoadingScreen } from '../components';
import { Products } from "../fresa";

const products = [];

const Home = ({ navigation }) => {
    const connector = useWalletConnect();
    const appContext = useContext(AppContext);
    const [products, setProducts] = useState([])
    const [messageProduct, setMessageProduct] = useState("");
    const [loading, setLoading] = useState(0);

    useEffect(()=>{
        readProductCount();
    },[connector])

    const readProductCount = async () => {
        let _products = await Products.getProducts(appContext, appContext.address)
        if (_products.length == 0) {
            setMessageProduct("You have not yet added any products to your Fresa Storefront.")
        } else {
            setProducts(await Promise.all(_products))
        }
        setLoading(1)
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
            {loading ? renderProducts() : <LoadingScreen/>}
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