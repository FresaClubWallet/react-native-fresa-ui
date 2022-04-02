import React, { useEffect, useState, useContext } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
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
                <View style={{ flex: 1, alignItems: 'left', justifyContent: 'left', 
                    backgroundColor: "#e71963", paddingBottom: 10, paddingTop: 10 }}>
                    <View style={{height: 34, width: 85,  marginLeft: 10}}>
                        <TouchableOpacity
                            style={styles.button_back}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={{color: 'black', ...FONTS.h4}}>Back</Text>
                        </TouchableOpacity>
                    </View>
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
    button_back: {
        paddingVertical: 3,
        paddingHorizontal: 20,
        borderRadius: 15,
        elevation: 1,
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
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
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