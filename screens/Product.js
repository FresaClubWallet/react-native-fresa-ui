import React, { useEffect, useState, useContext } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    Animated,
    TextInput
} from "react-native";
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import SubNav from "../components/SubNav";
import Header from "../components/Header";
import AppContext from '../components/AppContext'; 
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import ProductsList from "../components/products/ProductsList"

const Product = ({ navigation }) => {
    const connector = useWalletConnect();
    const appContext = useContext(AppContext);
    const [isVisible, setIsVisible] = useState(false);
    const [messageProduct, setMessageProduct] = useState("");
    const [products, setProducts] = useState([])

    useEffect(()=>{
        readProductCount();
    },[connector])

    const readProductCount = async () => {
        try {    
            const readProductCount = await appContext.contract.readProductCount(appContext.address);
            const _productsLength = await readProductCount.toString();

            if (_productsLength == 0) {
                setMessageProduct("You have not yet added any products to your Fresa Storefront.")
            } else {
                const _products = []
                for (let i = 0; i < _productsLength; i++) {
                    let _product = new Promise(async (resolve, reject) => {
                    let p = await appContext.contract.readProduct(appContext.address, i)
                    resolve({
                        index: i,
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
            }
        } catch (e) {
            setMessageProduct(e.errorArgs[0])
            console.error(e);
        }
      };

    const writeProduct = async (_name, _image, _description, _price, _active) => {
        try {
            const signed = await appContext.contract.populateTransaction["writeProduct"](
                _name, _image, _description, _price, _active, {
                    from: appContext.address
                });
        
              console.log({ signed });
        
              const signedResponse = await connector.signTransaction({
                ...signed,
                gasLimit: 1500000
              });
              console.log({ signedResponse });
        
              const res = await connector.sendTransaction(signed);
              console.log({ res });
              setIsVisible(false)
              readProductCount();

            } catch (e) {
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
            <SubNav balance={appContext.balance} address={appContext.address} navigation={navigation} isBackToStore={true}></SubNav>
        )
    }

    function renderProducts() {
        return (
            <ProductsList products={products}></ProductsList>
        )
    }

    function ProductModal() {
        const [name, setName] = useState("")
        const [image, setImage] = useState("")
        const [description, setDescription] = useState("")
        const [price, setPrice] = useState("")
        const [status, setStatus] = useState(true);

        const radio_props = [
            {label: 'active', value: true },
            {label: 'deactive', value: false }
          ];
        return (
          <View>
            <Modal onRequestClose={() => setIsVisible(false)} transparent visible={isVisible}>
              <View style={styles.containeraltModal}>
                <View style={styles.container_input}>
                    <Animated.View style={[styles.animatedStyle]}>
                        <Text style={styles.label}>Your product name</Text>
                    </Animated.View>
                    <TextInput
                        autoCapitalize={"none"}
                        style={styles.input}
                        editable={true}
                        value={name}
                        onChangeText={setName}
                        blurOnSubmit
                    />
                </View>
                <View style={styles.container_input}>
                    <Animated.View style={[styles.animatedStyle]}>
                        <Text style={styles.label}>Image url</Text>
                    </Animated.View>
                    <TextInput
                        autoCapitalize={"none"}
                        style={styles.input}
                        editable={true}
                        value={image}
                        onChangeText={setImage}
                        blurOnSubmit
                    />
                </View>
                <View style={styles.container_input}>
                    <Animated.View style={[styles.animatedStyle]}>
                        <Text style={styles.label}>Description</Text>
                    </Animated.View>
                    <TextInput
                        autoCapitalize={"none"}
                        style={styles.input}
                        editable={true}
                        value={description}
                        onChangeText={setDescription}
                        blurOnSubmit
                    />
                </View>
                <View style={styles.container_input}>
                    <Animated.View style={[styles.animatedStyle]}>
                        <Text style={styles.label}>Price</Text>
                    </Animated.View>
                    <TextInput
                        autoCapitalize={"none"}
                        style={styles.input}
                        editable={true}
                        value={price}
                        onChangeText={setPrice}
                        blurOnSubmit
                    />
                </View>
                <View>
                    <RadioForm
                        style={{justifyContent:'space-between', padding: 15}}
                        radio_props={radio_props}
                        initial={0}
                        formHorizontal={true}
                        animation={true}
                        value={status}
                        onPress={(value) => setStatus(value)}
                    />
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent:'space-between', direction: "rtl", padding: 15}}>
                    <TouchableOpacity
                        style={styles.buttonModalAdd}
                        onPress={() => writeProduct(name, image, description, price, status)}
                        >
                        <Text style={{color: 'white', ...FONTS.h3}}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonModalClose}
                        onPress={() => setIsVisible(false)}
                        >
                        <Text style={{color: 'white', ...FONTS.h3}}>Close</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        );
      }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderSubNav()}
            <Text style={{ color: "#767070", alignItems: "center" }}>{messageProduct}</Text>
            {renderProducts()}
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.touchableOpacityStyle}
                onPress={() => setIsVisible(true)}>
                <Image
                    source={{
                    uri:
                        icons.add_product,
                    }}
                    style={styles.floatingButtonStyle}
                />
            </TouchableOpacity>
            <ProductModal/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: COLORS.white
    },
    container_input: {
        marginBottom: 10,
        marginTop: 20,
        backgroundColor: "#fff",
        paddingTop: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#bdbdbd",
        borderRadius: 2,
        width: "90%",
        alignSelf: "center",
      },
    label: {
        color: "grey",
        fontSize: 12,
    },
    input: {
        fontSize: 13,
        height: 35,
        // outlineStyle: 'none'
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
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 10,
        backgroundColor: COLORS.blue,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 50,
        shadowRadius: 5,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
        backgroundColor: COLORS.transparent
    },
    containerModal: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    containeraltModal: {
        backgroundColor: "white",
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#bdbdbd",
        height: 600,
        width: 300,
        alignSelf: "center",
        padding: 30,
        margin: 'auto'
    },
    buttonModalClose: {
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 1,
        backgroundColor: COLORS.darkgray,
    },
    buttonModalAdd: {
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 1,
        backgroundColor: COLORS.pink,
    },
})

export default Product