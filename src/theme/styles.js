import {
    StyleSheet
} from 'react-native';
import {
    Colors
} from 'react-native-ui-lib';

const colors = {
    primaryColor: "#083D77",
    secondaryColor: "#EBEBD3",
    tertiaryColor: "#DA4167",
    textColor: "#221D23",
    altTextColor: "#FFFFFF",
    white: "#FFFFFF",
    darkerGrey: "#666666",
    lightGrey: "#ECECEE",
    darkGrey: "#BDBDBD",
    errorColor: "#E63B2E",
    successColor: "#ADC76F",
    warnColor: "##FF963C",
}

export const styles = StyleSheet.create({
    placeholder: {
        color: colors.darkerGrey,
    },
    label: {
        color: colors.darkerGrey,
        fontSize: 12,
    },
    withFrame: {
        borderWidth: 1,
        borderColor: colors.darkGrey,
        padding: 13,
        borderRadius: 4,
        backgroundColor: colors.lightGrey,
        marginBottom: 8,
    },
    multilineLabel: {
        color: colors.darkerGrey,
        fontSize: 12,
        marginBottom: 10
    },
    image: 
    {
        width: 250, 
        height: 250,
        marginBottom: 10,
    },
    logo: {
        width: 130,
        height: 130,
        resizeMode:'contain',
    },
    circle: {
        width: 160,
        height: 160,
        borderRadius: 160/2,
        borderWidth: 1,
        borderColor: colors.darkGrey,
        backgroundColor: colors.lightGrey,
    },
    divider: {
        borderBottomColor: colors.darkGrey,
        borderBottomWidth: 1,
    },
    link: {
        color: "#3366CC",
        textDecorationLine: 'underline',
        fontSize: 15, 
    },
    popup: {
        backgroundColor: colors.white,
        padding: 1,
        borderRadius: 10,

    }
    }
);