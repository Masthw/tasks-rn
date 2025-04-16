import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import commonStyles from '../commonStyles';
import {useNavigation} from '@react-navigation/native';
import md5 from 'md5';
import { RootStackParamList } from '../types';
import { StackNavigationProp} from '@react-navigation/stack';


type NavigationProps = StackNavigationProp<RootStackParamList>;

const CustomDrawer: React.FC<any> = (props) => {
  const navigation = useNavigation<NavigationProps>();
  const user = props.user;

  const userEmail = user?.email || 'sememail@exemplo.com';
  const userName = user?.name || 'Usuário';

  const gravatarUrl =
    user && user.email
      ? `https://www.gravatar.com/avatar/${md5(user.email)}?s=100`
      : 'https://www.gravatar.com/avatar/?s=100&d=mp';

  const handleLogout = async () => {
    Alert.alert('Sair', 'Deseja mesmo sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        onPress: async () => {
          await AsyncStorage.removeItem('userData');
          await AsyncStorage.removeItem('token');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          });
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image source={{ uri: gravatarUrl }} style={styles.avatar} />
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.email}>{userEmail}</Text>
      </View>

      <DrawerItemList {...props} />

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: commonStyles.fontFamily,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    marginTop: 20,
    marginLeft: 20,
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
  },
});

export default CustomDrawer;
