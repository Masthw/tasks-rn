import React, {useState, useEffect, useCallback} from 'react';
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
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTask from './AddTask';
import {showError} from '../common';
import api, {setAuthorizationToken} from '../services/api';

type TaskType = {
  id: string;
  description: string;
  estimateAt: Date;
  doneAt: Date | null;
};

type TaskListProps = {
  title: string;
  daysAhead: number;
  navigation: any;
};

const TaskList: React.FC<TaskListProps> = ({title, daysAhead, navigation}) => {
  const dateSelected = moment()
    .add(daysAhead, 'days')
    .locale('pt-br')
    .format('ddd, D [de] MMMM');

  const [showAddTask, setShowAddTask] = useState(false);
  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const getImageForDaysAhead = () => {
    if (daysAhead === 0) {
      return require('../../assets/imgs/today.jpg');
    }
    if (daysAhead === 1) {
      return require('../../assets/imgs/tomorrow.jpg');
    }
    if (daysAhead === 7) {
      return require('../../assets/imgs/week.jpg');
    }
    if (daysAhead === 30) {
      return require('../../assets/imgs/month.jpg');
    }
    return require('../../assets/imgs/today.jpg');
  };

  const getColorForDay = () => {
    if (daysAhead === 0) {
      return commonStyles.colors.today;
    }
    if (daysAhead === 1) {
      return commonStyles.colors.tomorrow;
    }
    if (daysAhead === 7) {
      return commonStyles.colors.week;
    }
    if (daysAhead === 30) {
      return commonStyles.colors.month;
    }
    return commonStyles.colors.today;
  };

  const loadTasks = useCallback(async () => {
    try {
      const maxDate = moment()
        .add(daysAhead, 'days')
        .format('YYYY-MM-DD 23:59:59');
      const res = await api.get(`/tasks?date=${maxDate}`);
      setTasks(res.data);
    } catch (e) {
      showError(e);
    }
  }, [daysAhead]);

  useEffect(() => {
    const initialize = async () => {
      await setAuthorizationToken();
      loadTasks();
    };
    initialize();
  }, [loadTasks]);

  const toggleFilter = () => {
    setShowDoneTasks(prev => !prev);
  };

  const toggleTask = async (taskId: string) => {
    try {
      await api.put(`/tasks/${taskId}/toggle`);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId
            ? {...task, doneAt: task.doneAt ? null : new Date()}
            : task,
        ),
      );
    } catch (e) {
      showError('Não foi possível atualizar a tarefa');
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (e) {
      showError('Não foi possível deletar a tarefa');
    }
  };

  const handleAddTask = async (description: string, date: Date) => {
    try {
      await api.post('/tasks', {
        description,
        estimateAt: date,
      });
      setShowAddTask(false);
      loadTasks();
    } catch (e) {
      showError(e);
    }
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
      <ImageBackground
        style={styles.background}
        source={getImageForDaysAhead()}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{dateSelected}</Text>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.iconButton}>
            <Icon name="bars" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFilter} style={styles.iconButton}>
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
        style={[styles.addButton, {backgroundColor: getColorForDay()}]}
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
  iconsContainer: {
    position: 'absolute',
    top: Platform.select({ ios: 50, android: 40 }),
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
  },
  filterButton: {
    padding: 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskList;
