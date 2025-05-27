import * as SecureStore from 'expo-secure-store';

async function salvarId(id) {
  await SecureStore.setItemAsync('id', id);
}

async function getId() {
  const id = await SecureStore.getItemAsync('id');
  return parseInt(id, 10);
}

async function deletarId() {
  await SecureStore.deleteItemAsync('id');
}

export{
    salvarId,
    getId,
    deletarId
}
