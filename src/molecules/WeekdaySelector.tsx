import {StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";

export default function WeekdaySelector(props : any){

    const [backgroundColor, setBackgroundColor] = useState(props.color)

    useEffect(() => {
        setBackgroundColor(props.color)
    }, [props])

    return (
        <View style={[styles.container, {backgroundColor : backgroundColor}]}>
            <Text style={{fontSize : 18, color : props.fontColor}}>{props.weekday}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#C7C6CA',
        width : 32,
        height : 32,
        borderRadius : 16,
        borderColor : "#C5C6D0",
        borderWidth : 1,
    },

});
