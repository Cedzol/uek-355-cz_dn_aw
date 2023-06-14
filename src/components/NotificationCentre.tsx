import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function NotificationCentre() {
    useEffect(() => {
        // Request permissions for push notifications
        const registerForPushNotifications = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to receive notifications was denied');
                return;
            }
        };

        registerForPushNotifications();

        /*
        const scheduleNotification = async () => {
            try {
                await Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldShowAlert: true,
                        shouldPlaySound: false,
                        shouldSetBadge: false,
                    }),
                });

                const trigger = {
                    seconds: 10,
                    repeats: true,
                };

                const notificationRequest = () => {
                    Notifications.scheduleNotificationAsync({
                        content: {
                            title: 'Notification Title',
                            body: 'This is a notification from Expo!',
                        },
                        trigger,
                    }).then((notificationId) => {
                        console.log('Scheduled notification:', notificationId);
                    });
                };

                const scheduleNextNotification = (timeout) => {
                    setTimeout(() => {
                        notificationRequest();
                        scheduleNextNotification(timeout);
                    }, timeout * 1000);
                };

                scheduleNextNotification(trigger.seconds);
            } catch (error) {
                console.log('Error scheduling notifications:', error);
            }
        };

        scheduleNotification()

        return () => {
            Notifications.cancelAllScheduledNotificationsAsync();
        };

         */
    }, []);



    const sendNotification = async () => {
        await Notifications.presentNotificationAsync({
            title: 'Immediate Notification',
            body: 'Hello',
        });
        console.log('Notification sent');
    };


    return (
        <View>
        </View>
    );
}
