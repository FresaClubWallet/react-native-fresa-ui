import React, { useEffect, useState, useContext } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    TextInput
} from "react-native";
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import {SubNav, Header, AppContext, ProductsList, LoadingScreen, FormFields } from '../components';
import { Products } from "../fresa";
import $t from 'i18n';
import { Formik, Field } from 'formik';
import { productValidation } from "../helpers/validators";
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

const Product = ({ navigation }) => {
    const connector = useWalletConnect();
    const appContext = useContext(AppContext);
    const [isVisible, setIsVisible] = useState(false);
    const [messageProduct, setMessageProduct] = useState("");
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(0);
    const [productName, setProductName] = useState()
    const [productImage, setProductImage] = useState("https://foodieandwine.com/wp-content/uploads/2020/05/CarneAsadaTacos.jpg")
    const [productDescription, setProductDescription] = useState("")
    const [productPrice, setProductPrice] = useState()
    const [productQty, setProductQty] = useState()
    const [productStatus, setProductStatus] = useState(true);
    const [productIndex, setProductIndex] = useState("");

    // Success
    const showToast = () => {
        Toast.show({
          type: 'success',
          text1: 'Successfully',
          text2: 'You have successfully updated 👋'
        });
      }

    // write or edit
    const submitProduct = async (data) => {
        if(typeof productIndex == 'number'){
            // edit
            await Products.editProduct(appContext, connector, productIndex, data.productName, 
                productImage, data.productDescription, data.productPrice, data.productQty, data.productStatus, appContext.address)
        } else {
            // write
            await Products.writeProduct(appContext, connector, data.productName, 
                productImage, data.productDescription, data.productPrice, data.productQty, data.productStatus, appContext.address)
        }

        setIsVisible(false)
        readProductCount();
        showToast();
        setProductIndex("") // clear 
    }

    useEffect(()=>{
        readProductCount();
    },[connector])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

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

    // Used to display balance & wallet address.
    function renderSubNav() {
        return (
            <SubNav balance={appContext.balance} address={appContext.address} navigation={navigation} isBackToStore={false}></SubNav>
        )
    }

    function renderProducts() {
        return (
            <ProductsList products={products} setProductIndex={setProductIndex} setIsVisible={setIsVisible} 
            setProductName={setProductName} setProductDescription={setProductDescription} setProductPrice={setProductPrice} 
            setProductQty={setProductQty} setProductStatus={setProductStatus}>
            </ProductsList>
        )
    }

    function ProductModal() {
        const radio_props = [
            {label: 'active', value: true },
            {label: 'deactive', value: false }
          ];
        return (
          <View>
            <Modal onRequestClose={() => setIsVisible(false)} transparent visible={isVisible}>
                <Formik
                        enableReinitialize
                        initialValues={{ productName: productName, productDescription: productDescription, productPrice: productPrice, productQty: productQty, productStatus: productStatus }}
                        onSubmit={submitProduct}
                        validationSchema={productValidation}
                    >
                    {({ handleSubmit }) => (
                        <View style={styles.container_input}>
                            <Field name="productName" component={FormFields} placeholder={$t('input.productName')} style={styles.input}/>
                            <Field name="productDescription" component={FormFields} placeholder={$t('input.productDescription')} 
                                style={[styles.input, styles.inputMulti]} numberOfLines={4} multiline/>
                            <View style={{flexDirection: 'row', flexWrap: 'nowrap', justifyContent:'space-between', width: '90%'}}>
                                <Field name="productPrice" component={FormFields} placeholder={$t('input.productPrice')} 
                                    style={[styles.input, {width: "80%", alignSelf:'flex-start'}]}/>
                                <Field name="productQty" component={FormFields} placeholder={$t('input.productQty')} 
                                    style={[styles.input, , {width: "80%", alignSelf:'flex-start'}]}/>
                            </View>
                            <TouchableOpacity
                                style={styles.buttonUploadImage}
                                onPress={pickImage}>
                                {productImage ? <Image source={{ uri: {productImage} }} style={{width: '100%', height: 200}} resizeMode='contain'></Image> :
                                <View>
                                    <Image source={productImage.imageUpload} style={styles.imageUpload} resizeMode='contain'></Image>
                                    <Text style={{color: COLORS.lightGray5, marginTop: 10}}>Upload Image</Text>
                                </View>}
                            </TouchableOpacity>
                            <View>
                                <RadioForm
                                    style={{justifyContent:'space-between', padding: 15}}
                                    radio_props={radio_props}
                                    initial={0}
                                    formHorizontal={true}
                                    animation={true}
                                    value={productStatus}
                                    onPress={(value) => setProductStatus(value)}
                                />
                            </View>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent:'space-between', direction: "rtl", padding: 15}}>
                                <TouchableOpacity
                                    style={styles.buttonModalAdd}
                                    onPress={handleSubmit}
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
                    )}
                </Formik>
            </Modal>
          </View>
        );
      }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderSubNav()}
            <Text style={{ color: "#767070", alignItems: "center" }}>{messageProduct}</Text>
            {loading ? renderProducts() : <LoadingScreen/>}

            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.touchableOpacityStyle}
                onPress={() => setIsVisible(true)}>
                <Image
                    source={icons.add_product}
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
        marginBottom: 20,
        marginTop: 30,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        borderRadius: 10,
        width: "90%",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 2,
        shadowRadius: 2,
      },
    label: {
        color: "grey",
        fontSize: 12,
    },
    input: {
        fontSize: 13,
        height: 45,
        marginTop: 20,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 10,
        width: "100%",
        alignSelf: "center",
        paddingHorizontal: 10,
        paddingVertical:10
    },
    inputMulti: {
        height: 85,
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
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 20,
        elevation: 1,
        backgroundColor: COLORS.darkgray,
    },
    buttonModalAdd: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 20,
        elevation: 1,
        backgroundColor: COLORS.pink,
    },
    buttonUploadImage: {
        marginTop: SIZES.padding,
        width: 300,
        height: 200,
        backgroundColor: COLORS.grayMedium2,
        borderRadius: 30,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: COLORS.black,
        flexDirection: 'column', 
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageUpload: {
        width: '100%',
        height: 80
    },
})

export default Product