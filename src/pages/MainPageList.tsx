import {Dimensions, StyleSheet, Text, View} from "react-native";
import {Button, List} from 'react-native-paper';
import {useState} from "react";
import {Reminder} from "../../assets/models/Reminder";
import {RepetitionType} from "../../assets/models/Enums";
import {useWindowDimensions} from 'react-native';
import TimeView from "../components/TimeView";
import RepetitionView from "../components/RepetitionView";


export default function MainPageList(){

    let r1 : Reminder = {
        title : "Badge",
        details : "Badge nicht vergessen",
        repetition: RepetitionType.Daily,
        time: {
            hours : '13',
            minutes : '00'
        }
    }

    let r2 : Reminder = {
        title : "pause",
        details : "10 uhr pause",
        repetition: RepetitionType.Weekly,
        daysOfWeek: [2, 3, 4],
        time: {
            hours : '10',
            minutes : '00'
        }
    }

    let r3 : Reminder = {
        title : "Saufen",
        details : "Wochenende, saufen!",
        repetition: RepetitionType.Unique,
        time: {
            hours : '10',
            minutes : '00'
        },
        specificUniqueDate : new Date("2005-09-12")
    }

    const [reminders, setReminders] = useState([r1, r2, r3])

    return (
        <View>
            {reminders.map((reminder : Reminder, index) => (
                <List.Item
                    key={index}
                    title={reminder.title}
                    description={() => (
                        <View>
                            <View style={{flexDirection : 'row'}}>
                                <Text style={styles.textTitle}>{reminder.title}</Text>
                                <View style={{ marginLeft : 'auto'}}>
                                    <TimeView reminder={reminder}></TimeView>
                                </View>
                            </View>
                            <Text style={styles.textDetail}>{reminder.details}</Text>
                            <RepetitionView reminder={reminder}></RepetitionView>

                        </View>
                    )}
                    style={styles.listItem}
                />
                )
            ) }
            <Button mode="contained" onPress={() => console.log('Pressed')} >
                Press me
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1B20',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#C7C6CA'
    },

    listItem : {
        width: Dimensions.get('window').width / 1.15,
        height: 150,
        borderStyle: "solid",
        borderColor: "#3c3d45",
        borderWidth: 1,
        borderRadius: 12
    },

    textTitle : {
        fontSize : 18,
        color: '#bfc0c3'
    },

    textDetail : {
        fontSize : 12,
        color: '#bfc0c3',
    }

});
