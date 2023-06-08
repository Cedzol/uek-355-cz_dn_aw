import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import {RepetitionType} from "../../assets/models/Enums";

export default function RepetitionView(props : any) {
    return (
        <View style={styles.container}>
            <Text>
            {props.reminder.repetition === RepetitionType.Unique ?
                <Image style={styles.images} source={require('../../assets/repeat-once.png')}></Image>
                :
                <Image style={styles.images} source={require('../../assets/repeat-endless.png')}></Image>
            }
            <Text>hello</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        borderStyle: "solid",
        borderRadius: 5,
        borderColor: '#bdbfca',
        borderWidth : 1,
        height: 50
    },

    images : {
        width: 30,
        height: 30
    }
});
