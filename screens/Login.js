import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Pressable
} from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from '../constants'

const Login = ({ navigation }) => {

    function renderBody() {
        

        return (
            <View style={{ padding: SIZES.padding * 2, marginTop: SIZES.height/6 }}>
                <View style={{alignItems: 'center'}}>
                    <Image source={images.iconLogo} style={styles.logo}/>
                </View>
                <View style={{alignItems: 'center', marginTop: 50}}>
                    <Text style={{...FONTS.h1}}>Welcome to <span style={{color: COLORS.blue}}>Fresa</span></Text>
                    <Text style={{marginTop: SIZES.marginTop1}}>Your are just a few steps away from starting</Text>
                    <Text>Your culinary adventure</Text>
                    <Text style={{...FONTS.h5, marginTop: SIZES.marginTop2}}>Simply connect to your wallet to get started</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                <Pressable style={styles.button}>
                    <Text style={{color: 'white', ...FONTS.h3}}>Connect</Text>
                </Pressable>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderBody()}
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
    logo: {
        width: 200,
        height: 200
      },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: COLORS.pink,
        marginTop: 150
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