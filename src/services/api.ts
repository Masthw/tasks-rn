import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {server} from '../common';

const api = axios.create({
  baseURL: server,
});


export const setAuthorizationToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    api.defaults.headers.common.Authorization = `bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export default api;
