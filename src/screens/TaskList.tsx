import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Task from '../components/Task';
import commonStyles from '../commonStyles';
import todayImage from '../../assets/imgs/today.jpg';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/FontAwesome';

const TaskList: React.FC = () => {
  const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

  const [showDoneTasks, setShowDoneTasks] = useState(true);
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

  const toggleFilter = () => {
    setShowDoneTasks(prev => !prev);
  };

  const toggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {...task, doneAt: task.doneAt ? null : new Date()}
          : task,
      ),
    );
  };

  const filteredTasks = showDoneTasks ? tasks : tasks.filter(task => !task.doneAt);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={todayImage}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity onPress={toggleFilter} style={styles.filterButton}>
            <Icon name={showDoneTasks ? 'eye' : 'eye-slash'} size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
        <FlatList
          data={filteredTasks}
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
  filterContainer: {
    position: 'absolute',
    top: Platform.select({ ios: 50, android: 30 }),
    right: 20,
  },
  filterButton: {
    padding: 10,
  },
});

export default TaskList;
