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
import MyProductsSlider from "../components/dashboard/MyProductsSlider"
import MyOrders from "../components/dashboard/MyOrders";
import AppContext from '../components/AppContext'; 

const products = [];

const Home = ({ navigation }) => {
    const appContext = useContext(AppContext);

    const callMethod = async () => {
        try {
            const readStoreFront = await appContext.contract.readProduct("0x9f3DD64c084C88e8E456e9BAdbc1ebbC624941be", 0)
            console.log(readStoreFront)
        } catch (e) {
            console.error(e);
        }
    };

    const getProduct = async (address, index) => {
        try {
            const readStoreFront = await appContext.contract.readProduct(address, index)
            console.log(readStoreFront)
        } catch (e) {
            console.error(e);
        }
    };

    const getProducts = async (address) => {
        try {
            // Get Product count from store.
            const productCount = await appContext.contract.readProductCount(address);
            products.splice(0, productCount);
            for(var i = 0;i < productCount; i++){
                const _p = await appContext.contract.readProduct(address, i)
                products.push(
                    _p
                )
            }
        } catch (e) {
            console.error(e);
        }
    };

    const categoryData = [
        {
            id: 1,
            name: "Salad",
            image: images.salad,
            location: {
                latitude: 1.5347282806345879,
                longitude: 110.35632207358996,
            },
            menu: [
                {
                    menuId: 1,
                    name: "Salad",
                    photo: images.salad,
                    description: "A Basket of fresh strawberries picked for our fresaclub members.",
                    calories: 100,
                    price: 1
                }
            ]
        },
        {
            id: 2,
            name: "Sandwich",
            image: images.salad,
            location: {
                latitude: 1.5347282806345879,
                longitude: 110.35632207358996,
            },
            menu: [
                {
                    menuId: 1,
                    name: "1 Basket of fresh strawberries.",
                    photo: images.salad,
                    description: "A Basket of fresh strawberries picked for our fresaclub members.",
                    calories: 100,
                    price: 1
                }
            ]
        },
        {
            id: 3,
            name: "Berry Nicee Strawberries",
            image: images.salad,
            location: {
                latitude: 1.5347282806345879,
                longitude: 110.35632207358996,
            },
            menu: [
                {
                    menuId: 1,
                    name: "1 Basket of fresh strawberries.",
                    photo: images.salad,
                    description: "A Basket of fresh strawberries picked for our fresaclub members.",
                    calories: 100,
                    price: 1
                }
            ]
        },
        {
            id: 4,
            name: "Berry Nicee Strawberries",
            image: images.salad,
            location: {
                latitude: 1.5347282806345879,
                longitude: 110.35632207358996,
            },
            menu: [
                {
                    menuId: 1,
                    name: "1 Basket of fresh strawberries.",
                    photo: images.salad,
                    description: "A Basket of fresh strawberries picked for our fresaclub members.",
                    calories: 100,
                    price: 1
                }
            ]
        }
    ]

    const [categories, setCategories] = React.useState(categoryData)

    function renderHeader() {
        return (
            <Header></Header>
        )
    }

    function renderProducts() {
        getProducts("0x9f3DD64c084C88e8E456e9BAdbc1ebbC624941be");
        return (
            <View>
                <MyProductsSlider products={categories} navigation={navigation}></MyProductsSlider>
            </View>
        )
    }

    // Used to display balance & wallet address.
    function renderSubNav() {
        return (
            <SubNav balance={appContext.balance} address={appContext.address}></SubNav>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderSubNav()}
            {renderProducts()}
            <MyOrders products={categories}></MyOrders>
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