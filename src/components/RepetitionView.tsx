import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import {RepetitionType} from "../../assets/models/Enums";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";

const RepeatIcon = <Icon name="repeat" size={30} color="#900" />;

export default function RepetitionView(props : any) {
    return (
        <View style={styles.container}>
            <Text>
            <Icon name="repeat" size={24} color="#C7C6CA" />
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
