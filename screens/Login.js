import React, { useContext } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground
} from "react-native";
import { images, SIZES, COLORS, FONTS } from '../constants'
import { AppContext } from '../components';

const Login = ({ navigation }) => {
    const appContext = useContext(AppContext);

    function renderBody() {
        return (
            <View style={{ marginTop: SIZES.height - SIZES.height * 0.9, alignItems: 'center', flex: 1 }}>
                <View style={{alignItems: 'center'}}>
                    <Image source={images.iconLogo} style={styles.logo}/>
                </View>
                <View style={{alignItems: 'flex-start', marginTop: 80, marginLeft: 50}}>
                    <Text style={{...FONTS.h1}}>Welcome to Fresa</Text>
                    <Text style={{marginTop: SIZES.marginTop1}}>You are just a few steps away</Text>
                    <Text>from starting your culinary</Text>
                    <Text>adventure</Text>
                </View>
                
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={images.loginBanner} resizeMode="cover" style={styles.image}>
                {renderBody()}
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => appContext.connectWallet()}
                        >
                        <View style={{alignItems: 'flex-end', marginRight: 10}}>
                            <Image source={images.loginCircle} style={styles.loginCircle}>
                            </Image>
                        </View>
                        <View style={{alignItems: 'flex-start', marginRight: 20}}>
                            <Text style={{color: 'white', ...FONTS.h3}}>Connect Wallet</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
      },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 100,
        shadowRadius: 5,
        elevation: 1,
    },
    logo: {
        width: 189,
        height: 189
    },
    loginCircle: {
        width: 50,
        height: 50,
    },
    button: {
        flex: 2,
        flexDirection: 'row', flexWrap: 'wrap',
        position: "absolute",
        bottom: 50,
        // marginTop: SIZES.height - SIZES.height * 0.84,
        alignItems: 'center',
        justifyContent:'space-between',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 40,
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
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})

export default Login