import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import AppContext from './AppContext'; 


const Header = (props) => {
    const appContext = useContext(AppContext);
    const shortenAddress = (address) => {
        return `${address.slice(0, 20)}...${address.slice(
            address.length - 4,
            address.length
        )}`;
    }
    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftContent}>
                <Image source={images.iconLogo} style={styles.logo}/>
            </View>
            <View style={styles.centerContent}>
                <View style={styles.storeAddressBar}>
                    <Text style={styles.storeAddressBarText}>{shortenAddress(appContext.address)}</Text>
                </View>
            </View>
            <View style={styles.rightContent}>
                <TouchableOpacity
                    style={styles.buttonOpacity}
                    onPress={() => props.navigation.navigate('StoreQrScanner')}>
                    <ImageBackground source={images.eclipse} resizeMode="cover" style={styles.imageRightContent}>
                        <Image source={icons.qr} style={styles.qr}/>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row', 
        height: 40
    },
    leftContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 20,
        paddingLeft: 20
    },
    centerContent:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop:10
    },
    rightContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageRightContent:{
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 10
    },
    storeAddressBar:{
        height: 34,
        width:250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    storeAddressBarText: {
        padding: 6,
        color: COLORS.gray
    },
    logo: {
        width: 37,
        height: 37
    },
    qr: {
        width: 20,
        height: 20
    }
});


export default Header;