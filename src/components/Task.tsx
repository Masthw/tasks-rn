import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import commonStyles from '../commonStyles';

interface TaskProps {
  description: string;
  estimateAt: Date;
  doneAt?: Date | null;
}

const Task: React.FC<TaskProps> = ({description, estimateAt, doneAt}) => {
  const isDone = !!doneAt;
  const formattedDate = isDone
    ? moment(doneAt).format('DD/MM/YYYY HH:mm')
    : moment(estimateAt).format('DD/MM/YYYY HH:mm');

  return (
    <View style={styles.container}>
      <View style={styles.checkContainer}>{getCheckView(doneAt)}</View>
      <View>
        <Text style={[styles.text, isDone && styles.textDone]}>
          {description}
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </View>
  );
};

function getCheckView(doneAt: Date | null | undefined) {
  if (doneAt != null) {
    return (
      <View style={styles.done}>
        <Icon name="check" size={20} color="#FFF" />
      </View>
    );
  } else {
    return <View style={styles.pending} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 15,
    color: commonStyles.colors.mainText,
  },
  textDone: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  date: {
    fontSize: 14,
    color: '#777',
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: '#4D7031',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Task;
