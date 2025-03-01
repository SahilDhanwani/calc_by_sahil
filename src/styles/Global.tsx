import { StyleSheet } from "react-native";
import { Color } from "./Color";

export const Styles = StyleSheet.create({
    btnGreen: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: Color.green,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    // Button
    btnBlue: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: Color.blue,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnDark: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: Color.btnDark,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnLight: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: Color.white,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    btnGray: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: Color.btnGray,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    smallTextLight: {
        fontSize: 32,
        color: Color.white,
    },
    smallTextDark: {
        fontSize: 32,
        color: Color.black,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between', // This ensures that the content is spaced evenly with the footer pushed to the bottom
    },

    // Keyboard Styling Adjustments
    row: {
        maxWidth: "100%",
        flexDirection: "row",
    },
    viewBottom: {
        position: "absolute",
        bottom: 50,
    },
    screenFirstNumber: {
        fontSize: 96,
        color: Color.gray,
        fontWeight: "200",
        alignSelf: "flex-end",
    },
    screenSecondNumber: {
        fontSize: 40,
        color: Color.gray,
        fontWeight: "200",
        alignSelf: "flex-end",
    },

    footer: {
        width: "100%",
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    line: {
        width: "90%",
        height: 1,
        backgroundColor: Color.green, // Change color based on theme
        marginBottom: 5,
    },
    footerText: {
        color: Color.blue, // Change color based on theme
        fontSize: 26,
    },
});
