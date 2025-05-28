import AsyncStorage from '@react-native-async-storage/async-storage';

async function salvarId(id) {
  await AsyncStorage.setItem('id', id.toString());
}

async function getId() {
  const id = await AsyncStorage.getItem('id');
  return id ? parseInt(id, 10) : null;
}

async function deletarId() {
  await AsyncStorage.removeItem('id');
}

export {
  salvarId,
  getId,
  deletarId
};
