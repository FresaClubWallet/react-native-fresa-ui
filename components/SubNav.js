import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'

const SubNav = (props) => {
    const shortenAddress = (address) => {
        return `${address.slice(0, 6)}...${address.slice(
            address.length - 4,
            address.length
        )}`;
    }
    return (
        <View style={styles.subnavContainer}>
            <View style={styles.leftContent}>
                <Image source={icons.balance} style={styles.iconBalance}/>
                <Text style={styles.balanceText}>{props.balance} cUSD</Text>
                <Image source={icons.hide} style={styles.iconHide}/>
            </View>
            <View style={styles.centerContent}>
            </View>
            <View style={styles.rightContent}>
                {props.isViewProduct ?
                    <TouchableOpacity
                        style={styles.buttonOpacity}
                        onPress={() => props.navigation.push('Product')}>
                        <Text style={ styles.viewProducts }>View products</Text>
                        <Image source={icons.arrow} style={styles.iconArrow}/>
                    </TouchableOpacity>: ""}
                {props.isBackToStore ?
                    <TouchableOpacity
                        style={styles.buttonOpacity}
                        onPress={() => props.navigation.push('Home')}>
                    <Image source={icons.homePink} style={styles.iconHome}/>
                    <Text style={ styles.backToStore }>Back to store</Text>
                    </TouchableOpacity>
                : ""}
            </View>                

        </View>
    );
}

const styles = StyleSheet.create({
    subnavContainer: {
        flexDirection: 'row',
        height: 60,
        padding: SIZES.padding * 2,
        flexWrap: "wrap"
    },
    buttonOpacity: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    leftContent: {
        flexDirection: 'row',
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
        flexDirection: 'row',
    },
    iconBalance: {
        width: 20,
        height: 20,
    },
    iconHide: {
        width: 20,
        height: 18,
    },
    iconHome: {
        width: 18,
        height: 18,
    },
    balanceText: {
        color: COLORS.black,
        font: FONTS.h4,
        fontSize: SIZES.h4,
        fontWeight: "600",
        paddingLeft: 10,
        paddingRight: 10,
    },
    viewProducts: {
        paddingRight: 10,
        ...FONTS.body4,
    },
    backToStore: {
        ...FONTS.body4,
        color: COLORS.pink,
        paddingLeft: 10
    },
    iconArrow: {
        width: 24,
        height: 14,
    },
});


export default SubNav;