import React from 'react';
import {View, TextInput, StyleSheet, TextInputProps} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface AuthInputProps extends TextInputProps {
  icon: string;
}

const AuthInput: React.FC<AuthInputProps> = ({icon, style, ...rest}) => {
  return (
    <View style={[styles.container, style]}>
      <Icon name={icon} size={20} style={styles.icon} />
      <TextInput style={styles.input} {...rest} placeholderTextColor="#333" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  icon: {
    marginLeft: 20,
    color: '#333',
  },
  input: {
    marginLeft: 20,
    width: '70%',
  },
});

export default AuthInput;
