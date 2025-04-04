import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import commonStyles from '../commonStyles';

interface TaskProps {
  id: string;
  description: string;
  estimateAt: Date;
  doneAt?: Date | null;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({
  id,
  description,
  estimateAt,
  doneAt,
  toggleTask,
  deleteTask,
}) => {
  const isDone = !!doneAt;
  const formattedDate = isDone
    ? moment(doneAt).locale('pt-br').format('ddd, DD [de] MMMM')
    : moment(estimateAt).locale('pt-br').format('ddd, DD [de] MMMM');

  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteTask(id)}>
      <Icon name="trash" size={25} color="#FFF" />
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => toggleTask(id)}>
            <View style={styles.checkContainer}>{getCheckView(doneAt)}</View>
          </TouchableWithoutFeedback>
          <View>
            <Text style={[styles.text, isDone && styles.textDone]}>
              {description}
            </Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
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
    backgroundColor: '#fff',
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
    fontFamily: commonStyles.fontFamily,
    fontSize: 12,
    color: commonStyles.colors.subText,
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
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
});

export default Task;
