import { Appearance, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, List } from 'react-native-paper';
import { useEffect, useState } from "react";
import { Reminder } from "../../assets/models/Reminder";
import { RepetitionType } from "../../assets/models/Enums";
import TimeView from "../components/TimeView";
import RepetitionView from "../components/RepetitionView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts } from 'expo-font';
import React from "react";

export default function MainPageList() {

    useFonts({
        'ProductSans-Regular': require('../fonts/ProductSans-Regular.ttf'),
    });

    let r1: Reminder = {
        title: "Badge",
        details: "Badge nicht vergessen",
        repetition: RepetitionType.Daily,
        time: {
            hours: '13',
            minutes: '00'
        },
        nextReminderExecution : new Date("2023-06-10 13:00")
    }

    let r2: Reminder = {
        title: "pause",
        details: "10 uhr pause",
        repetition: RepetitionType.Weekly,
        daysOfWeek: [2, 3, 4],
        time: {
            hours: '10',
            minutes: '00'
        },
        nextReminderExecution : new Date("2023-06-14 10:00")
    }

    let r3: Reminder = {
        title: "Saufen",
        details: "Wochenende, saufen!",
        repetition: RepetitionType.Unique,
        time: {
            hours: '10',
            minutes: '00'
        },
        specificUniqueDate: new Date("2023-06-12"),
        nextReminderExecution : new Date("2023-06-12 10:00")
    }

    let r4: Reminder = {
        title: "Saufen",
        details: "Wochenende, saufen!",
        repetition: RepetitionType.Unique,
        time: {
            hours: '10',
            minutes: '00'
        },
        specificUniqueDate: new Date("2023-06-13"),
        nextReminderExecution : new Date("2023-06-13 10:00")
    }

    let r5: Reminder = {
        title: "Saufen",
        details: "Wochenende, saufen!",
        repetition: RepetitionType.Unique,
        time: {
            hours: '10',
            minutes: '00'
        },
        specificUniqueDate: new Date("2023-06-14"),
        nextReminderExecution : new Date("2023-06-14 10:00")
    }

    let r6 : Reminder = {
        title: "Atmen",
        details: "Luft ist wichtig",
        repetition: RepetitionType.Hourly,
        time: {
            hours: '10',
            minutes: '05'
        },
        nextReminderExecution : new Date("2023-06-09 9:05")
    }

    const [reminders, setReminders] = useState([r1, r2, r3, r4, r5, r6])

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.topBar}>
                    <Text style={styles.title}>RemindMe!</Text>
                </View>
                <ScrollView style={styles.content}>
                    {reminders.map((reminder: Reminder, index) => (
                        <List.Item
                            key={index}
                            title={reminder.title}
                            titleStyle={{color: '#C7C6CA', fontSize : 20}}
                            description={() => (
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.textDetail}>{reminder.details}</Text>
                                        <View style={{ marginLeft: 'auto' }}>
                                            <TimeView reminder={reminder}></TimeView>
                                        </View>
                                    </View>
                                    <View style={styles.repetitionView}>
                                        <RepetitionView reminder={reminder}></RepetitionView>
                                    </View>

                                </View>
                            )}
                            style={styles.listItem}
                        />
                    )
                    )}
                </ScrollView>
            </View>
            <View style={styles.addButtonContainer}>
                <Icon name="plus" size={24} color="#DCE2F9" />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#1D1B20',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#C7C6CA'
    },

    repetitionView : {
        paddingTop : 15
    },

    topBar: {
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#999999',
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        paddingTop: 20,
        fontFamily: 'ProductSans-Regular',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },

    addButtonContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#404659',
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4, // Add shadow if desired
    },

    listItem: {
        width: Dimensions.get('window').width / 1.15,
        height: 155,
        borderStyle: "solid",
        backgroundColor: "#25232A",
        borderColor: "#3c3d45",
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 20,
        elevation: 4,
        color: '#C7C6CA'
    },


    textDetail: {
        paddingTop : 4,
        fontSize: 12,
        color: '#bfc0c3',
    },

    content: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 16,
      },

});
