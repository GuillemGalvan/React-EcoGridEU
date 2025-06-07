import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { BotoPersonalitzat } from '../widget/BotoPesonalitzat';

const API_URL =
  'https://opendata-ajuntament.barcelona.cat/data/api/3/action/datastore_search?resource_id=452dcd1a-1c4c-4ecd-9370-2fcb687e62ed&limit=100';

async function carregarPuntsVerds() {
  try {
    const resp = await fetch(API_URL);
    const json = await resp.json();

    if (!json.result || !json.result.records) {
      throw new Error('Resposta inesperada: no hi ha records');
    }

    const punts = json.result.records
      .map((r) => {
        const lat = parseFloat(r.geo_epgs_4326_lat);
        const lon = parseFloat(r.geo_epgs_4326_lon);
        if (isNaN(lat) || isNaN(lon)) return null;
        return {
          nom: r._idregister_idname?.trim() || 'Punt Verd',
          lat,
          lon,
          descripcio: r.values_description || '',
        };
      })
      .filter((p) => p !== null);

    console.log('DEBUG puntsVerds:', punts.slice(0, 3));
    return punts;
  } catch (e) {
    console.error('Error carregant punts verds:', e);
    return [];
  }
}

const styles = StyleSheet.create({
  contenidor: { flex: 1, backgroundColor: '#fff' },
  estilMapa: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  contenidorCarrega: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export class Mapes extends React.Component {
  state = {
    ubicacio: null,
    estaCarregant: true,
    puntsVerds: [],
    error: null,
  };

  async componentDidMount() {

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({ estaCarregant: false, error: 'Permís denegat' });
      return;
    }
    const ubicacio = await Location.getCurrentPositionAsync({});


    const puntsVerds = await carregarPuntsVerds();

    this.setState({ ubicacio, puntsVerds, estaCarregant: false });
  }

  render() {
    const { ubicacio, estaCarregant, puntsVerds, error } = this.state;

    if (estaCarregant) {
      return (
        <View style={styles.contenidorCarrega}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Obtenint dades...</Text>
        </View>
      );
    }
    if (error) {
      return (
        <ScrollView style={{ padding: 20 }}>
          <Text style={{ color: 'red' }}>Error: {error}</Text>
        </ScrollView>
      );
    }

    return (
      <View style={styles.contenidor}>
        <BotoPersonalitzat
          title="🏠 Tornar a Home"
          onPress={() => this.props.navigation.navigate('Home')}
          buttonColor="#1565C0"
          textColor="#FFFFFF"
        />

        <MapView
          style={styles.estilMapa}
          initialRegion={{
            latitude: ubicacio.coords.latitude,
            longitude: ubicacio.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >

          <Marker
            coordinate={{
              latitude: ubicacio.coords.latitude,
              longitude: ubicacio.coords.longitude,
            }}
            title="La meva ubicació"
            description="Estic aquí"
          />

          {puntsVerds.map((p, i) => (
            <Marker
              key={i}
              coordinate={{ latitude: p.lat, longitude: p.lon }}
              title={p.nom}
              description={p.descripcio}
              pinColor="green"
            />
          ))}
        </MapView>
      </View>
    );
  }
}
