import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
;
import { icons, images, SIZES, COLORS, FONTS } from '../../constants'

class MyOrders extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const shortenAddress = (address) => {
            return `${address.slice(0, 11)}...${address.slice(
                address.length - 4,
                address.length
            )}`;
        }
        const renderProduct = ({ product }) => {
            return (
                <TouchableOpacity style={styles.ItemTouchElement}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'column' }}>
                            <Text style={{ ...FONTS.h5, paddingLeft: 2 }}>Order From: <Text style={{color: '#BABABA'}}>{shortenAddress('0x9f3DD64c084C88e8E456e9BAdbc1ebbC624941be')}</Text></Text>
                            <View style={ styles.CounterContainer }>
                                <View style={ styles.counter }>
                                    <Text style={{...FONTS.h5}}>Items: <Text style={{color: '#BABABA'}}>20</Text></Text>
                                </View>
                                <View style={ styles.counter }>
                                    <Text style={{...FONTS.h5}}>Total:  <Text style={{color: '#BABABA'}}>$20 CUSD</Text></Text>
                                </View>
                            </View>
                            <View style={ styles.CounterContainer }>
                                <View style={ styles.counter }>
                                    <Text style={{...FONTS.h5}}>Description: <Text style={{color: '#BABABA'}}>Carne Asada Taco</Text></Text>
                                </View>
                            </View>
                            <View style={ styles.CounterContainer }>
                                <View style={ styles.counter }>
                                    <Text style={{...FONTS.h5}}>Date: <Text style={{color: '#BABABA'}}>12/04/2022 - 12:00pm</Text></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        
        return (
            <View style={styles.DashboardProductSliderContainer}>
                <View style={styles.tabOrder}>
                    <View style={styles.firstTab}>
                        <Text style={ styles.ActiveSliderTitleText }>My Orders</Text>
                    </View>
                    <View style={styles.secondTab}>
                        <Text style={ styles.SliderTitleText }>Sale</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.TouchElement}>
                    <FlatList
                            style={styles.ListElement}
                            data={this.props.products}
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={product => `${product.id}`}
                            renderItem={renderProduct}
                            contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    DashboardProductSliderContainer: {
        padding: SIZES.padding * 2
    },
    SliderTitleText:{
        ...FONTS.h4
    },
    ActiveSliderTitleText: {
        ...FONTS.h4,
        textDecorationLine: 'underline',
        // textDecorationThickness: 3,
        textDecorationColor: COLORS.pink,
        // textUnderlineOffset: 8
    },
    ItemTouchElement:{
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        marginRight: SIZES.padding,
        marginBottom: 15,
        borderColor: "#000000",
        borderRadius: 20,
        borderWidth: 1
    },
    CounterContainer:{
        height: 20,
        margin: 2,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    counter: {
         marginRight: 10
    },
    tabOrder: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    firstTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondTab:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
}); 


export default MyOrders;