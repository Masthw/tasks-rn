
import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAuthorizationToken} from '../services/api';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'AuthOrApp'>;

type State = {
  loading: boolean;
};

export default class AuthOrApp extends Component<Props, State> {
  state: State = {
    loading: true,
  };

  async componentDidMount(): Promise<void> {
    const userDataJson = await AsyncStorage.getItem('userData');
    let userData = null;

    try {
      userData = userDataJson ? JSON.parse(userDataJson) : null;
    } catch (e) {
      console.error('Erro ao parsear userData:', e);
    }

    if (userData && userData.token) {
      await setAuthorizationToken();
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'Home', params: {user: userData}}],
      });
    } else {
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#080" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
