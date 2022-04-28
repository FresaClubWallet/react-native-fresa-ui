import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { images, SIZES, COLORS, FONTS } from '../constants'

import AppContext from '../components/AppContext';


const StoreQrScanner = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    /**
     * Checks if the given string is an address
     *
     * @method isAddress
     * @param {String} address the given HEX adress
     * @return {Boolean}
    */
    var isAddress = function (address) {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            // check if it has the basic requirements of an address
            return false;
        } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
            // If it's all small caps or all all caps, return true
            return true;
        } else {
            // Otherwise check each case
            return isChecksumAddress(address);
        }
    };

    /**
     * Checks if the given string is a checksummed address
     *
     * @method isChecksumAddress
     * @param {String} address the given HEX adress
     * @return {Boolean}
    */
    var isChecksumAddress = function (address) {
        // Check each case
        address = address.replace('0x', '');
        var addressHash = sha3(address.toLowerCase());
        for (var i = 0; i < 40; i++) {
            // the nth letter should be uppercase if the nth digit of casemap is 1
            if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
                return false;
            }
        }
        return true;
    };


    const handleBarCodeScanned = ({ type, data }) => {
        if(isAddress(data)){
            setScanned(true);
            navigation.navigate('ProductDetail', {
                storefront: data,
            });
        }
    };

    if (hasPermission === null) {
        return <Text>Fresa Is requesting permission to use the camera on your device.</Text>;
    }
    if (hasPermission === false) {
        return <Text>Fresa Was unable to get permission to use the camera on your device.</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            >
                <View style={styles.promptContainer}>
                    <Text style={styles.prompt}>Scan Vendor QR Code</Text>
                </View>
            </BarCodeScanner>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    promptContainer: {
        backgroundColor: COLORS.pink,
        width: SIZES.width,
        height: 100,
        paddingTop: 50,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        opacity: 0.6
    },
    prompt: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    branding: {
        backgroundColor: COLORS.transparent,
        top: SIZES.height - 200,
        left: SIZES.width - 80
    },
    logo: {
        width: 50,
        height: 50,
    },
    finder: {
        width: 150,
        height: 150,
        borderColor: COLORS.primary,
        borderRadius: 20
    }
});

export default StoreQrScanner;