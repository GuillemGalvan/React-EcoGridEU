import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {M00_Home} from './app/views/M00_Home';



export default function App() {
  return (
    <View style={styles.container}>
      <Text>DAW2</Text>
      <M00_Home></M00_Home>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

