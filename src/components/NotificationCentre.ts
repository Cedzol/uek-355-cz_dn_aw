import * as Notifications from 'expo-notifications';
import {Reminder} from "../../assets/models/Reminder";
import {RepetitionType} from "../../assets/models/Enums";

export default function NotificationCentre(reminder : Reminder, weekday : number, identifier : string) {

        // Request permissions for push notifications
        const registerForPushNotifications = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to receive notifications was denied');
                return;
            }
        };

        registerForPushNotifications();


        const scheduleNotification = async (reminder : Reminder, weekday : number, identifier : string) => {
            try {
                await Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldShowAlert: true,
                        shouldPlaySound: false,
                        shouldSetBadge: false,
                    }),
                });

                let trigger : {}= {
                }

                if (reminder.repetition == RepetitionType.Hourly) {
                    trigger = {
                        hour : +reminder.time.hours * 60,
                        minute : +reminder.time.minutes,
                        repeats : true
                    }
                } else if (reminder.repetition == RepetitionType.Daily){
                    trigger = {
                        hour : +reminder.time.hours,
                        minute : +reminder.time.minutes,
                        repeats : true
                    }
                } else if (reminder.repetition == RepetitionType.Unique){
                    reminder.specificUniqueDate!.setHours(+reminder.time.hours);
                    reminder.specificUniqueDate!.setMinutes(+reminder.time.minutes)
                    trigger = {
                        date : reminder.specificUniqueDate!
                    }
                } else if (reminder.repetition == RepetitionType.Weekly){
                    trigger = {
                        weekday : weekday,
                        repeats : true
                    }
                }

                const notificationRequest = () => {
                    Notifications.scheduleNotificationAsync({
                        identifier : "1",
                        content: {
                            title: reminder.title,
                            body: reminder.details,
                        },
                        trigger : trigger
                    }).then((notificationId) => {
                        console.log('Scheduled notification:', notificationId);
                    });
                };

                //Notifications.cancelScheduledNotificationAsync() for removing notifications of type weekly under same identifier

                const scheduleNextNotification = (timeout) => {
                    setTimeout(() => {
                        notificationRequest();
                        scheduleNextNotification(timeout);
                    }, timeout * 1000);
                };

                //scheduleNextNotification(trigger);
            } catch (error) {
                console.log('Error scheduling notifications:', error);
            }
        };

        //scheduleNotification(reminder)

        return () => {
            Notifications.cancelAllScheduledNotificationsAsync();
        };






    const sendNotification = async () => {
        await Notifications.presentNotificationAsync({
            title: 'Immediate Notification',
            body: 'Hello',
        });
        console.log('Notification sent');
    };

}
