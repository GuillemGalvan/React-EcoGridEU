import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Text,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
} from 'react-native-paper';

export class Home extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Title style={styles.heading}>EU Renewable Energy Dashboard</Title>
        <Paragraph style={styles.subheading}>
          Explore renewable‐energy data for each EU country, or view the map of resources.
        </Paragraph>

        <Divider style={styles.divider} />

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>🗺️ View Map</Title>
            <Paragraph style={styles.cardText}>
              Open the interactive map to see renewable energy resources and usage across Europe.
            </Paragraph>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button
              mode="contained"
              buttonColor="#1565C0"
              textColor="#FFFFFF"
              onPress={() => navigation.navigate('Mapes')}
            >
              Open Map
            </Button>
          </Card.Actions>
        </Card>

        <Divider style={styles.divider} />

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>📊 EU Renewable Usage Database</Title>
            <Paragraph style={styles.cardText}>
              View the current renewable energy consumption for each EU country. Data is stored locally (SQLite).
            </Paragraph>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button
              mode="contained"
              buttonColor="#1565C0"
              textColor="#FFFFFF"
              onPress={() => navigation.navigate('SQLite')}
            >
              View Database
            </Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F8FA',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0D47A1',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    marginBottom: 18,
  },
  divider: {
    marginVertical: 14,
    height: 1,
    backgroundColor: '#B0BEC5',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    color: '#0D47A1',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
