import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { M06_Home } from './app/views/M06_Home';
import { M06_Renovables } from './app/views/M06_Renovables';
import {M08_Mapes} from './app/views/M08_Mapes';
import {M09_Sqlite} from './app/views/M09_Sqlite';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={M06_Home} options={{ unmountOnBlur: true }} />
        <Stack.Screen name="Renovables" component={M06_Renovables} />
        <Stack.Screen name="Mapes" component={M08_Mapes} />
        <Stack.Screen name="SQLite" component={M09_Sqlite} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;