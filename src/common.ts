import {Alert, Platform} from 'react-native';

const server =
  Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

function showError(err: unknown) {
  let message = 'Erro inesperado.';

  if (err instanceof Error) {
    message = err.message;
  } else if (typeof err === 'string') {
    message = err;
  }

  Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${message}`);
}

function showSuccess(msg: string) {
  Alert.alert('Sucesso!', msg);
}

export {server, showError, showSuccess};
