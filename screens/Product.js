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


const Product = ({ navigation }) => {
    const connector = useWalletConnect();
    const appContext = useContext(AppContext);

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#e71963", paddingBottom: 10, paddingTop: 10 }}>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.touchableOpacityStyle}>
                <Image
                    source={{
                    uri:
                        icons.add_product,
                    }}
                    style={styles.floatingButtonStyle}
                />
                </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
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
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 60,
        backgroundColor: COLORS.pink,
        borderRadius: 100,
      },
      floatingButtonStyle: {
        resizeMode: 'contain',
        width: 40,
        height: 40,
        backgroundColor: COLORS.transparent
      }
})

export default Product