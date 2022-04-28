import React, { useEffect, useState, useContext } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'

import SubNav from "../components/SubNav";
import Header from "../components/Header";
import AppContext from '../components/AppContext'; 
import SvgQRCode from 'react-native-qrcode-svg';


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
                <Text style={{paddingBottom: 20, fontSize: SIZES.h2}}>This is your vendor QR code</Text>
                <LogoFromFile />
                <Text style={{paddingTop: 20}}>Customers can scan this to access your storefront.</Text>

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