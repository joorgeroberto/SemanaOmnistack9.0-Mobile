import React, { useState, useEffect } from 'react'
import { View, AsyncStorage, KeyboardAvoidingView,Platform, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'

import api from '../services/api'

import logo from '../assets/logo.png'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  // Usaremos o useEffect para verificar se o usuário existe.
  // Se existir é pq já está logado no app e ele leva para a tela de listagem.
  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if(user) {
        navigation.navigate('List')
      }
    })
  }, []);

  async function handleSubmit() {
    const response = await api.post('/sessions', {
      email
    });

    const { _id } = response.data;

    // Salvando o id do usuário no celular para que acessemos em todas as telas.
    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List')
  }
  return(
    // KeyboardAvoidingView leva toda a view para cima do teclado. Usamos isto para evitar que o teclado fique por cima do formulário.
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Image source={logo} />
      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor='#999'
          keyboardType="email-address"
          autoCapitalize='none'
          autoCorrect={false}
          value={email}
          //onChangeText={text => setEmail(text) } ou
          onChangeText={setEmail}
        />

        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor='#999'
          autoCapitalize='words'
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    alignSelf: 'stretch', // Pra ocupar toda a largura inteira possivel
    paddingHorizontal: 30,
    marginTop: 30,
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  buttonText:{
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});