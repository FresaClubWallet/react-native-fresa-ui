import React, { useEffect, useState, useContext } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Button
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'

import SubNav from "../components/SubNav";
import Header from "../components/Header";
import MyProductsSlider from "../components/dashboard/MyProductsSlider"
import MyOrders from "../components/dashboard/MyOrders";
import AppContext from '../components/AppContext'; 

const products = [];

const ProductDetail = ({ navigation }) => {
    const appContext = useContext(AppContext);

    function renderHeader() {
        return (
            <Header></Header>
        )
    }

    // Used to display balance & wallet address.
    function renderSubNav() {
        return (
            <SubNav balance={appContext.balance} address={appContext.address} isBackToStore={true} navigation={navigation}></SubNav>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderSubNav()}
            <View style={styles.bodyPreviewProductDetail}>
                <Text style={styles.titleProductDetail}>Tacos de Tijuana </Text>
                <Image source={images.taco} style={styles.imageProductDetail} resizeMode='contain'>
                </Image>
            </View>
            <View style={styles.bodyBottomProductDetail}>
                <View style={styles.leftBodyBottomProductDetail}>
                    <Text style={styles.titleProductDetail}>Carne Asada Taco</Text>
                </View>
                <View style={styles.rightBodyBottomProductDetail}>
                    <TouchableOpacity style={styles.PlusStyle}>
                        <Image source={icons.plus} style={styles.iconPlus}></Image>
                    </TouchableOpacity>
                    <Text style={{...FONTS.h2}}>1</Text>
                    <TouchableOpacity style={styles.PlusStyle}>
                        <Image source={icons.minus} style={styles.iconMinus}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.description}>Housemade tortilla, Carne Asada diced onions and cilantro.</Text>
            <View style={styles.bodyWallet}>
                <Text style={{...FONTS.h5, marginRight: 2}}>Wallet: </Text>
                <Text style={{...FONTS.h5, color: '#BABABA', marginRight: 6}}>0xu46slr0sd3ior5guwa...739h3</Text>
                <Image source={icons.copy} style={styles.iconCopy}></Image>
            </View>
            <View style={styles.bodyOrder}>
                <View style={styles.leftBodyOrder}>
                    <Text style={{...FONTS.body4}}>Total Price </Text>
                    <Text style={{...FONTS.h4}}>$2.75 cUSD</Text>

                </View>
                <View style={styles.rightBodyOrder}>
                    <TouchableOpacity
                        style={styles.buttonFavourite}>
                        <Image source={icons.favourite} style={styles.iconFavourite}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonOrder}>
                            <Text style={{color: 'white', ...FONTS.h3, marginLeft: 10, marginRight: 10}}>Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    bodyPreviewProductDetail: {
        flexDirection: 'col',
        alignItems: 'center',
        paddingLeft: SIZES.padding * 2,
        paddingRight: SIZES.padding * 2,
        paddingBottom: SIZES.padding 
    },
    titleProductDetail: {
        ...FONTS.h2,
    },
    imageProductDetail: {
        width: '100%',
        height: 300,       
        alignSelf: 'center' 
    },
    bodyBottomProductDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: SIZES.padding * 2,
        paddingRight: SIZES.padding * 2
    },
    iconPlus: {
        width: 14,
        height: 14
    },  
    iconMinus: {
        width: 12,
        height: 4
    }, 
    iconCopy: {
        width: 14,
        height: 17
    },
    iconFavourite: {
        width: 19,
        height: 16
    },
    PlusStyle: {
        backgroundColor: COLORS.pink,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 20,
        width: 20,
        margin: 5,
    },
    leftBodyBottomProductDetail: {
        flex: 1,
    },
    rightBodyBottomProductDetail: {
        flexDirection: 'row',
        alignItems: 'right',
        justifyContent: 'right'
    },
    description: {
        ...FONTS.body3,
        paddingLeft: SIZES.padding * 2,
        paddingRight: SIZES.padding * 2,
        paddingTop: SIZES.padding,
        paddingBottom: SIZES.padding * 5
    },
    bodyWallet: {
        flexDirection: 'row',
        paddingLeft: SIZES.padding * 2,
        paddingRight: SIZES.padding * 2,
        paddingBottom: SIZES.padding
    },
    bodyOrder: {
        flexDirection: 'row',
        paddingLeft: SIZES.padding * 2,
        paddingRight: SIZES.padding * 2
    },
    leftBodyOrder: {
        flex: 1,
    },
    rightBodyOrder: {
        flexDirection: 'row',
        alignItems: 'right',
        justifyContent: 'right'
    },
    buttonFavourite: {
        flex: 3,
        flexDirection: 'row', flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        height: 41,
        width: 41,
        margin: 5,
        backgroundColor: COLORS.grayMedium,
        marginRight: 10
    },
    buttonOrder: {
        flex: 6,
        flexDirection: 'row', flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 30,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 2,
        shadowRadius: 2,
        backgroundColor: COLORS.pink,
    },
})

export default ProductDetail