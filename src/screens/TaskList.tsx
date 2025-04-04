import React, {useState, useEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

type TaskType = {
  id: string;
  description: string;
  estimateAt: Date;
  doneAt: Date | null;
};



const TaskList: React.FC = () => {
  const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

  const [showAddTask, setShowAddTask] = useState(false);
  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [tasks, setTasks] = useState<TaskType[]>([]);

useEffect(() => {
  loadTasks();
}, []);

const loadTasks = async () => {
  try {
    const saved = await AsyncStorage.getItem('tasks');
    const parsed = saved
    ? JSON.parse(saved).map((task: any) => ({
        ...task,
        estimateAt: new Date(task.estimateAt),
        doneAt: task.doneAt ? new Date(task.doneAt) : null,
      }))
    : [];
    setTasks(parsed);
  } catch (e) {
    console.error('Erro ao carregar tarefas:', e);
  }
};

useEffect(() => {
  saveTasks(tasks);
}, [tasks]);

const saveTasks = async (newTasks: TaskType[]) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  } catch (e) {
    console.error('Erro ao salvar tarefas:', e);
  }
};

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

  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleAddTask = (description: string, date: Date) => {
    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: String(Date.now()),
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
              deleteTask={deleteTask}
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
