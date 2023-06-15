import {Animated, Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Card, DefaultTheme, Provider} from 'react-native-paper';
import React, {useCallback, useState} from 'react';
import {Reminder} from '../../assets/models/Reminder';
import {RepetitionType} from '../../assets/models/Enums';
import TimeView from '../components/TimeView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Font from 'expo-font';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RepetitionView from "../components/RepetitionView";
import NotificationCentre from "../components/NotificationCentre";

SplashScreen.preventAutoHideAsync();

const MD3Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#DCE2F9',
        background: '#1D1B20',
        surface: '#25232A',
        text: '#C7C6CA',
        placeholder: '#BFC0C3',
        accent: '#404659',
        error: '#F44336',
        disabled: '#9E9E9E',
    },
};

type RootStackParamList = {
    MainPageList: undefined;
    CreateReminder: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'MainPageList'>;

export default function MainPageList({navigation, route}: Props) {

    useFonts({
        'ProductSans-Regular': require('../fonts/ProductSans-Regular.ttf'),
    });

    let r1: Reminder = {
        title: 'Badge',
        details: 'Badge nicht vergessen',
        repetition: RepetitionType.Daily,
        time: {
            hours: '11',
            minutes: '11',
        },
        nextReminderExecution: new Date('2023-06-10 13:00'),
    };

    let r2: Reminder = {
        title: 'pause',
        details: '10 uhr pause',
        repetition: RepetitionType.Weekly,
        daysOfWeek: [2, 3, 4],
        time: {
            hours: '10',
            minutes: '00',
        },
        nextReminderExecution: new Date('2023-06-14 10:00'),
    };

    let r3: Reminder = {
        title: 'Saufen',
        details: 'Wochenende, saufen!',
        repetition: RepetitionType.Unique,
        time: {
            hours: '10',
            minutes: '00',
        },
        specificUniqueDate: new Date('2023-06-12'),
        nextReminderExecution: new Date('2023-06-12 10:00'),
    };

    let r4: Reminder = {
        title: 'Saufen',
        details: 'Wochenende, saufen!',
        repetition: RepetitionType.Unique,
        time: {
            hours: '10',
            minutes: '00',
        },
        specificUniqueDate: new Date('2023-06-13'),
        nextReminderExecution: new Date('2023-06-13 10:00'),
    };

    let r5: Reminder = {
        title: 'Saufen',
        details: 'Wochenende, saufen!',
        repetition: RepetitionType.Unique,
        time: {
            hours: '10',
            minutes: '00',
        },
        specificUniqueDate: new Date('2023-06-15'),
        nextReminderExecution: new Date('2023-06-14 10:00'),
    };

    let r6: Reminder = {
        title: 'Atmen',
        details: 'Luft ist wichtig',
        repetition: RepetitionType.Hourly,
        time: {
            hours: '10',
            minutes: '54',
        },
        nextReminderExecution: new Date('2023-06-09 9:05'),
    };

    const [reminders, setReminders] = useState([r1, r2, r3, r4, r5, r6]);

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

    const scrollY = new Animated.Value(0);
    const topBarBackgroundColor = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: ['#1D1B20', '#2F2C35'],
        extrapolate: 'clamp',
    });

    return (
        <Provider theme={MD3Theme}>
            <View style={styles.container} onLayout={onLayoutRootView}>
                <Animated.View style={[styles.topBar, {backgroundColor: topBarBackgroundColor}]}>
                    <Text style={styles.title}>RemindMe!</Text>
                </Animated.View>
                <ScrollView
                    style={{ paddingTop: 30 }}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
                    scrollEventThrottle={16}
                >
                    <View style={styles.content}>
                        {reminders.map((reminder: Reminder, index) => (
                            <Card key={index} style={styles.card}>
                                <Card.Content style={styles.cardContent}>
                                    <View style={styles.cardTitleContainer}>
                                        <Text style={[styles.cardTitle, { flex: 1 }]}>{reminder.title}</Text>
                                        <TimeView hours={reminder.time.hours} minutes={reminder.time.minutes} fontSize={26}></TimeView>
                                    </View>
                                    <Text style={styles.cardDetail}>{reminder.details}</Text>
                                    <View style={styles.repetitionView}>
                                        <RepetitionView reminder={reminder} />
                                    </View>
                                </Card.Content>
                            </Card>
                        ))}
                    </View>
                </ScrollView>

            </View>
            <View style={styles.addButtonContainer}>
                <Button onPress={() => NotificationCentre(r2, 3, "1")}>
                    Schedule
                </Button>
                <Button onPress={() => navigation.navigate('CreateReminder')}>
                    <Icon name="plus" size={24} color="#DCE2F9"/>
                </Button>
            </View>
        </Provider>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1D1B20',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    repetitionView: {
        flex: 1,
        paddingTop: 15,
    },
    timeView: {
        alignSelf: 'flex-end',
    },
    topBar: {
        width: Dimensions.get('window').width,
        paddingTop: 30,
        marginTop: 0,
        height: 90,
        borderBottomWidth: 1,
        borderBottomColor: '#3c3d45',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    title: {
        paddingTop: 0,
        fontFamily: 'ProductSans-Regular',
        fontSize: 24,
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
        elevation: 6,
    },
    card: {
        width: Dimensions.get('window').width / 1.1,
        backgroundColor: '#25232A',
        marginBottom: 15,
        elevation: 4,
    },
    cardTitle: {
        color: '#C7C6CA',
        fontSize: 20,
    },
    cardContent: {
        flexDirection: 'column',
    },
    cardTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardDetail: {
        color: '#bfc0c3',
        fontSize: 12,
        paddingTop: 4,
    },
    textDetail: {
        paddingTop: 4,
        fontSize: 12,
        color: '#bfc0c3',
    },
    content: {
        marginTop: 70,
        width: '100%',
        alignItems: 'center',
        marginBottom: 50,
    },
});
