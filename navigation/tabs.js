import React from 'react';
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import { isIphoneX } from 'react-native-iphone-x-helper';

import { Home, MyStore, VendorQr, ProductDetail, Product, Favourites } from "../screens"

import { COLORS, icons, SIZES } from "../constants"

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {

    var isSelected = accessibilityState.selected

    if (isSelected) {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.primary
                }}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.pink
                }}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}

const CustomTabBar = (props) => {
    if (isIphoneX()) {
        return (
            <View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 30,
                        backgroundColor: COLORS.white
                    }}
                ></View>
                <BottomTabBar
                    {...props.props}
                />
            </View>
        )
    } else {
        return (
            <BottomTabBar
                {...props.props}
            />
        )
    }

}

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.white,
                tabBarInactiveTintColor: COLORS.white,
                tabBarLabelStyle: {
                    position: "absolute",
                    bottom: 6,
                    fontSize: 9
                  },
                  tabBarStyle: [
                    {
                      "display": "flex"
                    },
                    null
                  ]
            }}
            tabBar={(props) => (
                <CustomTabBar
                    props={props}
                />
            )}
        >
            <Tab.Screen
                name="Home"
                component={MyStore}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.home}
                            resizeMode="contain"
                            style={{
                                top: -8,
                                width: 18,
                                height: 18
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
           <Tab.Screen
                name="MyStore"
                component={MyStore}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.store}
                            resizeMode="contain"
                            style={{
                                top: -8,
                                width: 18,
                                height: 18,
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="VendorQr"
                component={VendorQr}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.vendorqr}
                            resizeMode="contain"
                            style={{
                                top: -8,
                                width: 18,
                                height: 18,
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Product"
                component={Product}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.product}
                            resizeMode="contain"
                            style={{
                                top: -8,
                                width: 18,
                                height: 18,
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
             <Tab.Screen
                name="Favourite"
                component={Favourites}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.favourite}
                            resizeMode="contain"
                            style={{
                                top: -8,
                                width: 18,
                                height: 18,
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

 
        </Tab.Navigator>
    )
}

export default Tabs