import * as Notifications from 'expo-notifications';
import {Reminder} from "../../assets/models/Reminder";
import {RepetitionType} from "../../assets/models/Enums";

export default function NotificationCentre(reminder : Reminder, weekday : number | null, identifier : string) {

        // Request permissions for push notifications
        const registerForPushNotifications = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
        };

        registerForPushNotifications();


        const scheduleNotification = async (reminder : Reminder, weekday : number | null, identifier : string) => {

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

                        if (reminder.repeatFrequency == RepetitionType.Hourly) {
                            trigger = {
                                hour : +reminder.time.hours,
                                minute : +reminder.time.minutes,
                                repeats : true
                            }
                        } else if (reminder.repeatFrequency == RepetitionType.Daily){
                            trigger = {
                                hour : +reminder.time.hours,
                                minute : +reminder.time.minutes,
                                repeats : true
                            }
                        } else if (reminder.repeatFrequency == RepetitionType.Unique){
                            reminder.uniqueDate!.setHours(+reminder.time.hours);
                            reminder.uniqueDate!.setMinutes(+reminder.time.minutes)
                            trigger = {
                                date : reminder.uniqueDate!
                            }
                        } else if (reminder.repeatFrequency == RepetitionType.Weekly){
                            trigger = {
                                hour : +reminder.time.hours,
                                minute : +reminder.time.minutes,
                                weekday : weekday,
                                repeats : true
                            }
                        }

                        const notificationRequest = () => {
                            Notifications.scheduleNotificationAsync({
                                identifier : identifier,
                                content: {
                                    title: reminder.text,
                                    body: reminder.details,
                                },
                                trigger : trigger
                            });
                        };

                        notificationRequest()

                        if (reminder.repeatFrequency == RepetitionType.Hourly){
                            const scheduleNextNotification = () => {
                                const now = new Date();
                                const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, +reminder.time.minutes, 0);
                                const timeout = nextHour.getTime() - now.getTime();

                                setTimeout(() => {
                                    notificationRequest();
                                    scheduleNextNotification();
                                }, timeout);
                            };

                            scheduleNextNotification();
                        }


                return () => {
                    Notifications.cancelAllScheduledNotificationsAsync();
                };
            } catch (error) {
                console.log('Error scheduling notifications:', error);
            }
        };

        scheduleNotification(reminder, weekday, identifier)

        return () => {
            Notifications.cancelAllScheduledNotificationsAsync();
        };


    const sendNotification = async () => {
        await Notifications.presentNotificationAsync({
            title: 'Immediate Notification',
            body: 'Hello',
        });
    };

}

export function deleteNotifications(identifier : string){
    Notifications.cancelScheduledNotificationAsync(identifier);
}
