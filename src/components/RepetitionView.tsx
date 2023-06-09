import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { Chip } from 'react-native-paper';
import { RepetitionType } from '../../assets/models/Enums';
import { Reminder } from '../../assets/models/Reminder';
import moment from 'moment';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RepetitionView(props: any) {
    const reminder: Reminder = props.reminder;

    const daysOfWeek: string[] = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

    let dayString: string[] = [];

    if (reminder.repetition == RepetitionType.Weekly) {
        for (let d of reminder.daysOfWeek!) {
            dayString.push(' ' + daysOfWeek[d]);
        }
    }

    const [fontsLoaded] = Font.useFonts({
        'ProductSans-Regular': require('./../../assets/fonts/ProductSans-Regular.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View onLayout={onLayoutRootView}>
            <Chip
                icon={reminder.repetition === RepetitionType.Unique ? 'numeric-1' : 'repeat'}
                mode='outlined'
                style={styles.chip}
            >
                {reminder.repetition == RepetitionType.Unique ? (
                    <Text style={[styles.text, { marginLeft: 10 }]}>
                        {reminder.repetition + ', ' + moment(reminder.specificUniqueDate).format('DD.MM.YYYY')}
                    </Text>
                ) : null}

                {reminder.repetition == RepetitionType.Hourly ? (
                    <Text style={[styles.text, { marginLeft: 10 }]}>{reminder.repetition}</Text>
                ) : null}

                {reminder.repetition == RepetitionType.Daily ? (
                    <Text style={[styles.text, { marginLeft: 10 }]}>{reminder.repetition}</Text>
                ) : null}

                {reminder.repetition == RepetitionType.Weekly ? (
                    <Text style={[styles.text, { marginLeft: 10 }]}>
                        {reminder.repetition + ',' + dayString}
                    </Text>
                ) : null}

            </Chip>
        </View>
    );

}

const styles = StyleSheet.create({
    chip: {
        alignSelf: 'flex-start',
    },
    text: {
        fontFamily: 'ProductSans-Regular',
        color: '#B2C5FF',
        fontSize: 14,
    }
});
