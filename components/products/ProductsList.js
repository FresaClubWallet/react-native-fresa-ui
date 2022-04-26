import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../../constants'


class ProductsList extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const renderProduct = (product) => {
            if (product) {
                console.log(product.image)
                return (
                    <TouchableOpacity style={styles.ItemTouchElement}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {/* {product.image == null ? 
                            <Image
                                resizeMode="cover"
                                source={images.taco}
                                style={{
                                    width: 100,
                                    height: 100,
                                }}
                            /> */}
                            <Image
                                resizeMode="cover"
                                source={product.image ? {uri:product.image}: images.taco}
                                style={{
                                    width: 100,
                                    height: 100,
                                }}
                            />}
                            <View style={{ flexWrap: 'wrap', flexDirection: 'column', width: "60%" }}>
                                <View style={ styles.CounterContainer }>
                                    <Text style={{ ...FONTS.h5 }}>{product.name}</Text>
                                </View>
                                <View style={ styles.CounterContainer }>
                                    <Text style={{...FONTS.body6}}>by Tacos de Tijuana</Text>
                                </View>
                                <View style={ styles.CounterContainer }>
                                    <View style={styles.counter}>
                                        <Text style={{...FONTS.body6, marginRight: 10}}>Active: Yes</Text>
                                    </View>
                                    <View style={styles.counter}>
                                        <Text style={{...FONTS.body6}}>Quantity: 3</Text>
                                    </View>
                                </View>
                                <View style={ styles.CounterContainer }>
                                    <Text style={{...FONTS.h5}}>${product.price.toString()} cUSD</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }
        }
        return (
            <View style={styles.DashboardProductSliderContainer}>
                <Text style={ styles.TitleText }>My Products</Text>
                <TouchableOpacity style={styles.TouchElement}>
                    {this.props.products.map(value => {
                        return renderProduct(value)
                    })}
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    DashboardProductSliderContainer: {
        padding: SIZES.padding * 2
    },
    TitleText:{
        ...FONTS.h3,
        marginBottom: 10
    },
    TouchElement:{
        marginBottom: 10
    },
    ListElement:{

    },
    ItemTouchElement:{
        padding: SIZES.padding,
        paddingBottom: SIZES.padding * 2,
        backgroundColor: COLORS.white,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {width: 1, height: 4},
        borderRadius: 15,
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    CounterContainer:{
        height: 10,
        margin: 8,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    counter: {
       height: 50
    }
});


export default ProductsList;