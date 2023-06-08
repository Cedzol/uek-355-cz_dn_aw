import { Appearance, Dimensions, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
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

    const [isDarkMode, setIsDarkMode] = useState(false);

    const topBarColor = isDarkMode ? 'white' : 'black';
const iconColor = isDarkMode ? 'black' : 'white';

    useEffect(() => {
        const currentMode = Appearance.getColorScheme();
        setIsDarkMode(currentMode === 'dark');
      }, []);
      
    let r1: Reminder = {
        title: "Badge",
        details: "Badge nicht vergessen",
        repetition: RepetitionType.Daily,
        time: {
            hours: '13',
            minutes: '00'
        }
    }

    let r2: Reminder = {
        title: "pause",
        details: "10 uhr pause",
        repetition: RepetitionType.Weekly,
        daysOfWeek: [2, 3, 4],
        time: {
            hours: '10',
            minutes: '00'
        }
    }

    let r3: Reminder = {
        title: "Saufen",
        details: "Wochenende, saufen!",
        repetition: RepetitionType.Unique,
        time: {
            hours: '10',
            minutes: '00'
        },
        specificUniqueDate: new Date("2005-09-12")
    }

    let r4: Reminder = {
        title: "Saufen",
        details: "Wochenende, saufen!",
        repetition: RepetitionType.Unique,
        time: {
            hours: '10',
            minutes: '00'
        },
        specificUniqueDate: new Date("2005-09-12")
    }

    let r5: Reminder = {
        title: "Saufen",
        details: "Wochenende, saufen!",
        repetition: RepetitionType.Unique,
        time: {
            hours: '10',
            minutes: '00'
        },
        specificUniqueDate: new Date("2005-09-12")
    }

    const [reminders, setReminders] = useState([r1, r2, r3, r4, r5, r5])

    return (
        <ScrollView>
            <View>
            <StatusBar backgroundColor={topBarColor} barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
            <View style={styles.topBar}>
        <Text style={styles.title}>RemindMe!</Text>
      </View>
                {reminders.map((reminder: Reminder, index) => (
                    <List.Item
                        key={index}
                        title={reminder.title}
                        description={() => (
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.textTitle}>{reminder.title}</Text>
                                    <View style={{ marginLeft: 'auto' }}>
                                        <TimeView reminder={reminder}></TimeView>
                                    </View>
                                </View>
                                <Text style={styles.textDetail}>{reminder.details}</Text>
                                <RepetitionView reminder={reminder}></RepetitionView>

                            </View>
                        )}
                        style={styles.listItem}
                    />
                )
                )}
                <View style={{ flex: 1 }}>
                    {/* Your main content */}
                </View>

            </View>

            <View style={styles.addButtonContainer}>
                        <Icon name="plus" size={24} color="#DCE2F9" />
                    </View>

        </ScrollView>
        
        
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        flex: 1,
        backgroundColor: '#1D1B20',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#C7C6CA'
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
        height: 150,
        borderStyle: "solid",
        backgroundColor: "#25232A",
        borderColor: "#3c3d45",
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 20,
        elevation: 4,
    },

    textTitle: {
        fontSize: 18,
        color: '#bfc0c3'
    },

    textDetail: {
        fontSize: 12,
        color: '#bfc0c3',
    }

});
