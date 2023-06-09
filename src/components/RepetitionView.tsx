import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { RepetitionType } from '../../assets/models/Enums';
import { Reminder } from '../../assets/models/Reminder';
import moment from 'moment';

export default function RepetitionView(props: any) {
  const reminder: Reminder = props.reminder;

  const daysOfWeek: string[] = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  let dayString: string[] = [];

  if (reminder.repetition == RepetitionType.Weekly) {
    for (let d of reminder.daysOfWeek!) {
      dayString.push(' ' + daysOfWeek[d]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.images}>
        {reminder.repetition == RepetitionType.Unique ? (
          <Icon name="numeric-1" style={styles.icons} size={25} />
        ) : (
          <Icon name="repeat" style={styles.icons} size={25} />
        )}
      </View>
      <View style={styles.textContainer}>
        {reminder.repetition == RepetitionType.Unique ? (
          <Text style={[styles.text, { marginLeft: 10 }]}>
            {reminder.repetition + ', ' + moment(reminder.specificUniqueDate).format('DD.MM.YYYY')}
          </Text>
        ) : null}

        {reminder.repetition == RepetitionType.Hourly ? (
          <Text style={[styles.text, { marginLeft: 10 }]}>{reminder.repetition}</Text>
        ) : null}

        {reminder.repetition == RepetitionType.Daily ? (
          <Text style={[styles.text, { marginLeft: 10 }]}>{reminder.repetition}</Text>
        ) : null}

        {reminder.repetition == RepetitionType.Weekly ? (
          <Text style={[styles.text, { marginLeft: 10 }]}>
            {reminder.repetition + ',' + dayString}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: '#bdbfca',
    borderWidth: 1,
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  images: {
    marginLeft: 10,
  },

  textContainer: {
    flex: 1,
  },

  text: {
    fontWeight: 'bold',
    color: '#B2C5FF',
    fontSize: 14,
  },

  icons: {
    color: '#C7C6CA',
  },
});
