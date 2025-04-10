import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import TaskList from './screens/TaskList';
import Auth from './screens/Auth';

const Drawer = createDrawerNavigator();

const HomeDrawer: React.FC = () => (
  <Drawer.Navigator initialRouteName="Today">
    <Drawer.Screen name="Today" options={{title: 'Hoje', headerShown: false}}>
      {props => <TaskList {...props} title="Hoje" daysAhead={0} />}
    </Drawer.Screen>

    <Drawer.Screen
      name="Tomorrow"
      options={{title: 'Amanhã', headerShown: false}}>
      {props => <TaskList {...props} title="Amanhã" daysAhead={1} />}
    </Drawer.Screen>
    <Drawer.Screen name="Week" options={{title: 'Semana', headerShown: false}}>
      {props => <TaskList {...props} title="Semana" daysAhead={7} />}
    </Drawer.Screen>
    <Drawer.Screen name="Month" options={{title: 'Mês', headerShown: false}}>
      {props => <TaskList {...props} title="Mês" daysAhead={30} />}
    </Drawer.Screen>
  </Drawer.Navigator>
);

const mainRoutes = {
  Auth: {
    screen: Auth,
    name: 'Auth',
  },
  Home: {
    screen: () => (
      <NavigationContainer>
        <HomeDrawer />
      </NavigationContainer>
    ),
    name: 'Home',
  },
};

const mainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'Auth',
});

export default createAppContainer(mainNavigator);
