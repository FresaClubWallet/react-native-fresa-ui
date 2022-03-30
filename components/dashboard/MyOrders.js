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
                    <View >
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'col' }}>
                                <Text style={{ ...FONTS.h5, paddingLeft: "10px" }}>Order from {shortenAddress('0x9f3DD64c084C88e8E456e9BAdbc1ebbC624941be')}</Text>
                                <Text style={{ paddingLeft: "10px" }}>12/1/1 13:11</Text>
                                <View style={ styles.CounterContainer }>
                                    <View style={ styles.counter }>
                                        <Text style={{...FONTS.h4}}>Items</Text>
                                        <Text>20</Text>
                                    </View>
                                    <View style={ styles.counter }>
                                        <Text style={{...FONTS.h4}}>Total</Text>
                                        <Text>$20 CUSD</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>


                </TouchableOpacity>
            )
        }
        
        return (
            <View style={styles.DashboardProductSliderContainer}>
                <Text style={ styles.SliderTitleText }>My Orders</Text>
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
    TouchElement:{

    },
    ListElement:{

    },
    ItemTouchElement:{
        padding: SIZES.padding,
        paddingBottom: SIZES.padding * 2,
        backgroundColor: COLORS.white,
        boxShadow: "3px 3px 18px -15px",
        alignItems: "left",
        justifyContent: "middle",
        marginRight: SIZES.padding,
        marginTop:10,
        paddingBottom:30
    },
    CounterContainer:{
        height: '10px',
        margin: '10px',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    counter: {
         height: "10px",
         marginRight: 10
    }
}); 


export default MyOrders;