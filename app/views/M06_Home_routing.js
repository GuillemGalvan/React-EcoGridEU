import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';



const estils = StyleSheet.create({
  contenidor: {
    flex: 1,
    backgroundColor: '#0f0'
  }
});

export class M06_Home extends React.Component {

  
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Pantalla Home</Text>
          <Button
            title="Anar a Detalls"
            onPress={() => this.props.navigation.navigate('Detall', {
              nom: 'DAW2',
            })}
          />
          <Button
            title="Anar a Camera"
            onPress={() => this.props.navigation.navigate('Camera')}
          />
          <Button
            title="Anar a Mapes"
            onPress={() => this.props.navigation.navigate('Mapes')}
          />
          <Button
            title="Anar a SQLite"
            onPress={() => this.props.navigation.navigate('SQLite')}
          />
            <Button
            title="Anar a Suma"
            onPress={() => this.props.navigation.navigate('Suma')}
          />
        </View>
      );

    }
}