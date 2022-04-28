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

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
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
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        opacity:0.6
    },
    prompt: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    branding:{
        backgroundColor: COLORS.transparent,
        top: SIZES.height - 200,
        left: SIZES.width - 80
    },
    logo: {
        width: 50,
        height: 50,
    },
    finder:{
        width:150,
        height:150,
        borderColor: COLORS.primary,
        borderRadius: 20
    }
});

export default StoreQrScanner;