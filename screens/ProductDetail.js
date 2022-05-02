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
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import {SubNav, Header, AppContext } from '../components';


const ProductDetail = ({ navigation, route }) => {
    const connector = useWalletConnect();
    const appContext = useContext(AppContext);

    const [products, setProducts] = useState([])

    const [storeName, setStoreName] = useState("");
    const [storeImage, setStoreImage] = useState("https://avatars.githubusercontent.com/u/91978140?s=200&v=4");
    const [storeDescription, setStoreDescription] = useState("");
    const [productCount, setProductCount] = useState(0);



    const [image, setImage] = useState("");

    useEffect(() => {
        readStoreFront();
    }, [connector])


    function trunc(text) {
        return text.length > 15 ? `${text.substr(0, 25)}...` : text;
    }

    const readStoreFront = async () => {
        try {
            const _readStoreFront = await appContext.contract.readStoreFront(route.params.storefront);

            console.log(_readStoreFront);
            setStoreName(_readStoreFront[1]);
            setStoreImage(_readStoreFront[2]);
            setStoreDescription(_readStoreFront[3]);
            setProductCount(_readStoreFront[7].toString());

            readProducts();


        } catch (e) {
            console.error(e);
        }
    };

    const readProducts = async () => {
        try {
            const _products = []
            for (let i = 0; i < productCount; i++) {
                let _product = new Promise(async (resolve, reject) => {
                    let p = await appContext.contract.readProduct(route.params.storefront, i)
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
            setProducts(await Promise.all(_products))
        } catch (e) {
            // setMessageProduct(e.errorArgs[0])
            console.error(e);
        }
    };


    function renderHeader() {
        return (
            <Header navigation={navigation}></Header>
        )
    }

    // Used to display balance & wallet address.
    function renderSubNav() {
        return (
            <SubNav balance={appContext.balance} address={appContext.address} isBackToDashboard={true} navigation={navigation}></SubNav>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderSubNav()}
            <View style={styles.bodyPreviewProductDetail}>
                <Text style={styles.titleProductDetail}>{storeName}</Text>
                <Image source={{ uri: storeImage }} style={styles.imageProductDetail} resizeMode='contain'>
                </Image>
                <View>
                    <Text style={styles.descriptionProductDetail}>
                        {storeDescription}
                    </Text>
                </View>
            </View>

            <View style={styles.TouchElement}>
                <FlatList
                    data={products}
                    alwaysBounceVertical={true}
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item.index} style={styles.ItemTouchElement}>
                            <View style={{ flexDirection: 'row',alignItems:"center", flexWrap: 'wrap', marginLeft: 10 }}>
                                <Image
                                    resizeMode="cover"
                                    source={item.image ? { uri: item.image } : images.imageUpload}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        alignItems:"center",
                                        flexDirection: "row"
                                    }}
                                />
                                <View style={{ flexWrap: 'wrap', flexDirection: 'column', marginLeft: 5}}>
                                    <Text style={{ ...FONTS.h5, paddingLeft: 10 }}>{item.name} - <Text style={{ ...FONTS.body6 }}>${item.price} cUSD</Text></Text>
                                    <Text numberOfLines={3} style={{ ...FONTS.body6, paddingLeft: 10, width: 250 }}>{item.description}</Text>
                                </View>
                               
                            </View>
                        </TouchableOpacity>
                    )}
                />

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
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: SIZES.padding * 2,
        paddingRight: SIZES.padding * 2,
        paddingBottom: SIZES.padding
    },
    titleProductDetail: {
        ...FONTS.h3,
    },
    descriptionProductDetail: {
        ...FONTS.body5,
        textAlign: "center"
    },
    subProductDetail: {
        ...FONTS.body5,
    },
    imageProductDetail: {
        width: '90%',
        height: 200,
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
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
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
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
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
    ItemTouchElement:{
        marginBottom: 10
    }
})

export default ProductDetail