import React, { useState, useEffect } from 'react'
import {View, AsyncStorage, ScrollView, StyleSheet, Image, SafeAreaView} from 'react-native'

import SpotList from '../components/SpotList'
import logo from '../assets/logo.png'

export default function List() {
  const [techs, setTechs] = useState([]);

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
      </ScrollView>
      <View style={{height: 30}}/>
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