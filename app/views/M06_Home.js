// M06_Home.js

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { FlipButton } from '../widget/FlipButton/FlipButton';

/**
 * Classe que hereta de Component i que implementa un component
 * independent en l'app. És un component bàsic sense estils
 * Fa servir routing
 * @version 2.1 25.04.2025
 */

export class M06_Home extends React.Component {
  render() {
    return (
      <View style={estils.contenidors}>
        <View style={estils.contenidorLogo}>
          <Image
            source={require('../../assets/logoSuperApp3.png')}
            style={estils.logo}
            resizeMode="contain"
          />
        </View>

        <View style={estils.buttonsWrapper} testID="contenidorBotons">
          <FlipButton
            title="Renovables"
            frontColor="#4DB6AC"
            backColor="#B2DFDB"
            frontTextColor="white"
            backTextColor="black"
            backText="Renovables: clica para ver la evolución de energías renovables en Europa"
            onPress={() => this.props.navigation.navigate('Renovables')}
          />

          <FlipButton
            title="Mapes"
            frontColor="#2196F3"
            backColor="#BBDEFB"
            frontTextColor="white"
            backTextColor="black"
            backText="Mapes: clica para ver tu ubicación"
            onPress={() => this.props.navigation.navigate('Mapes')}
          />

          <FlipButton
            title="SQLite"
            frontColor="#2962FF"
            backColor="#82B1FF"
            frontTextColor="white"
            backTextColor="black"
            backText="SQLite: clica para ver nuestra base de datos"
            onPress={() => this.props.navigation.navigate('SQLite')}
          />
        </View>
      </View>
    );
  }
}

const estils = StyleSheet.create({
  contenidors: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: '#c3cfe2',
  },
  contenidorLogo: {
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: '60%',
    aspectRatio: 2,    
  },
  buttonsWrapper: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 20,
    marginTop: 0,
  },
});
