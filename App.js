import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './app/views/Home';
import { Renovables } from './app/views/Renovables';
import { Mapes } from './app/views/Mapes';
import {Sqlite} from './app/views/Sqlite';

import AppHeader from './AppHeader';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            header: () => <AppHeader />,
          }}
        >
        <Stack.Screen name="Home" component={Home} options={{ unmountOnBlur: true }} />
        <Stack.Screen name="Renovables" component={Renovables} />
        <Stack.Screen name="Mapes" component={Mapes} />
        <Stack.Screen name="SQLite" component={Sqlite} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;