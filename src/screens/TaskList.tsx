import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';

import todayImage from '../../assets/imgs/today.jpg';

import moment from 'moment';
import 'moment/locale/pt-br';

const TaskList: React.FC = () => {

    const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={todayImage} />
      <View>
        <Text>Hoje</Text>
        <Text>{today}</Text>
      </View>
      <View style={styles.taskList}>
        <Text>TaskList</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
});
export default TaskList;
