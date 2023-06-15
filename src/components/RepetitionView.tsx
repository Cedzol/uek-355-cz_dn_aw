import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { Chip } from 'react-native-paper';
import { RepetitionType } from '../../assets/models/Enums';
import { Reminder } from '../../assets/models/Reminder';
import moment from 'moment';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RepetitionView(props: { reminder: Reminder }) {
    const { reminder } = props;

    const daysOfWeek: string[] = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

    let dayString: string[] = [];

    if (reminder.repeatFrequency === RepetitionType.Weekly) {
        for (let d of reminder.daysOfWeek!) {
            dayString.push(' ' + daysOfWeek[d-1]);
        }
    }

    const repeatFrequency = getRepeatFrequency(reminder.repeatFrequency);

    const [fontsLoaded] = Font.useFonts({
        'ProductSans-Regular': require('./../fonts/ProductSans-Regular.ttf'),
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
            <Chip icon={reminder.repeatFrequency === RepetitionType.Unique ? 'numeric-1' : 'repeat'} mode='outlined' style={styles.chip}>
                {reminder.repeatFrequency === RepetitionType.Unique ? (
                    <Text style={[styles.text, { marginLeft: 10 }]}>
                        {reminder.repeatFrequency + ', ' + moment(reminder.uniqueDate).format('DD.MM.YYYY')}
                    </Text>
                ) : null}

                {reminder.repeatFrequency === RepetitionType.Hourly ? (
                    <Text style={[styles.text, { marginLeft: 10 }]}>{repeatFrequency}</Text>
                ) : null}

                {reminder.repeatFrequency === RepetitionType.Daily ? (
                    <Text style={[styles.text, { marginLeft: 10 }]}>{repeatFrequency}</Text>
                ) : null}

                {reminder.repeatFrequency === RepetitionType.Weekly ? (
                    <Text style={[styles.text, { marginLeft: 10 }]}>
                        {repeatFrequency + ',' + dayString}
                    </Text>
                ) : null}
            </Chip>
        </View>
    );
}

const getRepeatFrequency = (repetitionType: RepetitionType): string => {
    switch (repetitionType) {
        case RepetitionType.Unique:
            return 'Einmalig';
        case RepetitionType.Hourly:
            return 'Stündlich';
        case RepetitionType.Daily:
            return 'Täglich';
        case RepetitionType.Weekly:
            return 'Wöchentlich';
        default:
            return '';
    }
};

const styles = StyleSheet.create({
    chip: {
        alignSelf: 'flex-start',
    },
    text: {
        fontFamily: 'ProductSans-Regular',
        color: '#B2C5FF',
        fontSize: 14,
    },
});
