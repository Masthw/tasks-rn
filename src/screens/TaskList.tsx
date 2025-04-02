import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native';
import Task from '../components/Task';
import commonStyles from '../commonStyles';
import todayImage from '../../assets/imgs/today.jpg';
import moment from 'moment';
import 'moment/locale/pt-br';

const TaskList: React.FC = () => {
  const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

  const [tasks, setTasks] = useState([
    {
      id: '1',
      description: 'Comprar Livro',
      estimateAt: new Date(),
      doneAt: new Date(),
    },
    {
      id: '2',
      description: 'EXPLODIR Livro',
      estimateAt: new Date(),
      doneAt: null,
    },
    {
      id: '3',
      description: 'Ir à academia',
      estimateAt: new Date(),
      doneAt: null,
    },
  ]);

  const toggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {...task, doneAt: task.doneAt ? null : new Date()}
          : task,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={todayImage}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Task
              id={item.id}
              description={item.description}
              estimateAt={item.estimateAt}
              doneAt={item.doneAt}
              toggleTask={toggleTask}
            />
          )}
        />
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
