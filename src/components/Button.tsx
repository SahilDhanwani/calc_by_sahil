import { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Theme } from "../context/Theme";
import { Styles } from "../styles/Global";

interface ButtonProps {
    onPress: () => void;
    title: string;
    isBlue?: boolean;
    isGray?: boolean;
    isGreen?: boolean;
}

export default function Button({ title, onPress, isBlue, isGray, isGreen }: ButtonProps) {
    const theme = useContext(Theme);

    return (
        <TouchableOpacity
            style={
                isGreen
                    ? Styles.btnGreen  // Apply the green style if isGreen is true
                    : isBlue
                    ? Styles.btnBlue
                    : isGray
                    ? Styles.btnGray
                    : theme === "light"
                    ? Styles.btnLight
                    : Styles.btnDark
            }
            onPress={onPress}
        >
            <Text
                style={
                    isGreen || isBlue || isGray
                        ? Styles.smallTextLight
                        : theme === "dark"
                        ? Styles.smallTextLight
                        : Styles.smallTextDark
                }
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}
