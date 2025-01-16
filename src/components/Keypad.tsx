import * as React from "react";
import Button from "./Button";
import { View, Text } from "react-native";
import { Styles } from "../styles/Global";

interface KeypadProps {
    theme: string; // Define the theme prop
}

export default function Keypad({ theme }: KeypadProps) {
    const [equation, setEquation] = React.useState(""); // Full equation string
    const [result, setResult] = React.useState<number | null | "">(""); // Current result

    const formatEquation = (equation: string): string => {
        return equation.replace(/(\.\d*?)0+(\s|$)/g, "$1$2"); // Trim trailing zeros after decimal
    };

    const calculateResult = (equation: string): number | null => {
        try {
            const sanitizedEquation = equation.replace(/(\d+)\s?%/g, (_, num, offset, fullEq) => {
                const previousValue = fullEq.slice(0, offset).trim().match(/(\d+(\.\d+)?)(?=\s?[+\-*/])/);
                if (previousValue) {
                    return `(${previousValue[0]} * ${num} / 100)`;
                } else {
                    return `(${num} / 100)`;
                }
            });

            const evalResult = eval(sanitizedEquation); // Evaluate sanitized equation
            return Number.isFinite(evalResult) ? evalResult : null;
        } catch {
            return null; // Return null if evaluation fails
        }
    };

    const handleNumberPress = (buttonValue: string) => {
        setEquation((prev) => {
            if (prev === "0" && buttonValue === "0") return "0";
            if (prev === "0" && buttonValue !== ".") return buttonValue;
            return prev + buttonValue;
        });

        const intermediateResult = calculateResult(equation + buttonValue);
        setResult(intermediateResult);
    };

    const handleOperationPress = (buttonValue: string) => {
        if (buttonValue === "%") {
            if (equation && /[0-9.]$/.test(equation)) {
                const updatedEquation = equation + `%`;
                setEquation(updatedEquation);
                const intermediateResult = calculateResult(updatedEquation);
                setResult(intermediateResult);
            }
        } else if (equation && /[0-9.%]$/.test(equation)) {
            setEquation((prev) => prev + ` ${buttonValue} `);
        }
    };

    const handleBackspace = () => {
        setEquation((prev) => {
            const updated = prev.trimEnd().slice(0, -1).trimEnd();
            const intermediateResult = calculateResult(updated);
            setResult(intermediateResult);
            return updated;
        });
    };

    const handleToggleSign = () => {
        setEquation((prev) => {
            const match = prev.match(/(-?\d+(\.\d+)?)(?!.*\d)/);
            if (match) {
                const lastNumber = match[0];
                const toggledNumber = lastNumber.startsWith("-")
                    ? lastNumber.slice(1)
                    : `-${lastNumber}`;
                const updatedEquation = prev.slice(0, match.index) + toggledNumber;
                const updatedResult = calculateResult(updatedEquation);
                setResult(updatedResult);
                return updatedEquation;
            }
            return prev;
        });
    };

    const handleEqualPress = () => {
        const finalResult = calculateResult(equation);
        if (finalResult !== null) {
            setEquation(finalResult.toString());
            setResult("");
        }
    };

    const clear = () => {
        setEquation("");
        setResult("");
    };

    const resultDisplay = () => {
        if (result === null || result === "") {
            return <Text style={Styles.screenFirstNumber}>{""}</Text>;
        }

        const resultString = result.toString();

        // Set the font size based on the length of the result
        if (resultString.length < 6) {
            return <Text style={Styles.screenFirstNumber}>{result}</Text>;
        } else if (resultString.length < 10) {
            return <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>{result}</Text>;
        } else {
            return <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>{result}</Text>;
        }
    };


    return (
        <View style={Styles.viewBottom}>
            {/* Display equation */}
            <View style={{ height: 120, width: "90%", justifyContent: "flex-end", alignSelf: "center" }}>
                <Text style={[Styles.screenSecondNumber, { color: theme === "light" ? "black" : "white" }]}>{formatEquation(equation) || ""}</Text>
            </View>

            {/* Display result */}
            <View style={{ height: 120, width: "90%", justifyContent: "center", alignSelf: "center" }}>
                <Text style={[{ alignSelf: "flex-end" }, { color: theme === "light" ? "black" : "white" }]}>{resultDisplay()}</Text>
            </View>

            {/* Keyboard rows */}
            <View style={Styles.row}>
                <Button title="C" isGray onPress={clear} />
                <Button title="+/-" isGray onPress={handleToggleSign} />
                <Button title="%" isGray onPress={() => handleOperationPress("%")} />
                <Button title="/" isBlue onPress={() => handleOperationPress("/")} />
            </View>
            <View style={Styles.row}>
                <Button title="7" onPress={() => handleNumberPress("7")} />
                <Button title="8" onPress={() => handleNumberPress("8")} />
                <Button title="9" onPress={() => handleNumberPress("9")} />
                <Button title="*" isBlue onPress={() => handleOperationPress("*")} />
            </View>
            <View style={Styles.row}>
                <Button title="4" onPress={() => handleNumberPress("4")} />
                <Button title="5" onPress={() => handleNumberPress("5")} />
                <Button title="6" onPress={() => handleNumberPress("6")} />
                <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
            </View>
            <View style={Styles.row}>
                <Button title="1" onPress={() => handleNumberPress("1")} />
                <Button title="2" onPress={() => handleNumberPress("2")} />
                <Button title="3" onPress={() => handleNumberPress("3")} />
                <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
            </View>
            <View style={Styles.row}>
                <Button title="." onPress={() => handleNumberPress(".")} />
                <Button title="0" onPress={() => handleNumberPress("0")} />
                <Button title="⌫" onPress={handleBackspace} />
                <Button title="=" isGreen onPress={handleEqualPress} />
            </View>

            {/* Footer with "calc by Sahil" as per the Requirement*/}
            <View style={Styles.footer}>
                <View style={Styles.line} />
                <Text style={Styles.footerText}>Calc by Sahil</Text>
            </View>
        </View>
    );
}
