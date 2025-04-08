// src/Navigator.tsx
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import TaskList from './screens/TaskList';
import Auth from './screens/Auth';

const mainRoutes = {
  Auth: {
    screen: Auth,
    name: 'Auth',
  },
  Home: {
    screen: TaskList,
    name: 'Home',
  },
};

const mainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'Auth',
});

export default createAppContainer(mainNavigator);
