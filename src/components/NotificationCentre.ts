import * as Notifications from 'expo-notifications';
import {Reminder} from "../../assets/models/Reminder";
import {RepetitionType} from "../../assets/models/Enums";

export default function NotificationCentre(reminder : Reminder, weekday : number | null, identifier : string) {

        // Request permissions for push notifications
        const registerForPushNotifications = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to receive notifications was denied');
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

                        if (reminder.repetition == RepetitionType.Hourly) {
                            trigger = {
                                hour : +reminder.time.hours,
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
                                    title: reminder.title,
                                    body: reminder.details,
                                },
                                trigger : trigger
                            }).then((notificationId) => {
                                console.log('Scheduled notification:', notificationId);
                            });
                        };

                        notificationRequest()

                        if (reminder.repetition == RepetitionType.Hourly){
                            const scheduleNextNotification = () => {
                                const now = new Date();
                                const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, +reminder.time.minutes, 0);
                                const timeout = nextHour.getTime() - now.getTime();
                                console.log("reschedule")

                                setTimeout(() => {
                                    console.log("rescheduled")
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
        console.log('Notification sent');
    };

}
