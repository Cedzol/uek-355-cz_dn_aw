import {StyleSheet, Text, View} from "react-native";
import {Reminder} from "../../assets/models/Reminder";

export default function TimeView (props : any){



    return (
        <View>
            <Text >
                <View style={styles.textBox}>
                    <Text style={styles.textColor}>{props.reminder.time.hours}</Text>
                </View>
                <View>
                    <Text style={styles.divider}>:</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.textColor}>{props.reminder.time.minutes}</Text>
                </View>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textColor : {
        fontSize : 26,
        color: '#bfc0c3',
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
        padding : 2
    }
});