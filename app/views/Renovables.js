// Renovables.js

import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { BotoPersonalitzat } from '../widget/BotoPesonalitzat';

export class Renovables extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.topButton}>
          <BotoPersonalitzat
            title="🏠 Volver a Home"
            onPress={() => this.props.navigation.navigate('Home')}
            buttonColor="#1565C0"
            textColor="#FFFFFF"
          />
        </View>

        <Text style={styles.title}>
          🌱 Energías Renovables en Europa
        </Text>

        <Text style={styles.paragraph}>
          En la última década, Europa ha dado pasos de gigante hacia la descarbonización. 
          La capacidad instalada de eólica y solar ha crecido más de un 150%, 
          mientras que el coste de producción ha caído un 70%.
        </Text>

        <Image
          source={require('../../assets/renewables_trend.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.caption}>
          📈 Gráfico 1: Evolución de la potencia instalada (2010–2024)
        </Text>

        <Text style={styles.paragraph}>
          Países como Alemania, España y Dinamarca lideran la producción eólica, 
          aportando conjuntamente más de 40 GW. Por su parte, Francia e Italia 
          han sido muy activos en solar fotovoltaica, con más de 30 GW cada uno.
        </Text>

        <Image
          source={require('../../assets/renewables_map.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.caption}>
          🗺️ Mapa 1: Reparto geográfico de energías renovables en Europa
        </Text>

        <Text style={styles.paragraph}>
          El objetivo de la Unión Europea es alcanzar el 40% de electricidad 
          procedente de renovables para 2030. El impulso a la eficiencia 
          energética y al almacenamiento avanzan en paralelo, dando forma 
          a una red más estable y descentralizada.
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  topButton: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 17,
    lineHeight: 26,
    color: '#444',
    marginBottom: 18,
    textAlign: 'justify',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
  },
  caption: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 24,
    textAlign: 'center',
  },
});
