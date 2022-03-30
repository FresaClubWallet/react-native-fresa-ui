import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../../constants'


class MyProductsSlider extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const renderProduct = ({ product }) => {
            return (
                <TouchableOpacity style={styles.ItemTouchElement}>
                    <View >
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Image
                                resizeMode="cover"
                                source={images.strawberry_picking}
                                style={{
                                    width: 100,
                                    height: 100,
                                }}
                            />
                            <View style={{ flexWrap: 'wrap', flexDirection: 'col', width: "150px" }}>
                                <Text style={{ ...FONTS.h5, paddingLeft: "10px" }}><Text>$10</Text> - Basket.</Text>
                                <Text style={{ paddingLeft: "10px" }}>Basket of fresh strawberries</Text>
                                <View style={ styles.CounterContainer }>
                                    <View style={ styles.counter }>
                                        <Text style={{...FONTS.h5}}>Stock</Text>
                                        <Text>20</Text>
                                    </View>
                                    <View style={ styles.counter }>
                                        <Text style={{...FONTS.h5}}>Sold</Text>
                                        <Text>20</Text>
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
                <Text style={ styles.SliderTitleText }>My Products</Text>
                <TouchableOpacity style={styles.TouchElement}>
                    <FlatList
                            style={styles.ListElement}
                            data={this.props.products}
                            horizontal
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
        ...FONTS.h3
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
        alignItems: "center",
        justifyContent: "center",
        marginRight: SIZES.padding,
    },
    CounterContainer:{
        height: '10px',
        margin: '10px',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    counter: {
        width: "50%", height: "50px"
    }
});


export default MyProductsSlider;