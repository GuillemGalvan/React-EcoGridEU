// /app/views/M06_Home.js

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

export class M06_Home extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        {/* --- Section 1: Title + Description --- */}
        <Title style={styles.heading}>EU Renewable Energy Dashboard</Title>
        <Paragraph style={styles.subheading}>
          Explore renewable‐energy data for each EU country, or view the map of
          resources.
        </Paragraph>

        <Divider style={styles.divider} />

        {/* --- Section 2: View Map Card --- */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>View Map</Title>
            <Paragraph>
              Open the interactive map to see renewable energy resources and
              usage across Europe.
            </Paragraph>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button mode="contained" onPress={() => navigation.navigate('Mapes')}>
              Open Map
            </Button>
          </Card.Actions>
        </Card>

        <Divider style={styles.divider} />

        {/* --- Section 3: Browse EU Database Card --- */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>EU Renewable Usage Database</Title>
            <Paragraph>
              View the current renewable energy consumption for each EU country.
              Data is stored locally (SQLite).
            </Paragraph>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button
              mode="contained"
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
    padding: 16,
    backgroundColor: '#fafafa',
  },
  heading: {
    marginTop: 8,
    fontSize: 24,
    textAlign: 'center',
  },
  subheading: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#555',
  },
  divider: {
    marginVertical: 12,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});
