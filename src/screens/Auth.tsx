import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';

import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';

type Styles = {
  background: ViewStyle;
  title: TextStyle;
  input: ViewStyle;
  formContainer: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  subtitle: TextStyle;
};

const Auth: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stageNew, setStageNew] = useState(false);

  function signinOrSignup() {}

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <Text style={styles.title}>Tasks</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>
          {stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
        </Text>
        {stageNew && (
          <TextInput
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        {stageNew && (
          <TextInput
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
        <TouchableOpacity onPress={signinOrSignup}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              {stageNew ? 'Registrar' : 'Entrar'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        // eslint-disable-next-line react-native/no-inline-styles
        style={{padding: 10}}
        onPress={() => {
          setStageNew(!stageNew);
        }}>
        <Text style={styles.buttonText}>{stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

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
  input: {
    backgroundColor: '#FFF',
    marginTop: 10,
    padding: Platform.OS === 'ios' ? 15 : 10,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    width: '90%',
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: '#fff',
    fontSize: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Auth;
