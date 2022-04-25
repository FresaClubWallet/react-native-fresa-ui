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
import AppContext from '../components/AppContext'; 
import SubNav from "../components/SubNav";
import Header from "../components/Header";
import * as ImagePicker from 'expo-image-picker';


const MyStore = ({ navigation }) => {
    const connector = useWalletConnect();
    const appContext = useContext(AppContext);
    const moveText = useRef(new Animated.Value(0)).current;

    const [messageVendor, setMessageVendor] = useState("");
    const [storeName, setStoreName] = useState(null);
    const [storeImage, setStoreImage] = useState("https://avatars.githubusercontent.com/u/91978140?s=200&v=4");
    const [storeDescription, setStoreDescription] = useState(null);
    const [storeLat, setStoreLat] = useState(1000);
    const [storeLong, setStoreLong] = useState(2000);
    const [labelSubmit, setLabelSubmit] = useState("");
    const [isViewProduct, setIsViewProduct] = useState(false);
    const [storeLocation, setStoreLocation] = useState();
    const [image, setImage] = useState(null);

    useEffect(()=>{
        readStoreFront();
    },[connector])

    const onFocusHandler = (value) => {
        if (value !== "") {
          moveTextTop();
        }
      };
    
    const onBlurHandler = (value) => {
    if (value === "") {
        moveTextBottom();
    }
    };

    const moveTextTop = () => {
    Animated.timing(moveText, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
    }).start();
    };

    const moveTextBottom = () => {
        Animated.timing(moveText, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      };

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

    const yVal = moveText.interpolate({
        inputRange: [0, 1],
        outputRange: [4, -20],
      });
    
      const animStyle = {
        transform: [
          {
            translateY: yVal,
          },
        ],
      };

    const readStoreFront = async () => {
        try {    
            const readStoreFront = await appContext.contract.readStoreFront(appContext.address)
            // check store front if null address , vendor not add
            if (readStoreFront[0].toLowerCase() !== appContext.address.toLowerCase()){
                setMessageVendor("You don't have store front yet!")
                setLabelSubmit("Create")
            } else {
                setMessageVendor("")
                setLabelSubmit("Submit")
                setStoreName(readStoreFront[1])
                setStoreDescription(readStoreFront[3])
                setIsViewProduct(true)
            }
        } catch (e) {
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
            <Header></Header>
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
            <>
                <View style={{ width: "100%", height: 30, textAlign: 'center' }}>
                    <Text style={{ marginLeft: 20, ...FONTS.body5, alignItems: "center" }}>{messageVendor}</Text>
                </View>
                <View>
                <View style={styles.container_input}>
                    <Animated.View style={[styles.animatedStyle, animStyle]}>
                        <Text style={styles.label}>Store name</Text>
                    </Animated.View>
                    <TextInput
                        autoCapitalize={"none"}
                        style={styles.input}
                        value={storeName}
                        onChangeText={setStoreName}
                        editable={true}
                        onFocus={onFocusHandler(storeName)}
                        onBlur={onBlurHandler(storeName)}
                        blurOnSubmit
                    />
                </View>

                {/* <View style={styles.container_input}>
                    <Animated.View style={[styles.animatedStyle, animStyle]}>
                        <Text style={styles.label}>Image Url</Text>
                    </Animated.View>
                    <TextInput
                        autoCapitalize={"none"}
                        style={styles.input}
                        value={storeImage}
                        onChangeText={setStoreImage}
                        editable={true}
                        onFocus={onFocusHandler(storeImage)}
                        onBlur={onBlurHandler(storeImage)}
                        blurOnSubmit
                    />
                </View> */}

                <View style={styles.container_input}>
                    <Animated.View style={[styles.animatedStyle, animStyle]}>
                        <Text style={styles.label}>Store description</Text>
                    </Animated.View>
                    <TextInput
                        autoCapitalize={"none"}
                        style={styles.input}
                        value={storeDescription}
                        onChangeText={setStoreDescription}
                        editable={true}
                        onFocus={onFocusHandler(storeDescription)}
                        onBlur={onBlurHandler(storeDescription)}
                        blurOnSubmit
                    />
                </View>

                <View style={styles.container_input}>
                    <Animated.View style={[styles.animatedStyle, animStyle]}>
                        <Text style={styles.label}>Location</Text>
                    </Animated.View>
                    <TextInput
                        autoCapitalize={"none"}
                        style={styles.input}
                        value={storeLocation}
                        onChangeText={setStoreLocation}
                        editable={true}
                        onFocus={onFocusHandler(storeLocation)}
                        onBlur={onBlurHandler(storeLocation)}
                        blurOnSubmit
                    />
                </View>

                {/* <View style={styles.container_input}>
                    <Animated.View style={[styles.animatedStyle, animStyle]}>
                        <Text style={styles.label}>Store latitude</Text>
                    </Animated.View>
                    <TextInput
                        autoCapitalize={"none"}
                        style={styles.input}
                        value={storeLat}
                        onChangeText={setStoreLat}
                        editable={true}
                        onFocus={onFocusHandler(storeLat)}
                        onBlur={onBlurHandler(storeLat)}
                        blurOnSubmit
                    />
                </View>

                <View style={styles.container_input}>
                    <Animated.View style={[styles.animatedStyle, animStyle]}>
                        <Text style={styles.label}>Store longitude</Text>
                    </Animated.View>
                    <TextInput
                        autoCapitalize={"none"}
                        style={styles.input}
                        value={storeLong}
                        onChangeText={setStoreLong}
                        editable={true}
                        onFocus={onFocusHandler(storeLong)}
                        onBlur={onBlurHandler(storeLong)}
                        blurOnSubmit
                    />
                </View> */}
                {labelSubmit ?
                (labelSubmit === "Create") ? 
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity
                            style={styles.buttonUploadImage}
                            onPress={pickImage}>
                            {image ? <Image source={{ uri: image }} style={{width: '100%', height: 200}} resizeMode='contain'></Image> :
                            <><Image source={images.imageUpload} style={styles.imageUpload} resizeMode='contain'></Image>
                            <Text style={{color: COLORS.lightGray5, marginTop: 10}}>Upload Image</Text></>}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=> writeStoreFront()}
                            >
                            <Text style={{color: 'white', ...FONTS.h3}}>{labelSubmit}</Text>
                        </TouchableOpacity>
                    </View>: 
                <><View style={{alignItems: "center"}}>
                    {/* <View style={{flexDirection: 'row', flexWrap: 'wrap' }}> */}
                        {/* <Image
                            resizeMode="cover"
                            source={storeImage}
                            style={{
                                width: 100,
                                height: 100,
                            }}
                        /> */}
                        <TouchableOpacity
                            style={styles.buttonUploadImage}
                            onPress={pickImage}>
                            {image ? <Image source={{ uri: image }} style={{width: '100%', height: 200}} resizeMode='contain'></Image> :
                            <Image source={storeImage} style={{width: '100%', height: 200}}  resizeMode='contain'></Image>}
                        </TouchableOpacity>
                    {/* </View> */}
                    {/* <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 20}}> */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=> writeStoreFront()}
                            >
                            <Text style={{color: 'white', ...FONTS.h3}}>{labelSubmit}</Text>
                        </TouchableOpacity>
                    {/* </View> */}
                </View></> : <></>}
            </View>
            </>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderSubNav()}
            {renderStoreFront()}
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
        flexDirection: 'col', flexWrap: 'wrap',
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
    // container_button: {
    //     flexDirection: 'row', 
    //     flexWrap: 'wrap', 
    //     justifyContent: 'space-around', 
    //     alignItems: 'center'
    // },
    icon: {
        width: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        fontSize: 13,
        height: 35,
        // outlineStyle: 'none'
    },
    label: {
        color: "grey",
        fontSize: 12,
    },
    animatedStyle: {
        top: 5,
        left: 15,
        position: 'absolute',
        borderRadius: 90,
        zIndex: 10000,
    },
})

export default MyStore