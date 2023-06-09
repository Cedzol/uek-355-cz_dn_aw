import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import IconA from "react-native-vector-icons/AntDesign";
import {Button, Checkbox, TextInput} from "react-native-paper";
import {DatePickerModal, TimePickerModal} from 'react-native-paper-dates'
import {Time, TimeNumber} from "../../assets/models/Time";
import TimeView from "../components/TimeView";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import DatePicker from 'react-native-modern-datepicker';
type RootStackParamList = {
    MainPageList: undefined;
    CreateReminder: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'CreateReminder'>;

export default function CreateReminder({ navigation , route}: Props){

    const [text, setText] = React.useState('');

    const [details, setDetails] = useState('');

    const [checked, setChecked] = React.useState(false);

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

   const [datePickerVisible, setDatePickerVisible] = useState<boolean>(true)

   function onDatePickerDismiss(){
        setTimePickerVisible(false);
   }

   function onDatePickerConfirm(){
        setTimePickerVisible(false);
   }

   function handleSubmit() {
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
                locale={'de'} // optional, default is automically detected by your system
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

            <View style={styles.checkbox}>
                <Text>
                    <Checkbox.Item
                        status={checked ? 'checked' : 'unchecked'}
                        labelStyle={{color : '#C7C6CA',}}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                        label={"Reminder wiederholt sich"}/>
                </Text>
            </View>

            <View>
                {!checked ?
                    <View>
                        <DatePicker
                            options={{
                                backgroundColor: '#090C08',
                                textHeaderColor: '#FFA25B',
                                textDefaultColor: '#F6E7C1',
                                selectedTextColor: '#fff',
                                mainColor: '#F4722B',
                                textSecondaryColor: '#D6C7A1',
                                borderColor: 'rgba(122, 146, 165, 0.1)',
                            }}
                            current="2020-07-13"
                            selected="2020-07-23"
                            mode="calendar"
                            minuteInterval={30}
                            style={{ borderRadius: 10 }}
                        />
                    </View>
                :
                    <View><Text>True</Text></View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    }
});
