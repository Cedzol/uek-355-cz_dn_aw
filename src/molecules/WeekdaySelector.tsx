import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

/**
 * Component for rendering a weekday selector.
 *
 * @param {any} props - The component props.
 * @param {string} props.color - The background color of the weekday selector.
 * @param {string} props.fontColor - The font color of the weekday selector.
 * @param {string} props.weekday - The name of the weekday.
 * @returns {JSX.Element} The rendered weekday selector component.
 */
export default function WeekdaySelector(props: any) {
    const [backgroundColor, setBackgroundColor] = useState(props.color);

    useEffect(() => {
        setBackgroundColor(props.color);
    }, [props]);

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <Text style={{ fontSize: 18, color: props.fontColor }}>{props.weekday}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#C7C6CA',
        width: 40,
        height: 40,
        borderRadius: 66,
        borderColor: "#8F909A",
        borderWidth: 1,
    },
});
