import axios from "axios";
import Constants from 'expo-constants';
import {
    Alert
} from 'react-native';

const apiUrl = Constants.expoConfig.extra.apiUrl;

async function post(rota, dataEnviar, acao) {
    try {

        const response = await axios.post(apiUrl + rota,
            dataEnviar
        );

        const data = response.data;

        if (data.success) {
            acao(data)
        }
        else {
            console.log(data);
        }

    } catch (error) {
        if (error.response) {
            Alert.alert('Erro', error.response.data.error);
        } else {
            Alert.alert('Erro', 'Erro ao processar ação. Tente novamente.');
        }
    }
}

async function get(rota) {

    try {

        const response = await axios.get(apiUrl + rota);
        const data = response.data;

        if (data.success) {
            return data;
        }
        else {
            console.log(data);
        }

    } catch (error) {
        if (error.response) {
            Alert.alert('Erro', error.response.data.error);
        } else {
            Alert.alert('Erro', 'Erro ao processar ação. Tente novamente.');
        }
    }
}

async function deleteF(rota, dataEnviar) {

    try {

        console.log(dataEnviar)
        const response = await axios.delete(apiUrl + rota, {
            data: dataEnviar
        });
        console.log(response)
        const data = response.data;

        if (data.success) {
            return data;
        }
        else {
            console.log(data);
        }

    } catch (error) {
        if (error.response) {
            console.log('Erro', error.response.data.error);
        } else {
            Alert.alert('Erro', 'Erro ao processar ação. Tente novamente.');
        }
    }
}

export {
    post,
    get,
    deleteF
}