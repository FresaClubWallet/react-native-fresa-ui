import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class SubNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const shortenAddress = (address) => {
            return `${address.slice(0, 6)}...${address.slice(
                address.length - 4,
                address.length
            )}`;
        }
        return (
            <View style={styles.subnavContainer}>
                <View style={styles.balanceChip}>
                    <Text style={styles.balanceText}>{this.props.balance} cUSD</Text>
                </View>
                <Text style={styles.addressText}>{shortenAddress(this.props.address)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subnavContainer: {
        width: "100%",
        height: 50,
        backgroundColor: "#D9D5D5",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    balanceChip: {
        height: 30,
        width: 150,
        borderRadius: 20,
        backgroundColor: "#118ab2",
        marginVertical: 10,
        left: 10
    },
    balanceText: {
        color: "white",
        fontWeight: "700",
        paddingTop: 6,
        paddingLeft: 10,
        fontSize: 15
    },
    addressText: {
        marginTop: 20,
        marginLeft: 20,
        color: "#767070"
    }
});


export default SubNav;