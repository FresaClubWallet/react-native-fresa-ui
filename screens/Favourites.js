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
import { icons, images, SIZES, COLORS, FONTS } from '../constants'

import SubNav from "../components/SubNav";
import Header from "../components/Header";
import AppContext from '../components/AppContext';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { BigNumber } from "ethers";

import { Storefront } from "../fresa";


var favouriteCount = 0;
var favourites = [];

const Favourites = ({ navigation }) => {
    const appContext = useContext(AppContext);
    const connector = useWalletConnect();


    const editProduct = async (_index, _name, _image, _description, _price, _qty, _active) => {
        try {
            const signed = await appContext.contract.populateTransaction["editProduct"](
                _index, _name, _image, _description, BigNumber.from(_price), _qty, _active, {
                from: appContext.address
            });
            const signedResponse = await connector.signTransaction({
                ...signed,
                gasLimit: 1500000
            });
            const res = await connector.sendTransaction(signed);
        } catch (e) {
            console.error(e);
        }
    };
    const getFavouriteCount = async () => {
        try {
            const fav = "0xc65A40bA070Dcb283774Fb092772A9cBAA68Cd29";

            favouriteCount = await appContext.contract.readProductCount(appContext.address);

            for (var i = 0; i < favouriteCount; i++) {
                console.log(i);
            }




            console.log(favouriteCount.toString());
        } catch (e) {
            console.error(e);
        }
    };


    function renderHeader() {
        return (
            <Header navigation={navigation}></Header>
        )
    }
    function renderSubNav() {
        return (
            <SubNav balance={appContext.balance} address={appContext.address}></SubNav>
        )
    }
    function renderFavourites() {
        return (
            <Text>Hello</Text>
        )
    }
    return (
        Storefront.getStorefront(appContext.address),
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFavourites()}
            {renderSubNav()}
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

export default Favourites