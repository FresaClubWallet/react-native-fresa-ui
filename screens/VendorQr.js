import React, { useEffect, useState, useContext } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'

import SvgQRCode from 'react-native-qrcode-svg';

import {SubNav, Header, AppContext } from '../components';

const VendorQr = ({ navigation }) => {
    const appContext = useContext(AppContext);
    
    function renderHeader() {
        return (
            <Header navigation={navigation}></Header>
        )
    }

    // 20% (default) sized logo from local file string with white logo backdrop
    function LogoFromFile() {    
        return <SvgQRCode size={250} value={appContext.address} logo={images.iconLogo} />;
    }

    // Used to display balance & wallet address.
    function renderSubNav() {
        return (
            <SubNav balance={appContext.balance} address={appContext.address}></SubNav>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderSubNav()}
            <View
                style={{
                    width: '100%',
                    height: '50%',
                    top: 100,
                    flexDirection: 'column', 
                    alignItems: 'center',
                }}>
                <Text style={{paddingBottom: 20, ...FONTS.h3}}>This is your vendor QR code</Text>
                <LogoFromFile />
                <Text style={{paddingTop: 20, ...FONTS.body5}}>Customers can scan this to access your storefront.</Text>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    }
})

export default VendorQr