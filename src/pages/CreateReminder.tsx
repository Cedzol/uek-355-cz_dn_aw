import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import IconA from "react-native-vector-icons/AntDesign";
import IconB from "react-native-vector-icons/Entypo";
import {Button, Checkbox, TextInput} from "react-native-paper";
import {TimePickerModal} from 'react-native-paper-dates'
import {Time, TimeNumber} from "../../assets/models/Time";
import TimeView from "../components/TimeView";
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment/moment";
import DropDownPicker from 'react-native-dropdown-picker';
import {RepetitionType} from "../../assets/models/Enums";
import WeekdaySelector from "../molecules/WeekdaySelector";
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    MainPageList: undefined;
    CreateReminder: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'CreateReminder'>;

export default function CreateReminder({ navigation , route}: Props){

    const repetitionList = [
        {
            label : "Stündlich",
            value: RepetitionType.Hourly
        },
        {
            label : "Täglich",
            value: RepetitionType.Daily
        },
        {
            label: "Wöchentlich",
            value: RepetitionType.Weekly
        }
    ]

    const [text, setText] = React.useState('');

    const [details, setDetails] = useState('');

    const [repetitionMode, setRepetitionMode] = useState<RepetitionType>(RepetitionType.Daily)

    const [checked, setChecked] = React.useState(false);

    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    let currentTime = new Date();

    const [time, setTime] = useState<TimeNumber>({
        hours : currentTime.getHours(),
        minutes : currentTime.getMinutes()
    })

    const [timePickerVisible, setTimePickerVisible] = useState(false);

    function onTimePickerDismiss(){
        setTimePickerVisible(false)
    }

   function onTimePickerConfirm(time : TimeNumber){
        setTime(time)
       console.log(time)
        setTimePickerVisible(false)
   }

   const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)

    const [uniqueDate, setUniqueDate] = useState<Date>(currentTime)

   function onDatePickerDismiss(){
        setDatePickerVisible(false);
   }

   function onDatePickerConfirm(date : Date){
        setUniqueDate(date)
        setDatePickerVisible(false);
   }

    const [weekdays, setWeekdays] = useState<string[]>([])

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
       const identifiableReminder = { //TODO: Delete this message: hier kann man nachher eigentlich mit NULL arbeiten -> ?
           text : text,
           details : details,
           time : time,
           repeating : checked,
           uniqueDate : uniqueDate,
           repeatFrequency: repetitionMode,
           daysOfWeek : weekdays, //TODO: Delete this message: wenn das NULL ist dann sollte es repeat wekkly sein
       }

       const identifiableReminderObject = JSON.stringify(identifiableReminder);

       AsyncStorage.setItem(genUniqueId(), identifiableReminderObject).then(async (message: any) => {
          AsyncStorage.multiGet(await AsyncStorage.getAllKeys()).then((result: readonly string[]) => {
               console.log("Test", result)
           });
       }); //TODO: Delete this message: has to be .toString() otherwise there is a Malformed calls from JS error
        //TODO: Delete the log here (and in general delete logs)
       navigation.goBack();
   }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <View style={{marginLeft : 28, flexDirection : 'row'}}>
                    <View>
                        <Button onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back-sharp" size={28} color="#DCE2F9"/>
                        </Button>
                    </View>
                    <View style={{marginLeft : 'auto', marginRight : 28}}>
                        <Button onPress={handleSubmit}>
                            <IconA name={"check"} size={28} color="#DCE2F9"></IconA>
                        </Button>
                    </View>
                </View>
            </View>

            <View style={styles.inputs}>
                <TextInput
                    style={styles.textFields}
                    onChangeText={setText}
                    value={text}
                    mode={"outlined"}
                    label={"Titel"}
                    theme={{
                        colors : {primary : '#B2C5FF'}
                    }}
                    textColor={'#C7C6CA'}
                    outlineColor={"#B2C5FF"}
                />

                <TextInput
                    style={styles.textFields}
                    onChangeText={setDetails}
                    value={details}
                    mode={"outlined"}
                    label={"Notizen"}
                    theme={{
                        colors : {primary : '#B2C5FF'}
                    }}
                    textColor={'#C7C6CA'}
                    outlineColor={"#B2C5FF"}
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
            <View style={styles.center}>
                <TouchableOpacity style={styles.timeBox} onPress={() => setTimePickerVisible(true)}>
                    <View style={{ flexDirection: 'row' , marginTop : 10, marginLeft : 10}}>
                        <Text style={styles.timeBoxLabel}> Uhrzeit</Text>
                        <View style={{ marginLeft: 'auto', marginRight : 'auto'}}>
                            <TimeView hours={time?.hours} minutes={time?.minutes} fontSize={45}></TimeView>
                            <Text>
                                <Text style={styles.labels}>Stunden</Text>
                                <View style={styles.labelMargin}></View>
                                <Text style={styles.labels}>Minuten</Text>
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={[styles.checkbox, styles.center]}>
                <Text style={{marginRight : "auto"}}>
                    <Checkbox.Item
                        status={checked ? 'checked' : 'unchecked'}
                        labelStyle={{color : '#C7C6CA',}}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                        label={"Reminder wiederholt sich"}/>
                </Text>
            </View>

            <View style={styles.center}>
                {!checked?
                    <View>
                        <DateTimePickerModal
                            date={uniqueDate}
                            isVisible={datePickerVisible}
                            mode="date"
                            onConfirm={onDatePickerConfirm}
                            onCancel={onDatePickerDismiss}
                        />
                        <View>
                            <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={styles.datePickerBox}>
                                <Text style={{color : '#C7C6CA', fontSize : 20}}>Datum auswählen <IconB name="calendar" size={28} color="#DCE2F9"/></Text>
                            <TextInput
                                editable={false}
                                style={[styles.textFields, {width: Dimensions.get('window').width / 1.2, marginTop : 20}]}
                                value={(moment(uniqueDate)).format('DD/MM/YYYY') }
                                mode={"outlined"}
                                theme={{
                                    colors : {primary : '#B2C5FF'}
                                }}
                                textColor={'#C7C6CA'}
                                outlineColor={"#B2C5FF"}
                            />
                            </TouchableOpacity>
                        </View>
                    </View>
                :
                    <View style={{width : Dimensions.get('window').width / 1.2, }}>
                        <DropDownPicker
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
                            <View style={{ justifyContent: "center", flexDirection: "row", gap: 20, marginTop: 30, zIndex: -1 }}>
                                <TouchableOpacity onPress={() => handleWeekday("1")}><WeekdaySelector fontColor={weekdays.includes("1") ? "#0027c2" : "#bdbfc9"} color={weekdays.includes("1") ? "#9EAFF2" : "rgba(0,0,0,0)"} weekday={"M"} /></TouchableOpacity>
                                <TouchableOpacity onPress={() => handleWeekday("2")}><WeekdaySelector fontColor={weekdays.includes("2") ? "#0027c2" : "#bdbfc9"} color={weekdays.includes("2") ? "#9EAFF2" : "rgba(0,0,0,0)"} weekday={"D"} /></TouchableOpacity>
                                <TouchableOpacity onPress={() => handleWeekday("3")}><WeekdaySelector fontColor={weekdays.includes("3") ? "#0027c2" : "#bdbfc9"} color={weekdays.includes("3") ? "#9EAFF2" : "rgba(0,0,0,0)"} weekday={"M"} /></TouchableOpacity>
                                <TouchableOpacity onPress={() => handleWeekday("4")}><WeekdaySelector fontColor={weekdays.includes("4") ? "#0027c2" : "#bdbfc9"} color={weekdays.includes("4") ? "#9EAFF2" : "rgba(0,0,0,0)"} weekday={"D"} /></TouchableOpacity>
                                <TouchableOpacity onPress={() => handleWeekday("5")}><WeekdaySelector fontColor={weekdays.includes("5") ? "#0027c2" : "#bdbfc9"} color={weekdays.includes("5") ? "#9EAFF2" : "rgba(0,0,0,0)"} weekday={"F"} /></TouchableOpacity>
                                <TouchableOpacity onPress={() => handleWeekday("6")}><WeekdaySelector fontColor={weekdays.includes("6") ? "#0027c2" : "#bdbfc9"} color={weekdays.includes("6") ? "#9EAFF2" : "rgba(0,0,0,0)"} weekday={"S"} /></TouchableOpacity>
                                <TouchableOpacity onPress={() => handleWeekday("7")}><WeekdaySelector fontColor={weekdays.includes("7") ? "#0027c2" : "#bdbfc9"} color={weekdays.includes("7") ? "#9EAFF2" : "rgba(0,0,0,0)"} weekday={"S"} /></TouchableOpacity>
                            </View>
                        )}
                    </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    datePickerBox : {
        marginTop : 15,
        paddingTop : 15,
        backgroundColor : '#45464F',
        borderRadius : 15,
        width : Dimensions.get('window').width / 1.1,
        alignItems : "center"
    },

    checkbox : {
        marginTop : 20
    },

    repeatable : {
        color: '#C7C6CA',
        fontSize : 16
    },

    labels : {
        color: '#C7C6CA',
    },

    labelMargin : {
        paddingRight : 50,
    },

    container: {
        backgroundColor: '#1D1B20',
        width : Dimensions.get('window').width,
        flex: 1,

    },

    inputs : {
        alignItems : "center",
        marginTop : 30,
    },

    textFields : {
        width: Dimensions.get('window').width / 1.1,
        backgroundColor : '#1D1B20',
        marginBottom : 30
    },

    center : {
        alignItems : "center",
    },

    topBar: {

        width: Dimensions.get('window').width,
        height : 35,
        borderColor : '#C7C6CA',
        borderBottomWidth : 1,
        marginTop : 50,
    },

    timeBox : {
        backgroundColor : '#45464F',
        width: Dimensions.get('window').width / 1.1,
        height : 100,
        borderRadius : 15
    },

    timeBoxLabel : {
        color: '#C7C6CA',
        fontSize : 20,
        marginTop : 15
    },

    inlineTime : {
        marginLeft : 10,
    },

    timeDisplayBox : {
        backgroundColor : '#ffffff',
        width : 40,
        height : 40
    },
});
