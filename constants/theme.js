import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: "#118ab2", // orange
    secondary: "#fbfbfb",   // gray

    // colors
    black: "#1E1F20",
    white: "#FFFFFF",
    pink: "#e71963",
    gray: "#CAC8C8",
    grayMedium: "#CBCBCB",
    lightGray: "#F5F5F6",
    lightGray2: "#F6F6F7",
    lightGray3: "#EFEFF1",
    lightGray4: "#F8F8F9",
    transparent: "transparent",
    darkgray: '#898C95',
    blue: '#0096CB'
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,
    marginTop1: 18,
    marginTop2: 25,

    // font sizes
    largeTitle: 50,
    h1: 24,
    h2: 22,
    h3: 20,
    h4: 18,
    h5:16,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,
    body6: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Cera-Pro-Medium", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Cera-Pro-Medium", fontSize: SIZES.h1, lineHeight: 24 },
    h2: { fontFamily: "Cera-Pro-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Cera-Pro-Medium", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Cera-Pro-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    h5: { fontFamily: "Cera-Pro-Bold", fontSize: SIZES.h5, lineHeight: 22 },
    body1: { fontFamily: "Cera-Pro-Medium", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Cera-Pro-Medium", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Cera-Pro-Medium", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Cera-Pro-Medium", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Cera-Pro-Medium", fontSize: SIZES.body5, lineHeight: 24 },
    body6: { fontFamily: "Cera-Pro-Medium", fontSize: SIZES.body6, color: '#BABABA', lineHeight: 24 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;