import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CadastroScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    console.log('Cadastro:', { name, email, password });
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login com ${provider}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="signal" size={16} color="#000" />
          <Ionicons name="wifi" size={16} color="#000" />
          <Ionicons name="battery-full" size={16} color="#000" />
        </View>
      </View>

      <View style={styles.content}>

        <View style={styles.socialButtons}>
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Google')}
          >
            <Text style={styles.googleButton}>G</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Facebook')}
          >
            <Text style={styles.facebookButton}>f</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>OU</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons 
                name={showPassword ? "eye" : "eye-off"} 
                size={20} 
                color="#999" 
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.termsText}>
          Ao se cadastrar, você concorda com nossos Termos, Política de Privacidade e Política de Cookies.
        </Text>

        <TouchableOpacity style={styles.createButton} onPress={handleRegister}>
          <Text style={styles.createButtonText}>Criar conta</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OU</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Faça login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
    color: '#333',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  facebookButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1877F2',
    backgroundColor: '#1877F2',
    color: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    textAlign: 'center',
    lineHeight: 50,
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 20,
  },
  form: {
    gap: 15,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 15,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 18,
  },
  createButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
  },
});