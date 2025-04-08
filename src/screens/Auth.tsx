import React, { Component } from 'react';
import { ImageBackground, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';

type Styles = {
  background: ViewStyle;
  title: TextStyle;
};

export default class Auth extends Component {
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create<Styles>({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
  },
});
