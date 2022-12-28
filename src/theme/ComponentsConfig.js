import {
  Typography,
  Colors,
  Spacings,
  ThemeManager,
} from "react-native-ui-lib";

export const themeInit = () => {
  Colors.loadColors({
    primaryColor: "#2C72FB",
    secondaryColor: "#EBEBD3",
    tertiaryColor: "#DA4167",
    textColor: "#221D23",
    altTextColor: "#FFFFFF",
    white: "#FFFFFF",
    darkerGrey: "#666666",
    lightGrey: "#ECECEE",
    darkGrey: "#BDBDBD",
    darkGrey2: "#B0B0B0",
    errorColor: "#E63B2E",
    successColor: "#ADC76F",
    warnColor: "##FF963C",
  });

  Typography.loadTypographies({
    h1: { fontSize: 36, fontWeight: "600" },
    h2: { fontSize: 28, fontWeight: "500" },
    h3: { fontSize: 24, fontWeight: "500" },
    h4: { fontSize: 20, fontWeight: "500" },
    body: { fontSize: 18, fontWeight: "400" },
    bold: { fontSize: 18, fontWeight: "600"},
    smallerBody : { fontSize: 16, fontWeight: "400" },
    label: { fontSize: 12, fontWeight: "400" },
  });

  Spacings.loadSpacings({
    page: 20,
    card: 12,
    gridGutter: 16,
    screenOffset: 20,
  });

  ThemeManager.setComponentTheme("Text", (props, context) => {
    return {
      body: true,
      textColor: true,
      h2: props.secondaryColor,
      pink: props.secondaryColor,
    };
  });


  

//   ThemeManager.setcomponentTheme("TextField", (props, context) => {
//     return {
//       primaryColor: true,
//       h1 : true
//     };
//   });
};
