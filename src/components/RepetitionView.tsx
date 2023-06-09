import {StyleSheet, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";
import {RepetitionType} from "../../assets/models/Enums";
import {Reminder} from "../../assets/models/Reminder";
import moment from "moment";

export default function RepetitionView(props : any) {

    const reminder : Reminder = props.reminder;

    const daysOfWeek : string[] = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]

    let dayString : string [] = []

    if (reminder.repetition == RepetitionType.Weekly) {
        for (let d of reminder.daysOfWeek!) {
            dayString.push(" " + daysOfWeek[d])
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.images}>
                {reminder.repetition == RepetitionType.Unique ?
                    <Icon name="repeat-once" size={25} color="#C7C6CA" />
                :
                    <Icon name="repeat" size={25} color="#C7C6CA" />
                }
                <View>
                    {reminder.repetition == RepetitionType.Unique ?
                    <Text style={styles.text}>{ reminder.repetition + ", " + (moment(reminder.specificUniqueDate)).format('DD.MM.YYYY') }</Text> : null}

                    {reminder.repetition == RepetitionType.Hourly ?
                        <Text style={styles.text}>{ reminder.repetition }</Text> : null}

                    {reminder.repetition == RepetitionType.Daily ?
                        <Text style={styles.text}>{ reminder.repetition }</Text> : null}

                    {reminder.repetition == RepetitionType.Weekly ?
                        <Text style={styles.text}>{ reminder.repetition + "," + dayString}</Text> : null}

                </View>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        borderStyle: "solid",
        borderRadius: 5,
        borderColor: '#bdbfca',
        borderWidth : 1,
        height: 40,
        justifyContent : "center",
    },

    images : {
        marginLeft : 10,
    },

    text : {
        color: '#bfc0c3',
        fontSize : 14,
    }
});
