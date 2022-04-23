import React, { Component, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import AppContext from './AppContext'; 


const Header = () => {
    const appContext = useContext(AppContext);
    const shortenAddress = (address) => {
        return `${address.slice(0, 15)}...${address.slice(
            address.length - 4,
            address.length
        )}`;
    }
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <Text style={styles.storeAddressBarText}>{shortenAddress(appContext.address)}</Text>
            </View>
            <View style={styles.headerContent}>
                <View style={styles.storeAddressBar}>
                    <Text style={styles.storeAddressBarText}>{shortenAddress(appContext.address)}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row', 
        height: 50
    },
    headerContent:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'#e71963',
        paddingBottom: 10,
        paddingTop:10
    },
    storeAddressBar:{
        height: 34,
        width:250,
        // backgroundColor: '#14131336'
    },
    storeAddressBarText: {
        padding: 10,
        color: COLORS.gray
    }

});


export default Header;