import React, { useEffect, useMemo, useState } from "react";
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
import { ethers } from "ethers";
import { Fresa__factory } from "../types";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'

import SubNav from "../components/SubNav";
import Header from "../components/Header";
import MyProductsSlider from "../components/dashboard/MyProductsSlider"
import MyOrders from "../components/dashboard/MyOrders";

const NETWORK = 'https://alfajores-forno.celo-testnet.org'; //test net
const cUSD_ADDRESS = "0x874069fa1eb16d44d622f2e0ca25eea172369bc1";
const CONTRACT_ADDRESS = "0xba2C8354c22F1C8033DF24669a6a0920869157B8";
const products = [];

const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(
        address.length - 4,
        address.length
    )}`;
}

const Home = ({ navigation }) => {
    const connector = useWalletConnect();
    const [balance, setBalance] = useState("Loading ...")

    const provider = useMemo(
        () => new ethers.providers.JsonRpcProvider(NETWORK),
        []
    );

    const contract = useMemo(
        () => new Fresa__factory().attach(CONTRACT_ADDRESS).connect(provider),
        [provider]
    );


    useEffect(async () => {
        const none = await provider.getBalance(cUSD_ADDRESS)
        let q = await ethers.utils.formatEther(none)
        setBalance((+q).toFixed(2))
        //callMethod();
    }, [balance])

    const callMethod = async () => {
        try {
            const readStoreFront = await contract.readProduct("0x9f3DD64c084C88e8E456e9BAdbc1ebbC624941be", 0)
            console.log(readStoreFront)
        } catch (e) {
            console.error(e);
        }
    };

    const getProduct = async (address, index) => {
        try {
            const readStoreFront = await contract.readProduct(address, index)
            console.log(readStoreFront)
        } catch (e) {
            console.error(e);
        }
    };

    const getProducts = async (address) => {
        try {
            // Get Product count from store.
            const productCount = await contract.readProductCount(address);
            products.splice(0, productCount);
            for(var i = 0;i < productCount; i++){
                const _p = await contract.readProduct(address, i)
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
            name: "Berry Nicee Strawberries",
            image: "https://i.ibb.co/dJRxXmM/0160fedb37f864637a7287b2e818c24a4.png",
            location: {
                latitude: 1.5347282806345879,
                longitude: 110.35632207358996,
            },
            menu: [
                {
                    menuId: 1,
                    name: "1 Basket of fresh strawberries.",
                    photo: images.strawberry_picking,
                    description: "A Basket of fresh strawberries picked for our fresaclub members.",
                    calories: 100,
                    price: 1
                }
            ]
        },
        {
            id: 2,
            name: "Berry Nicee Strawberries",
            image: "https://i.ibb.co/dJRxXmM/0160fedb37f864637a7287b2e818c24a4.png",
            location: {
                latitude: 1.5347282806345879,
                longitude: 110.35632207358996,
            },
            menu: [
                {
                    menuId: 1,
                    name: "1 Basket of fresh strawberries.",
                    photo: images.strawberry_picking,
                    description: "A Basket of fresh strawberries picked for our fresaclub members.",
                    calories: 100,
                    price: 1
                }
            ]
        },
        {
            id: 3,
            name: "Berry Nicee Strawberries",
            image: "https://i.ibb.co/dJRxXmM/0160fedb37f864637a7287b2e818c24a4.png",
            location: {
                latitude: 1.5347282806345879,
                longitude: 110.35632207358996,
            },
            menu: [
                {
                    menuId: 1,
                    name: "1 Basket of fresh strawberries.",
                    photo: images.strawberry_picking,
                    description: "A Basket of fresh strawberries picked for our fresaclub members.",
                    calories: 100,
                    price: 1
                }
            ]
        },
        {
            id: 4,
            name: "Berry Nicee Strawberries",
            image: "https://i.ibb.co/dJRxXmM/0160fedb37f864637a7287b2e818c24a4.png",
            location: {
                latitude: 1.5347282806345879,
                longitude: 110.35632207358996,
            },
            menu: [
                {
                    menuId: 1,
                    name: "1 Basket of fresh strawberries.",
                    photo: images.strawberry_picking,
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
                <MyProductsSlider products={categories}></MyProductsSlider>
            </View>
        )
    }

    // Used to display balance & wallet address.
    function renderSubNav() {
        return (
            <SubNav balance={balance} address={connector.accounts[0]}></SubNav>
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
    }
})

export default Home