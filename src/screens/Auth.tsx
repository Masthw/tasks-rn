import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';
import AuthInput from '../components/AuthInput';

import {server, showError, showSuccess} from '../common';

type Styles = {
  background: ViewStyle;
  title: TextStyle;
  input: ViewStyle;
  formContainer: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  subtitle: TextStyle;
  inputError: ViewStyle;
  buttonDisabled: ViewStyle;
  errorText: TextStyle;
};

const Auth: React.FC<any> = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stageNew, setStageNew] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  function signinOrSignup() {
    setWasSubmitted(true);
    if (stageNew) {
      signup();
    } else {
      signin();
    }
  }

  async function signup() {
    if (!name.trim()) {
      showError('Informe o nome');
      return;
    }

    if (!isValidEmail()) {
      showError('E-mail inválido');
      return;
    }

    if (!isValidPassword()) {
      showError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      showError('As senhas não coincidem');
      return;
    }
    try {
      await axios.post(`${server}/signup`, {
        name,
        email,
        password,
        confirmPassword,
      });
      showSuccess('Usuário cadastrado!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setStageNew(false);
    } catch (e) {
      showError(e);
    }
  }
  async function signin() {
    try {
      const res = await axios.post(`${server}/signin`, {
        email,
        password,
      });
      axios.defaults.headers.common.Authorization = `bearer ${res.data.token}`;
      navigation.navigate('Home');
      showSuccess(`Bem-vindo(a), ${res.data.name}!`);
      setEmail('');
      setPassword('');
    } catch (e) {
      showError('E-mail ou senha inválidos!');
    }
  }

  function isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword() {
    return password.length >= 6;
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <Text style={styles.title}>Tasks</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>
          {stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
        </Text>
        {stageNew && (
          <>
            <AuthInput
              icon="user"
              placeholder="Nome"
              value={name}
              onChangeText={setName}
              style={[
                styles.input,
                wasSubmitted && name.trim() === '' && styles.inputError,
              ]}
              keyboardType="default"
              autoCapitalize="words"
            />
            {wasSubmitted && name.trim() === '' && (
              <Text style={styles.errorText}>Informe o nome</Text>
            )}
          </>
        )}
        <AuthInput
          icon="envelope"
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={[
            styles.input,
            wasSubmitted && !isValidEmail() && email !== ''
              ? styles.inputError
              : null,
          ]}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {wasSubmitted && !isValidEmail() && (
          <Text style={styles.errorText}>E-mail inválido</Text>
        )}
        <AuthInput
          icon="lock"
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={[
            styles.input,
            wasSubmitted && !isValidPassword() && password !== ''
              ? styles.inputError
              : null,
          ]}
          secureTextEntry
        />
        {wasSubmitted && !isValidPassword() && (
          <Text style={styles.errorText}>
            A senha deve ter no mínimo 6 caracteres
          </Text>
        )}
        {stageNew && (
          <>
            <AuthInput
              icon="lock"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={[
                styles.input,
                wasSubmitted &&
                  password !== confirmPassword &&
                  styles.inputError,
              ]}
              secureTextEntry
            />
            {wasSubmitted && password !== confirmPassword && (
              <Text style={styles.errorText}>As senhas não coincidem</Text>
            )}
          </>
        )}
        <TouchableOpacity onPress={signinOrSignup}>
          <View style={[styles.button]}>
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
          setWasSubmitted(false);
        }}>
        <Text style={styles.buttonText}>
          {stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
        </Text>
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
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    width: '90%',
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
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
  buttonDisabled: {
    backgroundColor: '#555',
    opacity: 0.6,
  },
  inputError: {
    borderWidth: 1,
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
});

export default Auth;
