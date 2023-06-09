import {StyleSheet, Text, View} from "react-native";

export default function WeekdaySelector(props : any){
    return (
        <View style={styles.container}>
            <Text style={{fontSize : 18}}>{props.weekday}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5600e3',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#C7C6CA',
        width : 32,
        height : 32,
        borderRadius : 16
    },
});
