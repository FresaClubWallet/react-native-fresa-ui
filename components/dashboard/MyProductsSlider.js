import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../../constants'


const MyProductsSlider = (props) => {
    const renderProduct = (product) => {
        try{
            return (
                <TouchableOpacity key={product.index} style={styles.ItemTouchElement}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Image
                            resizeMode="cover"
                            source={product.image ? { uri: product.image} : require('../../assets/icon.png')}
                            style={{
                                width: 100,
                                height: 100,
                            }}
                        />
                        <View style={{ flexWrap: 'wrap', flexDirection: 'column', width: 150 }}>
                            <Text style={{ ...FONTS.h5, paddingLeft: 10 }}>{product.name}</Text>
                            <View style={ styles.CounterContainer }>
                                <View style={ styles.counter }>
                                    <Text style={{...FONTS.body6}}>Stock: {product.qty}</Text>
                                </View>
                                <View style={ styles.counter }>
                                    <Text style={{...FONTS.body6}}>Sold: {product.sold}</Text>
                                </View>
                                <Text style={{...FONTS.h5}}>${product.price} cUSD</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } catch(e) {
            // @TODO this is quick fix
        }
    }

    return (
        <View style={styles.DashboardProductSliderContainer}>
            <View style={styles.ProductBar}>
                <View style={styles.leftContent}>
                    <Image 
                        source={icons.myproduct}
                        style={styles.iconMyProduct}/>
                    <Text style={ styles.SliderTitleText }>My Products</Text>
                </View>
                <View style={styles.centerContent}>
                    
                </View>
                <TouchableOpacity
                        style={styles.buttonOpacity}
                        onPress={() => props.navigation.navigate('Product')}>
                    <View style={styles.rightContent}>
                        <Text style={ styles.ViewAll }>View all</Text>
                        <Image 
                            source={icons.arrow}
                            style={styles.iconArrow}/>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.TouchElement}>
                <FlatList
                        style={styles.ListElement} 
                        data={props.products}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => renderProduct(item)}
                        contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    DashboardProductSliderContainer: {
        paddingLeft: SIZES.padding * 2,
        paddingTop: 5
    },
    ProductBar: {
        flexDirection: 'row',
        flexWrap: "wrap"
    },
    SliderTitleText:{
        ...FONTS.h3,
        paddingLeft: 10
    },
    ViewAll: {
        paddingRight: 10,
        ...FONTS.body4,
    },
    ItemTouchElement:{
        padding: SIZES.padding,
        paddingBottom: SIZES.padding * 2,
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center",
        marginRight: SIZES.padding,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 0},
        borderRadius: 15,
        shadowOpacity: 0.2,
        shadowRadius: 12,
        marginStart:5,
        elevation:4
    },
    CounterContainer:{
        height: 10,
        margin: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    counter: {
        width: "50%", 
        height: 35
    },
    iconMyProduct: {
        width: 16,
        height: 18,
    },
    iconArrow: {
        width: 24,
        height: 14,
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
        paddingRight: 20
    },
    buttonOpacity: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
});


export default MyProductsSlider;