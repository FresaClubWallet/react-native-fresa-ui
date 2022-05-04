import React, { useState, useContext, useEffect, useRef } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
} from "react-native";
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'

import * as ImagePicker from 'expo-image-picker';
import { Formik, Form, Field } from 'formik';

import {SubNav, Header, AppContext, LoadingScreen, ErrorText, FormFields } from '../components';
import { storeFrontValidation } from "../helpers/validators";
import $t from 'i18n';

const MyStore = ({ navigation }) => {
    const connector = useWalletConnect();
    const appContext = useContext(AppContext);

    const [messageVendor, setMessageVendor] = useState("");
    const [storeName, setStoreName] = useState("");
    const [storeImage, setStoreImage] = useState("https://avatars.githubusercontent.com/u/91978140?s=200&v=4");
    const [storeDescription, setStoreDescription] = useState("");
    const [storeLat, setStoreLat] = useState(1000);
    const [storeLong, setStoreLong] = useState(2000);
    const [labelSubmit, setLabelSubmit] = useState("");
    const [isViewProduct, setIsViewProduct] = useState(false);
    const [storeLocation, setStoreLocation] = useState();
    const [image, setImage] = useState("");

    useEffect(()=>{
        readStoreFront();
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

    const readStoreFront = async () => {
        try {
            const readStoreFront = await appContext.contract.readStoreFront(appContext.address)

            // check store front if null address , vendor not add
            if (readStoreFront[0].toLowerCase() !== appContext.address.toLowerCase()){
                setMessageVendor("No Fresa Storefront was found at this address.")
                setLabelSubmit("Create")
            } else {
                setMessageVendor("")
                setLabelSubmit("Submit")
                setStoreName(readStoreFront[1])
                setStoreImage(readStoreFront[2])
                setStoreDescription(readStoreFront[3])
                setIsViewProduct(true)
            }
        } catch (e) {
            setMessageVendor("No Fresa Storefront was found at this address.")
            setLabelSubmit("Create")
            console.error(e);
        }
      };

    const writeStoreFront = async () => {
        try {
            const signed = await appContext.contract.populateTransaction["writeStoreFront"](
                storeName, storeImage, storeDescription, storeLat, storeLong, {
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
              readStoreFront();
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
            <SubNav balance={appContext.balance} address={appContext.address} isViewProduct={isViewProduct} navigation={navigation}></SubNav>
        )
    }

    // Display vendor store front
    function renderStoreFront() {
        return (
            <View>
                <View style={{ width: "100%", height: 30, textAlign: 'center' }}>
                    <Text style={{ marginLeft: 20, ...FONTS.body5, alignItems: "center" }}>{messageVendor}</Text>
                </View>
                <Formik
                    initialValues={{ storeName: storeName, storeDescription: storeDescription, storeLocation: storeLocation }}
                    onSubmit={writeStoreFront}
                    validationSchema={storeFrontValidation}
                >
                {({ handleSubmit }) => (
                    <View style={styles.container_input}>
                        <Field name="storeName" component={FormFields} placeholder={$t('input.storeName')} style={styles.input}/>
                        <Field name="storeDescription" component={FormFields} placeholder={$t('input.storeDescription')} 
                            style={[styles.input, styles.inputMulti]} numberOfLines={4} multiline/>
                        <Field name="storeLocation" component={FormFields} placeholder={$t('input.storeLocation')} style={styles.input}/>

                    {labelSubmit ?
                    (labelSubmit === "Create") ? 
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity
                                style={styles.buttonUploadImage}
                                onPress={pickImage}>
                                {image ? <Image source={{ uri: {image} }} style={{width: '100%', height: 200}} resizeMode='contain'></Image> :
                                <View>
                                    <Image source={images.imageUpload} style={styles.imageUpload} resizeMode='contain'></Image>
                                    <Text style={{color: COLORS.lightGray5, marginTop: 10}}>Upload Image</Text>
                                </View>}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSubmit}
                                >
                                <Text style={{color: 'white', ...FONTS.h3}}>{labelSubmit}</Text>
                            </TouchableOpacity>
                        </View>: 
                    <View><View style={{alignItems: "center"}}>
                            <TouchableOpacity
                                style={styles.buttonUploadImage}
                                onPress={pickImage}>
                                {image ? <Image source={{ uri: image }} style={{width: '100%', height: 200}} resizeMode='contain'></Image> :
                                <Image source={storeImage} style={{width: '100%', height: 200}}  resizeMode='contain'></Image>}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSubmit}
                                >
                                <Text style={{color: 'white', ...FONTS.h3}}>{labelSubmit}</Text>
                            </TouchableOpacity>
                    </View></View> : <View></View>}
                    </View>
                )}
            </Formik>
        </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderSubNav()}
            {messageVendor ? renderStoreFront() : <LoadingScreen/>}
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
    },
    imageUpload: {
        width: '100%',
        height: 80
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
    button: {
        marginTop: SIZES.padding * 2,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 1,
        backgroundColor: COLORS.blueMedium,
    },
    icon: {
        width: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    container_input: {
        width: "90%",
        alignSelf: "center",
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
    label: {
        color: "grey",
        fontSize: 12,
    },
})

export default MyStore