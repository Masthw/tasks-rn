import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import Task from '../components/Task';
import commonStyles from '../commonStyles';
import todayImage from '../../assets/imgs/today.jpg';

import moment from 'moment';
import 'moment/locale/pt-br';

const TaskList: React.FC = () => {
  const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={todayImage}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
        <Task description="Comprar Livro" estimateAt={new Date()} doneAt={new Date()}/>
        <Task description="EXPLODIR Livro" estimateAt={new Date()} doneAt={null} />
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
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 50,
    color: commonStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
});
export default TaskList;
