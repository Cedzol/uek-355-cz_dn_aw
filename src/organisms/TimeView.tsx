import {StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";

/**
 * Component for displaying a time view with hours and minutes.
 *
 * @param {any} props - The component props.
 * @param {string} props.hours - The hours value to display.
 * @param {string} props.minutes - The minutes value to display.
 * @param {number} props.fontSize - The font size of the time view.
 * @returns {JSX.Element} The rendered time view component.
 */
export default function TimeView (props : any){

    const [hours, setHours] = useState<string>(props.hours)

    const [minutes, setMinutes] = useState<string>(props.minutes)

    useEffect(() => {
        if (props.hours.toString().length < 2){
            setHours("0" + props.hours.toString())
        }
        else {
            setHours(props.hours)
        }
        if (props.minutes.toString().length < 2){
            setMinutes("0" + props.minutes.toString())
        }
        else {
            setMinutes(props.minutes)
        }

    }, [props])

    return (
        <View>
            <Text >
                <View style={styles.textBox}>
                    <Text style={[styles.text, {fontSize: props.fontSize}]}>{hours}</Text>
                </View>
                <View>
                    <Text style={[styles.divider, {fontSize: props.fontSize}]}>:</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={[styles.text, {fontSize: props.fontSize}]}>{minutes}</Text>
                </View>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text : {
        fontSize : 26,
        color: '#bfc0c3',
        paddingLeft : 5,
        paddingRight : 5,
        paddingTop : 5,
        paddingBottom : 5
    },

    divider : {
        color: '#bfc0c3',
        fontSize : 26,
        marginLeft : 10,
        marginRight : 10
    },

    textBox : {
        backgroundColor : '#474850',
        borderRadius : 4,
    }
});