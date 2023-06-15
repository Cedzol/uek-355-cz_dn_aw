import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Card, DefaultTheme, Provider, TouchableRipple } from 'react-native-paper';
import React, { useCallback, useState, useEffect } from 'react';
import { Reminder } from '../../assets/models/Reminder';
import { RepetitionType } from '../../assets/models/Enums';
import TimeView from '../organisms/TimeView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import RepetitionView from "../organisms/RepetitionView";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import NotificationCentre from "../organisms/NotificationCentre";

// Prevents the splash screen from automatically hiding when the component mounts
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

/**
 * Stack param list for the root stack navigator.
 */
type RootStackParamList = {
    MainPageList: undefined;
    CreateReminder: undefined;
    UpdateReminder: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'MainPageList'>;

/**
 * Main page list component.
 * @param navigation - The navigation object.
 * @param route - The route object.
 */
export default function MainPageList({ navigation, route }: Props) {
    // Load fonts
    const [fontsLoaded] = Font.useFonts({
        'ProductSans-Regular': require('./../fonts/ProductSans-Regular.ttf'),
    });

    /**
     * Callback function for onLayout event of the root view.
     * @returns {Promise<void>} - A promise that resolves when the fonts are loaded and the splash screen is hidden.
     */
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    // Hide splash screen if fonts are loaded
    useEffect(() => {
        onLayoutRootView();
    }, [onLayoutRootView]);

    const scrollY = new Animated.Value(0);
    const topBarBackgroundColor = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: ['#1D1B20', '#2F2C35'],
        extrapolate: 'clamp',
    });

    // State to store fetched reminders
    const [fetchedReminders, setFetchedReminders] = useState<Reminder[]>([]);

    // Fetch reminders when the screen gains focus
    useFocusEffect(
        useCallback(() => {
            const fetchReminders = async () => {
                setFetchedReminders([]); // Clear the state before fetching reminders

                const storageKeys: readonly string[] = await AsyncStorage.getAllKeys();
                const getItemsPromises: Promise<void>[] = [];

                for (const storageKey of storageKeys) {
                    const savedReminderPromise = AsyncStorage.getItem(storageKey);

                    const promise = savedReminderPromise.then((savedReminder: string | null) => {
                        if (typeof savedReminder === 'string') {
                            const currentReminder = JSON.parse(savedReminder);
                            setFetchedReminders((prevReminders) => [...prevReminders, currentReminder]);
                        }
                    }).catch((error: any) => {
                        console.log(error);
                    });

                    getItemsPromises.push(promise);
                }

                Promise.all(getItemsPromises).then(() => {
                    // All reminders have been fetched and added to state
                });
            };

            fetchReminders();

            return () => {
                // Cleanup function when the screen loses focus
                // (Optional: perform any necessary cleanup here)
            };
        }, [])
    );

    return (
        <Provider theme={MD3Theme}>
            <View style={styles.container} onLayout={onLayoutRootView}>
                <Animated.View style={[styles.topBar, {backgroundColor: topBarBackgroundColor}]}>
                    <Text style={styles.title}>RemindMe!</Text>
                </Animated.View>
                <ScrollView
                    style={{paddingTop: 30}}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: false})}
                    scrollEventThrottle={16}
                >
                    <View style={styles.content}>
                        {fetchedReminders.map((reminder: Reminder, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate('UpdateReminder', { reminder })}
                            >
                            <Card key={index} style={styles.card}>
                                    <Card.Content style={styles.cardContent}>
                                        <View style={styles.cardTitleContainer}>
                                            <Text style={[styles.cardTitle, { flex: 1 }]}>{reminder.text}</Text>
                                            <TimeView hours={reminder.time.hours} minutes={reminder.time.minutes} fontSize={26} />
                                        </View>
                                        <Text style={styles.cardDetail}>{reminder.details}</Text>
                                        <View style={styles.repetitionView}>
                                            <RepetitionView reminder={reminder} />
                                        </View>
                                    </Card.Content>
                                </Card>
                            </TouchableOpacity>
                        ))}
                    </View>

                </ScrollView>

            </View>
            <View style={styles.addButtonContainer}>
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
