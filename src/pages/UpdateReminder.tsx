import {Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useCallback, useState} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import IconA from "react-native-vector-icons/AntDesign";
import IconB from "react-native-vector-icons/Entypo";
import {Button, Card, Checkbox, PaperProvider, TextInput, TouchableRipple} from "react-native-paper";
import {TimePickerModal} from 'react-native-paper-dates'
import {TimeNumber} from "../../assets/models/Time";
import TimeView from "../components/TimeView";
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment/moment";
import {RepetitionType} from "../../assets/models/Enums";
import WeekdaySelector from "../molecules/WeekdaySelector";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import DropDown from "react-native-paper-dropdown";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Reminder} from '../../assets/models/Reminder';
import NotificationCentre, {deleteNotifications} from "../components/NotificationCentre";
import DropDownPicker from "react-native-dropdown-picker";

const theme = {
    "colors": {
        "primary": "rgb(176, 198, 255)",
        "onPrimary": "rgb(0, 45, 111)",
        "primaryContainer": "rgb(25, 67, 143)",
        "onPrimaryContainer": "rgb(217, 226, 255)",
        "secondary": "rgb(192, 198, 220)",
        "onSecondary": "rgb(41, 48, 66)",
        "secondaryContainer": "rgb(64, 70, 89)",
        "onSecondaryContainer": "rgb(220, 226, 249)",
        "tertiary": "rgb(224, 187, 221)",
        "onTertiary": "rgb(65, 39, 66)",
        "tertiaryContainer": "rgb(89, 61, 90)",
        "onTertiaryContainer": "rgb(253, 215, 250)",
        "error": "rgb(255, 180, 171)",
        "onError": "rgb(105, 0, 5)",
        "errorContainer": "rgb(147, 0, 10)",
        "onErrorContainer": "rgb(255, 180, 171)",
        "background": "rgb(27, 27, 31)",
        "onBackground": "rgb(227, 226, 230)",
        "surface": "rgb(27, 27, 31)",
        "onSurface": "rgb(227, 226, 230)",
        "surfaceVariant": "rgb(68, 70, 79)",
        "onSurfaceVariant": "rgb(197, 198, 208)",
        "outline": "rgb(143, 144, 153)",
        "outlineVariant": "rgb(68, 70, 79)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(227, 226, 230)",
        "inverseOnSurface": "rgb(48, 48, 52)",
        "inversePrimary": "rgb(55, 92, 168)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(34, 36, 42)",
            "level2": "rgb(39, 41, 49)",
            "level3": "rgb(43, 46, 56)",
            "level4": "rgb(45, 48, 58)",
            "level5": "rgb(48, 51, 62)"
        },
        "surfaceDisabled": "rgba(227, 226, 230, 0.12)",
        "onSurfaceDisabled": "rgba(227, 226, 230, 0.38)",
        "backdrop": "rgba(46, 48, 56, 0.4)"
    }
}

type RootStackParamList = {
    MainPageList: undefined;
    CreateReminder: undefined;
    UpdateReminder: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'UpdateReminder'>;

export default function UpdateReminder({navigation, route}: Props) {
    const reminder: Reminder = route.params.reminder;
    const id: Readonly<undefined> | undefined = route.params; // Retrieve the ID from the route params


    const repetitionList = [
        {
            label: "Stündlich",
            value: RepetitionType.Hourly
        },
        {
            label: "Täglich",
            value: RepetitionType.Daily
        },
        {
            label: "Wöchentlich",
            value: RepetitionType.Weekly
        }
    ]

    const [text, setText] = useState(reminder.text);

    const [details, setDetails] = useState(reminder.details);

    const [repetitionMode, setRepetitionMode] = useState<RepetitionType>(reminder.repeatFrequency)

    const [checked, setChecked] = useState(Boolean(reminder.repeating));

    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    let currentTime = new Date();

    const [time, setTime] = useState<TimeNumber>({
        hours: parseInt(reminder.time.hours),
        minutes: parseInt(reminder.time.minutes)
    })

    const [timePickerVisible, setTimePickerVisible] = useState(false);

    function onTimePickerDismiss() {
        setTimePickerVisible(false)
    }

    function onTimePickerConfirm(time: TimeNumber) {
        setTime(time)
        console.log(time)
        setTimePickerVisible(false)
    }

    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)

    const [uniqueDate, setUniqueDate] = useState<Date>(new Date())

    function onDatePickerDismiss() {
        setDatePickerVisible(false);
    }

    function onDatePickerConfirm(date: Date) {
        setUniqueDate(date)
        setDatePickerVisible(false);
    }

    const [weekdays, setWeekdays] = useState<string[]>(reminder.daysOfWeek ? reminder.daysOfWeek.map(String) : []);

    console.log(reminder.daysOfWeek)

    function handleWeekday(dayIndex: string) {
        if (weekdays.includes(dayIndex)) {
            console.log("splice");
            const newWeekdays = weekdays.filter((day) => day !== dayIndex);
            console.log(newWeekdays);
            setWeekdays(newWeekdays);
        } else {
            console.log("add");
            setWeekdays((prevWeekdays) => [...prevWeekdays, dayIndex]);
        }
    }

    const [fontsLoaded] = Font.useFonts({
        'ProductSans-Regular': require('./../fonts/ProductSans-Regular.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);


    const scrollY = new Animated.Value(0);
    const topBarBackgroundColor = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: ['#1D1B20', '#2F2C35'],
        extrapolate: 'clamp',
    });

    function genUniqueId(): string {
        const dateStr = Date
            .now()
            .toString(36); // convert num to base 36 and stringify

        const randomStr = Math
            .random()
            .toString(36)
            .substring(2, 8); // start at index 2 to skip decimal point

        return `${dateStr}-${randomStr}`;
    }

    function handleSubmit() {

        if (reminder.repeatFrequency == RepetitionType.Weekly){
            for (let i = 0; i < reminder.daysOfWeek!.length -1 ; i++){
                deleteNotifications(reminder.id + "-" + i)
            }
        }

        else {
            deleteNotifications(reminder.id)
        }
        const updatedReminder = {
            ...reminder,
            text: text,
            details: details,
            time: time,
            repeating: checked,
            uniqueDate: uniqueDate,
            repeatFrequency: repetitionMode,
            daysOfWeek: weekdays,
        };

        const updatedReminderObject = JSON.stringify(updatedReminder);

        AsyncStorage.mergeItem(reminder.id, updatedReminderObject).then(async () => {
            const keys = await AsyncStorage.getAllKeys();
            console.log(keys);
            navigation.goBack();

        });

        if (updatedReminder.repeatFrequency == RepetitionType.Weekly){
            for (let i = 0; i < updatedReminder.daysOfWeek.length ; i++){
                NotificationCentre({
                        id: id + "-" + i,
                        text: text,
                        details: details,
                        time: {
                            hours : updatedReminder.time.hours.toString(),
                            minutes : updatedReminder.time.minutes.toString(),
                        },
                        uniqueDate: uniqueDate,
                        repeatFrequency: repetitionMode,
                    },
                    +updatedReminder.daysOfWeek[i], updatedReminder.id)
            }
        }
        else {
            NotificationCentre({
                    id: id!,
                    text: text,
                    details: details,
                    time: {
                        hours : updatedReminder.time.hours.toString(),
                        minutes : updatedReminder.time.minutes.toString(),
                    },
                    uniqueDate: uniqueDate,
                    repeatFrequency: repetitionMode,
                },
                null, updatedReminder.id)
        }
    }

    async function handleDelete() {
        try {
            // Delete the item from AsyncStorage
            await AsyncStorage.removeItem(reminder.id);
            const keys = await AsyncStorage.getAllKeys();
            console.log(keys);
            navigation.goBack();
        } catch (error) {
            // Handle any errors that occur during the deletion
            console.log('Error deleting item from AsyncStorage:', error);
        }
    }

    return (
        <PaperProvider theme={theme}>
            <View style={styles.container} onLayout={onLayoutRootView}>
                <Animated.View style={[styles.topBar, {backgroundColor: topBarBackgroundColor}]}>
                    <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                        <View>
                            <Button onPress={() => navigation.goBack()}>
                                <Icon name="arrow-back-sharp" size={28} color="#DCE2F9"/>
                            </Button>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <TouchableRipple onPress={() => navigation.navigate('CreateReminder')}
                                             rippleColor="rgba(0, 0, 0, .32)">
                                <View style={styles.addButtonContainer}>
                                    <Button onPress={() => handleDelete()}>
                                        <Icon name="trash" size={28} color={"#002B73"}/>
                                    </Button>
                                </View>
                            </TouchableRipple>
                        </View>
                        <View style={{marginLeft: 'auto', marginRight: 10}}>
                            <Button onPress={() => handleSubmit()}>
                                <IconA name={"check"} size={28} color="#DCE2F9"></IconA>
                            </Button>
                        </View>
                    </View>
                </Animated.View>


                <View style={styles.inputs}>
                    <TextInput
                        style={styles.textFields}
                        onChangeText={setText}
                        value={text}
                        mode={"outlined"}
                        label={"Titel"}
                    />

                    <TextInput
                        style={styles.textFields}
                        onChangeText={setDetails}
                        value={details}
                        mode={"outlined"}
                        label={"Notizen"}
                    />
                </View>

                <TimePickerModal
                    visible={timePickerVisible}
                    onDismiss={onTimePickerDismiss}
                    onConfirm={onTimePickerConfirm}
                    hours={time.hours} // default: current hours
                    minutes={time.minutes} // default: current minutes
                    label="Select time" // optional, default 'Select time'
                    cancelLabel="Cancel" // optional, default: 'Cancel'
                    confirmLabel="Ok" // optional, default: 'Ok'
                    use24HourClock
                    animationType="fade" // optional, default is 'none'
                    locale={'de'} // optional, default is automatically detected by your system
                />


                <View style={styles.content}>
                    <Card style={styles.card}>
                        <TouchableOpacity style={styles.timeBox} onPress={() => setTimePickerVisible(true)}>
                            <Card.Content style={styles.cardContent}>
                                <Text style={styles.timeBoxLabel}>Zeit</Text>
                                <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto'}}>
                                    <TimeView hours={time?.hours} minutes={time?.minutes} fontSize={55}></TimeView>
                                    <Text>
                                        <Text style={styles.labels}>Stunden</Text>
                                        <View style={styles.labelMargin}></View>
                                        <Text style={styles.labels}>Minuten</Text>
                                    </Text>
                                </View>
                            </Card.Content>
                        </TouchableOpacity>
                    </Card>
                </View>


                <View style={[styles.center]}>
                    <Text style={{marginRight: "auto"}}>
                        <Checkbox.Item
                            status={checked ? 'checked' : 'unchecked'}
                            labelStyle={{color: '#C7C6CA',}}
                            onPress={() => {
                                setChecked(!checked);
                                setRepetitionMode(RepetitionType.Unique)
                            }}
                            label={"Reminder wiederholt sich"}
                            color={"#B2C5FF"}/>
                    </Text>
                </View>

                <View style={styles.center}>
                    {!checked ?
                        <View>
                            <DateTimePickerModal
                                date={uniqueDate}
                                isVisible={datePickerVisible}
                                mode="date"
                                onConfirm={onDatePickerConfirm}
                                onCancel={onDatePickerDismiss}
                                themeVariant={"dark"}
                                isDarkModeEnabled
                            />
                            <Card style={styles.card2}>
                                <Card.Content style={styles.cardContent}>
                                    <Text style={styles.datePickerText}>Datum auswählen <IconB
                                        name="calendar" size={28} color="#DCE2F9"/></Text>
                                    <TouchableOpacity onPress={() => setDatePickerVisible(true)}
                                                      style={styles.datePickerBox}>
                                        <TextInput
                                            editable={false}
                                            style={[styles.textFields, {
                                                width: Dimensions.get('window').width / 1.2,
                                                marginTop: 20
                                            }]}
                                            value={(moment(uniqueDate)).format('DD/MM/YYYY')}
                                            mode={"outlined"}
                                        />
                                    </TouchableOpacity>
                                </Card.Content>
                            </Card>
                        </View>
                        :
                        <View style={{width: 'auto', alignSelf: 'flex-start', marginLeft: 15, marginRight : 15}}>
                            <DropDownPicker
                                placeholder={"Wähle aus"}
                                open={showDropDown}
                                value={repetitionMode}
                                items={repetitionList}
                                setOpen={setShowDropDown}
                                setValue={setRepetitionMode}
                                style={{
                                    backgroundColor : '#45464F',
                                }}

                                listItemContainerStyle={{
                                    backgroundColor : '#45464F',
                                }}
                                textStyle={{
                                    color: '#C7C6CA',
                                    fontSize : 16
                                }}
                            />

                            {repetitionMode === RepetitionType.Weekly && (
                                <View style={{
                                    position: "absolute",
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    gap: 16,
                                    marginTop: 80,
                                    zIndex: -1
                                }}>
                                    <TouchableOpacity onPress={() => handleWeekday("1")}><WeekdaySelector
                                        fontColor={weekdays.includes("1") ? "#0027c2" : "#bdbfc9"}
                                        color={weekdays.includes("1") ? "#9EAFF2" : "rgba(0,0,0,0)"}
                                        weekday={"S"}/></TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleWeekday("2")}><WeekdaySelector
                                        fontColor={weekdays.includes("2") ? "#0027c2" : "#bdbfc9"}
                                        color={weekdays.includes("2") ? "#9EAFF2" : "rgba(0,0,0,0)"}
                                        weekday={"M"}/></TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleWeekday("3")}><WeekdaySelector
                                        fontColor={weekdays.includes("3") ? "#0027c2" : "#bdbfc9"}
                                        color={weekdays.includes("3") ? "#9EAFF2" : "rgba(0,0,0,0)"}
                                        weekday={"D"}/></TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleWeekday("4")}><WeekdaySelector
                                        fontColor={weekdays.includes("4") ? "#0027c2" : "#bdbfc9"}
                                        color={weekdays.includes("4") ? "#9EAFF2" : "rgba(0,0,0,0)"}
                                        weekday={"M"}/></TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleWeekday("5")}><WeekdaySelector
                                        fontColor={weekdays.includes("5") ? "#0027c2" : "#bdbfc9"}
                                        color={weekdays.includes("5") ? "#9EAFF2" : "rgba(0,0,0,0)"}
                                        weekday={"D"}/></TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleWeekday("6")}><WeekdaySelector
                                        fontColor={weekdays.includes("6") ? "#0027c2" : "#bdbfc9"}
                                        color={weekdays.includes("6") ? "#9EAFF2" : "rgba(0,0,0,0)"}
                                        weekday={"F"}/></TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleWeekday("7")}><WeekdaySelector
                                        fontColor={weekdays.includes("7") ? "#0027c2" : "#bdbfc9"}
                                        color={weekdays.includes("7") ? "#9EAFF2" : "rgba(0,0,0,0)"}
                                        weekday={"S"}/></TouchableOpacity>
                                </View>
                            )}
                        </View>

                    }
                </View>
            </View>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    datePickerBox: {
        marginTop: 15,
        alignItems: "center",
    },
    datePickerText: {
        color: '#C7C6CA',
        fontSize: 32
    },

    repeatable: {
        color: '#C7C6CA',
        fontSize: 16
    },

    labels: {
        color: '#C7C6CA',
    },

    labelMargin: {
        paddingRight: 50,
    },

    container: {
        backgroundColor: '#1D1B20',
        width: '100%',
        flex: 1,
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    inputs: {
        alignItems: "center",
        marginTop: 130,
    },

    textFields: {
        width: Dimensions.get('window').width / 1.1,
        backgroundColor: '#1D1B20',
        marginBottom: 25
    },

    center: {
        alignItems: "center",
    },

    topBar: {
        width: Dimensions.get('window').width,
        paddingTop: 30,
        marginTop: 20,
        height: 70,
        borderBottomWidth: 1,
        borderBottomColor: '#3c3d45',
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },

    timeBox: {
        width: Dimensions.get('window').width / 1.1,
        height: 100,
        borderRadius: 15
    },

    timeBoxLabel: {
        position: 'absolute',
        color: '#C7C6CA',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 25,
        marginTop: 25,
    },

    inlineTime: {
        marginLeft: 10,
    },

    timeDisplayBox: {
        backgroundColor: '#ffffff',
        width: 40,
        height: 40
    },
    timePickerLabel: {
        color: '#C7C6CA',
        fontSize: 16,
    },
    timePickerButtonLabel: {
        color: '#DCE2F9',
    },
    timePickerButtonText: {
        fontSize: 16,
    },
    timePickerModal: {
        backgroundColor: '#1D1B20',
    },
    timePickerContainer: {
        backgroundColor: '#25232A',
    },
    card: {
        width: Dimensions.get('window').width / 1.1,
        height: 150,
        backgroundColor: '#25232A',
        marginBottom: 15,
        elevation: 4,
    },
    card2: {
        marginTop: 10,
        width: Dimensions.get('window').width / 1.1,
        height: 170,
        backgroundColor: '#25232A',
        elevation: 4,
    },
    cardTitle: {
        color: '#C7C6CA',
        fontSize: 20,
    },
    cardContent: {
        flexDirection: 'column',
        height: 120
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
    addButtonContainer: {
        backgroundColor: '#B2C5FF',
        borderRadius: 26,
        elevation: 6,
    }
});
