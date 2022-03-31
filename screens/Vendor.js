import React, { useState, useContext } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
} from "react-native";
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import AppContext from '../components/AppContext'; 
import SubNav from "../components/SubNav";


const Vendor = ({ navigation }) => {
    const connector = useWalletConnect();
    const appContext = useContext(AppContext);
    const [messageVendor, setMessageVendor] = useState("");
    const [storeName, setStoreName] = useState(null);
    const [storeImage, setStoreImage] = useState(null);
    const [storeDescription, setStoreDescription] = useState(null);
    const [storeLat, setStoreLat] = useState(null);
    const [storeLong, setStoreLong] = useState(null);

    const readStoreFront = async () => {
        try {    
            const readStoreFront = await appContext.contract.readStoreFront(appContext.address)
            // check store front if null address , vendor not add
            if (readStoreFront[0].toLowerCase() !== appContext.address.toLowerCase()){
                setMessageVendor("You don't have store front yet!")
            } else {
                setMessageVendor("")
                setStoreName(readStoreFront[1])
                setStoreImage(readStoreFront[2])
                setStoreDescription(readStoreFront[3])
                setStoreLat(readStoreFront[4])
                setStoreLong(readStoreFront[5])
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
            <View style={{ flexDirection: 'row', height: 50 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#e71963", paddingBottom: 10, paddingTop: 10 }}>
                </View>
            </View>
        )
    }

    // Used to display balance & wallet address.
    function renderSubNav() {
        return (
            <SubNav balance={appContext.balance} address={appContext.address}></SubNav>
        )
    }

    // Display vendor store front
    function renderStoreFront() {
        return (
            <>
                <View style={{ width: "100%", height: 30, textAlign: 'center' }}>
                    <Text style={{ marginTop: 10, color: "#767070", alignItems: "center" }}>{messageVendor}</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={setStoreName}
                        value={storeName}
                        placeholder="Store name"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setStoreImage}
                        value={storeImage}
                        placeholder="Image url"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setStoreDescription}
                        value={storeDescription}
                        placeholder="Store description"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setStoreLat}
                        value={storeLat}
                        placeholder="Store latitude"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setStoreLong}
                        value={storeLong}
                        placeholder="Store longitude"
                    />
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=> writeStoreFront()}
                            >
                            <Text style={{color: 'white', ...FONTS.h3}}>Create</Text>
                        </TouchableOpacity>
                    </View>
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
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: COLORS.pink,
        width: 100
    },
})

export default Vendor