import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';



export class M03_Esdeveniments extends React.Component {
  mostrarMissatge = () => {
    Alert.alert('Has polsat un botó');
    //si ho proveu en web caldrà posar alert('missatge')
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.mostrarMissatge}>
          <Text>Polsar aquest botó</Text>
        </TouchableOpacity>
        
      </View>
    );

  }
}