import * as React from 'react';
import { Appbar, Menu, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet } from 'react-native';

const pages = [
  { name: 'Home', route: 'Home' },
  { name: 'Renovables', route: 'Renovables' },
  { name: 'Mapes', route: 'Mapes' },
  { name: 'SQLite', route: 'SQLite' },
];

export default function AppHeader() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);


  const onLogoPress = () => navigation.navigate('Home');
  const onInfoPress = () => navigation.navigate('Renovables');
  const onLocationPress = () => navigation.navigate('Mapes');
  const onDataPress = () => navigation.navigate('SQLite');

  return (
    <Appbar.Header>
      <Appbar.Action
        icon={() => (
          <Image
            source={require('../React-EcoGridEU/assets/logoSuperApp3.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        )}
        onPress={onLogoPress}
      />

      <Appbar.Action icon="information" onPress={onInfoPress} />
      <Appbar.Action icon="map-marker" onPress={onLocationPress} />
      <Appbar.Action icon="database" onPress={onDataPress} />

      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}
      >
        {pages.map((page) => (
          <Menu.Item
            key={page.route}
            title={page.name}
            onPress={() => {
              closeMenu();
              navigation.navigate(page.route);
            }}
          />
        ))}
      </Menu>

      <Appbar.Action
        icon={() => <Avatar.Image size={24} source={{ uri: 'https://i.pravatar.cc/300' }} />}
        onPress={() => alert('User avatar pressed')}
      />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});
