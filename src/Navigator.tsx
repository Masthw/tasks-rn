// src/Navigator.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import Auth from './screens/Auth';
import TaskList from './screens/TaskList';
import CustomDrawer from './components/CustomDrawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const TodayScreen: React.FC<any> = props => (
  <TaskList {...props} title="Hoje" daysAhead={0} />
);
const TomorrowScreen: React.FC<any> = props => (
  <TaskList {...props} title="Amanhã" daysAhead={1} />
);
const WeekScreen: React.FC<any> = props => (
  <TaskList {...props} title="Semana" daysAhead={7} />
);
const MonthScreen: React.FC<any> = props => (
  <TaskList {...props} title="Mês" daysAhead={30} />
);

type DrawerRoutesContentProps = {
  user?: any;
};

const DrawerRoutesContent: React.FC<DrawerRoutesContentProps> = ({user}) => {
  return (
    <Drawer.Navigator
      initialRouteName="Today"
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={props => <CustomDrawer {...props} user={user} />}>
      <Drawer.Screen
        name="Today"
        component={TodayScreen}
        options={{title: 'Hoje', headerShown: false}}
      />
      <Drawer.Screen
        name="Tomorrow"
        component={TomorrowScreen}
        options={{title: 'Amanhã', headerShown: false}}
      />
      <Drawer.Screen
        name="Week"
        component={WeekScreen}
        options={{title: 'Semana', headerShown: false}}
      />
      <Drawer.Screen
        name="Month"
        component={MonthScreen}
        options={{title: 'Mês', headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

type DrawerRoutesWrapperProps = {
  route: {params?: {user?: any}};
};

const DrawerRoutes: React.FC<DrawerRoutesWrapperProps> = ({route}) => {
  const user = route.params?.user;
  return <DrawerRoutesContent user={user} />;
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={Auth} />
        {/* Ao navegar para "Home", os parâmetros serão passados (ex: via navigation.reset) */}
        <Stack.Screen name="Home" component={DrawerRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
