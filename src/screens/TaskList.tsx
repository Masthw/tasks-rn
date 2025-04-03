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
import AddTask from './AddTask';

const TaskList: React.FC = () => {
  const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

  const [showAddTask, setShowAddTask] = useState(false);
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

  const handleAddTask = (description: string, date: Date) => {
    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: String(prevTasks.length + 1),
        description,
        estimateAt: date,
        doneAt: null,
      },
    ]);
    setShowAddTask(false);
  };

  const filteredTasks = showDoneTasks
    ? tasks
    : tasks.filter(task => !task.doneAt);

  return (
    <View style={styles.container}>
      <AddTask
        visible={showAddTask}
        onCancel={() => setShowAddTask(false)}
        onSave={handleAddTask}
      />
      <ImageBackground style={styles.background} source={todayImage}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity onPress={toggleFilter} style={styles.filterButton}>
            <Icon
              name={showDoneTasks ? 'eye' : 'eye-slash'}
              size={24}
              color="#FFF"
            />
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddTask(true)}
        activeOpacity={0.8}>
        <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
      </TouchableOpacity>
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
    top: Platform.select({ios: 50, android: 30}),
    right: 20,
  },
  filterButton: {
    padding: 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: commonStyles.colors.today,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskList;
