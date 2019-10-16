import React, { useState, useEffect } from 'react'
import socketio from 'socket.io-client';
import {Alert, View, AsyncStorage, ScrollView, StyleSheet, Image, SafeAreaView} from 'react-native'

import SpotList from '../components/SpotList'
import logo from '../assets/logo.png'

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      // Waterpark: 192.168.0.65
      /*const socket = socketio('http://192.168.0.65:3333', {
        query: { user_id }
      });*/

      // Casa: 192.168.1.4
      const socket = socketio('http://192.168.1.4:3333', {
         query: { user_id }
      });

      // Toda vez que receber uma resposta para uma reserva emite um alerta na tela do mobile.
      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva na ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
      })
    })
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  },[]);
  return(
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList tech={tech} key={tech} />
        ))}
        <View style={{height: 30}}/>
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  logo: {
    height: 32,
    resizeMode: 'contain', // "Dizendo" ao RN como a imagem deve ser colcoada no espaço de 32px
    alignSelf: 'center',
    marginTop: 10
  }
});