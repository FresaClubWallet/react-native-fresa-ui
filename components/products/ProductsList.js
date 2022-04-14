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
                return (
                    <TouchableOpacity style={styles.ItemTouchElement}>
                        <View >
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Image
                                    resizeMode="cover"
                                    source={product.image}
                                    style={{
                                        width: 100,
                                        height: 100,
                                    }}
                                />
                                <View style={{ flexWrap: 'wrap', flexDirection: 'column', width: "60%" }}>
                                    <Text style={{ ...FONTS.h5, paddingLeft: 10 }}><Text>{product.price.toString()} cUSD</Text></Text>
                                    <Text style={{ paddingLeft: 10 }}>Name: {product.name}</Text>
                                    <Text style={{ paddingLeft: 10 }}>Description: {product.description}</Text>
                                    <View style={ styles.CounterContainer }>
                                        <View style={ styles.counter }>
                                            <Text style={{...FONTS.h5}}>Index</Text>
                                            <Text>{product.index.toString()}</Text>
                                        </View>
                                        <View style={ styles.counter }>
                                            <Text style={{...FONTS.h5}}>Active</Text>
                                            <Text>{product.active.toString()}</Text>
                                        </View>
                                    </View>
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
        // boxShadow: "3px 3px 18px -15px",
        alignItems: "center",
        justifyContent: "center",
        marginRight: SIZES.padding,
        marginTop: 20
    },
    CounterContainer:{
        height: 10,
        margin: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    counter: {
        width: "50%", height: 50
    }
});


export default ProductsList;