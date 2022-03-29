import React from "react";
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

const Home = ({ navigation }) => {

    // Dummy Datas

    const initialCurrentLocation = {
        streetName: "Fresa",
        gps: {
            latitude: 1.5496614931250685,
            longitude: 110.36381866919922
        }
    }

    const orderData = [
        {
            id: 1,
            image: "https://i.ibb.co/dJRxXmM/060fedb37f864637a7287b2e818c24a4.png",
            address: "",
            vendor_title: "Berry Nice Strawberries",
            vendor_description: "Fresh Strawberries",
            total_price: 100,
            isVendorTx: true
        },
        {
            id: 2,
            address: "",
            image: "https://i.ibb.co/dJRxXmM/060fedb37f864637a7287b2e818c24a4.png",
            vendor_title: "Berry Nice Strawberries",
            vendor_description: "Fresh Strawberries",
            total_price: 200,
            isVendorTx: false
        },
        {
            id: 3,
            address: "",
            image: "https://i.ibb.co/dJRxXmM/060fedb37f864637a7287b2e818c24a4.png",
            vendor_title: "Berry Nice Strawberries",
            vendor_description: "Fresh Strawberries",
            total_price: 100,
            isVendorTx: false
        },
        {
            id: 4,
            address: "",
            image: "https://i.ibb.co/dJRxXmM/060fedb37f864637a7287b2e818c24a4.png",
            vendor_title: "Berry Nice Strawberries",
            vendor_description: "Fresh Strawberries",
            total_price: 700,
            isVendorTx: false
        },
        {
            id: 4,
            address: "",
            image: "https://i.ibb.co/dJRxXmM/060fedb37f864637a7287b2e818c24a4.png",
            vendor_title: "Berry Nice Strawberries",
            vendor_description: "Fresh Strawberries",
            total_price: 700,
            isVendorTx: false
        },
        {
            id: 4,
            address: "",
            image: "https://i.ibb.co/dJRxXmM/060fedb37f864637a7287b2e818c24a4.png",
            vendor_title: "Berry Nice Strawberries",
            vendor_description: "Fresh Strawberries",
            total_price: 700,
            isVendorTx: false
        },
        {
            id: 4,
            address: "",
            image: "https://i.ibb.co/dJRxXmM/060fedb37f864637a7287b2e818c24a4.png",
            vendor_title: "Berry Nice Strawberries",
            vendor_description: "Fresh Strawberries",
            total_price: 700,
            isVendorTx: false
        },
    ];

    const categoryData = [
        {
            id: 1,
            name: "Berry Nicee Strawberries",
            rating: 4.8,
            categories: [5, 7],
            priceRating: affordable,
            photo: images.burger_restaurant_1,
            duration: "30 - 45 min",
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
            id: 1,
            name: "Berry Nicee Strawberries",
            rating: 4.8,
            categories: [5, 7],
            priceRating: affordable,
            photo: images.burger_restaurant_1,
            duration: "30 - 45 min",
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
            id: 1,
            name: "Berry Nicee Strawberries",
            rating: 4.8,
            categories: [5, 7],
            priceRating: affordable,
            photo: images.burger_restaurant_1,
            duration: "30 - 45 min",
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

    // price rating
    const affordable = 1
    const fairPrice = 2
    const expensive = 3

    const restaurantData = [
        {
            id: 1,
            name: "Berry Nicee Strawberries",
            rating: 4.8,
            categories: [5, 7],
            priceRating: affordable,
            image: "https://i.ibb.co/dJRxXmM/060fedb37f864637a7287b2e818c24a4.png",
            duration: "30 - 45 min",
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
    const [orders, setOrders] = React.useState(orderData)
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)




    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 80 }}>


                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#e71963", paddingBottom: 10, paddingTop: 10 }}>

                </View>


            </View>
        )
    }

    function renderFavourites() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                    onPress={() => navigation.navigate("Restaurant", {
                        item,
                        currentLocation
                    })}
                >
                    <View
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: COLORS.lightGray
                        }}
                    >
                        <Image
                            source={images.berrynice}
                            resizeMode="contain"
                            style={{
                                width: 90,
                                height: 90
                            }}
                        />
                    </View>

                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: COLORS.black,
                            ...FONTS.body5
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ padding: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h3 }}>My favourites</Text>
                <TouchableOpacity>
                    <FlatList
                        data={categories}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderOrderList() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity style={{ backgroundColor: COLORS.white, borderRadius: SIZES.radius,marginBottom: 10 }}>
                    <View style={{ padding: SIZES.padding * 2, flexDirection: 'row', flexWrap: 'wrap'  }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginRight: 10, width:40}}>
                            <Image
                                source={images.berrynice}
                                resizeMode="contain"
                                style={{
                                    width: 40,
                                    height: 40
                                }}
                            />
                        </View>
                        <View>
                            <Text style={{ ...FONTS.h4 }}>{item.vendor_title}</Text>
                            <Text style={{ ...FONTS.p }}>{item.vendor_description} - ${item.total_price}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ padding: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h3 }}>Recent Orders</Text>

                <FlatList
                    data={orders}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFavourites()}
            {renderOrderList()}
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