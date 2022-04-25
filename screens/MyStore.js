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
            if (readStoreFront[1].toLowerCase() !== appContext.address.toLowerCase()){
                setMessageVendor("You don't have store front yet!")
                setLabelSubmit("Submit")
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
                {/* {labelSubmit ?
                (labelSubmit === "Create") ? 
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=> writeStoreFront()}
                            >
                            <Text style={{color: 'white', ...FONTS.h3}}>{labelSubmit}</Text>
                        </TouchableOpacity>
                    </View>: 
                <><View style={styles.container_button}>
                    <View style={{flexDirection: 'column', flexWrap: 'wrap' }}>
                        <Text style={styles.label}>Your store Image</Text>
                        <Image
                            resizeMode="cover"
                            source={storeImage}
                            style={{
                                width: 100,
                                height: 100,
                            }}
                        />
                    </View>
                    <View style={{flexDirection: 'column', flexWrap: 'wrap', gap: 20}}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=> writeStoreFront()}
                            >
                            <Text style={{color: 'white', ...FONTS.h3}}>{labelSubmit}</Text>
                        </TouchableOpacity>
                    </View>
                </View></> : <></>} */}
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

    button: {
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 1,
        backgroundColor: COLORS.pink,
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
    container_button: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-around', 
        alignItems: 'center'
    },
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