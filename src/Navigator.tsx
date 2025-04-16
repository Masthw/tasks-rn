// src/Navigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Auth from './screens/Auth';
import TaskList from './screens/TaskList';
import CustomDrawer from './components/CustomDrawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Primeiro, definimos os screens do Drawer fora de qualquer função, para que o React não os recrie a cada render.

const TodayScreen: React.FC<any> = (props) => (
  <TaskList {...props} title="Hoje" daysAhead={0} />
);
const TomorrowScreen: React.FC<any> = (props) => (
  <TaskList {...props} title="Amanhã" daysAhead={1} />
);
const WeekScreen: React.FC<any> = (props) => (
  <TaskList {...props} title="Semana" daysAhead={7} />
);
const MonthScreen: React.FC<any> = (props) => (
  <TaskList {...props} title="Mês" daysAhead={30} />
);

// Agora, criamos um componente de conteúdo para o Drawer que aceita os dados do usuário.
// Esse componente é definido fora do wrapper principal e recebe os dados via props.
type DrawerRoutesContentProps = {
  user?: any; // Ajuste o tipo conforme seu modelo de usuário
};

const DrawerRoutesContent: React.FC<DrawerRoutesContentProps> = ({ user }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Today"
      // O drawerContent recebe nosso CustomDrawer, aonde repassamos o user
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={(props) => <CustomDrawer {...props} user={user} />}
    >
      <Drawer.Screen
        name="Today"
        component={TodayScreen}
        options={{ title: 'Hoje', headerShown: false }}
      />
      <Drawer.Screen
        name="Tomorrow"
        component={TomorrowScreen}
        options={{ title: 'Amanhã', headerShown: false }}
      />
      <Drawer.Screen
        name="Week"
        component={WeekScreen}
        options={{ title: 'Semana', headerShown: false }}
      />
      <Drawer.Screen
        name="Month"
        component={MonthScreen}
        options={{ title: 'Mês', headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

// Em seguida, criamos um componente wrapper que extrai os parâmetros da rota (como o user)
// e os passa para o DrawerRoutesContent.
type DrawerRoutesWrapperProps = {
  route: { params?: { user?: any } };
};

const DrawerRoutes: React.FC<DrawerRoutesWrapperProps> = ({ route }) => {
  const user = route.params?.user;
  return <DrawerRoutesContent user={user} />;
};

// Agora, definimos nosso AppNavigator usando um Stack Navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={Auth} />
        {/* Ao navegar para "Home", os parâmetros serão passados (ex: via navigation.reset) */}
        <Stack.Screen name="Home" component={DrawerRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
