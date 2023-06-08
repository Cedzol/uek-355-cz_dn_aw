import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";
import {RepetitionType} from "../../assets/models/Enums";

export default function RepetitionView(props : any) {
    return (
        <View style={styles.container}>
            <Text>
                {props.reminder.repetition == RepetitionType.Unique ?
                    <Icon name="repeat-once" size={30} color="#C7C6CA" />
                :
                    <Icon name="repeat" size={30} color="#C7C6CA" />
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
});
