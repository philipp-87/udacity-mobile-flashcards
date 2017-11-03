import { AsyncStorage } from "react-native";
import { Permissions, Notifications } from "expo";

const FLASHCARDS_NOTIFICATIONS_KEY = "Udacity:notifications";

const newNotification = {
    title: "Get to work!",
    body: "You haven't studied your flashcards today!",
    ios: {
        sound: true
    }
};

export const clearNotification = () => {
    AsyncStorage.removeItem(FLASHCARDS_NOTIFICATIONS_KEY);
    Notifications.cancelAllScheduledNotificationsAsync();
};

export const setNotification = () => {
    AsyncStorage.getItem(FLASHCARDS_NOTIFICATIONS_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(
                    Permissions.NOTIFICATIONS
                ).then(({ status }) => {
                    if (status === "granted") {
                        Notifications.cancelAllScheduledNotificationsAsync();
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        tomorrow.setHours(20);
                        tomorrow.setMinutes(0);
                        Notifications.scheduleLocalNotificationAsync(
                            newNotification,
                            {
                                time: tomorrow,
                                repeat: "day"
                            }
                        );
                        AsyncStorage.setItem(
                            FLASHCARDS_NOTIFICATIONS_KEY,
                            JSON.stringify(true)
                        );
                    }
                });
            }
        });
};
