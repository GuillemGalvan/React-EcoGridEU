import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import * as SQLite from 'expo-sqlite';
import Papa from 'papaparse';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { BotoPersonalitzat } from '../widget/BotoPesonalitzat';




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#228B22',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  columnCell: {
    flex: 1,
    paddingHorizontal: 5,
  },
  columnText: {
    fontSize: 14,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginVertical: 20,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  botoHomeFlotant: {
    position: 'absolute',
    top: 10,
    left: 20,
    zIndex: 999,
  },
  
});

export class Sqlite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      energyData: [],
      loading: true,
      error: null,
      columns: [],
      selectedContinent: null
    };
  }

  async componentDidMount() {
    try {
      const csvData = await this.loadCSV();
      const columns = Object.keys(csvData[0]);
      await this.setupDatabase(csvData, columns);
      await this.loadDataFromDB();
    } catch (error) {
      console.error('Error in componentDidMount:', error);
      this.setState({ 
        error: 'Error initializing the component: ' + error.message,
        loading: false 
      });
    }
  }
  
  async loadCSV() {
    try {
      // Load the CSV file as an asset
      const asset = Asset.fromModule(require('../../assets/data.csv'));
      await asset.downloadAsync();
      
      // Read the file content
      const fileContent = await FileSystem.readAsStringAsync(asset.localUri);
      console.log('CSV Content Preview:', fileContent.substring(0, 200)); // Debug CSV content
      
      // Parse the CSV content
      return new Promise((resolve, reject) => {
        Papa.parse(fileContent, {
          header: true,
          skipEmptyLines: true, // Skip empty lines
          dynamicTyping: false, // Keep everything as strings
          complete: (results) => {
            if (results.errors.length > 0) {
              console.error('CSV parsing errors:', results.errors);
              reject(new Error('Error parsing CSV: ' + results.errors[0].message));
              return;
            }
            
            console.log('CSV parsing successful, row count:', results.data.length);
            console.log('Sample row:', results.data[0]);
            
            // Store column names for table headers
            if (results.data.length > 0) {
              this.setState({ columns: Object.keys(results.data[0]) });
            }
            
            resolve(results.data);
          },
          error: (error) => {
            reject(new Error('Error parsing CSV: ' + error.message));
          }
        });
      });
    } catch (error) {
      console.error('Error loading CSV:', error);
      throw error;
    }
  }

  async setupDatabase(csvData, columns) {
    try {
      const db = await SQLite.openDatabaseAsync('renewable_energy');
      
      await db.execAsync('DROP TABLE IF EXISTS energy_data');
  
      let createTableSQL = 'CREATE TABLE energy_data (id INTEGER PRIMARY KEY AUTOINCREMENT';
      columns.forEach(column => {
        createTableSQL += `, [${column}] TEXT`;
      });
      createTableSQL += ')';
      await db.execAsync(createTableSQL);
  
      for (const row of csvData) {
        let insertSQL = 'INSERT INTO energy_data (';
        let valuePlaceholders = '';
        let values = [];
  
        Object.keys(row).forEach((column, index) => {
          insertSQL += `[${column}]`;
          valuePlaceholders += '?';
          values.push(row[column] ?? '');
  
          if (index < Object.keys(row).length - 1) {
            insertSQL += ', ';
            valuePlaceholders += ', ';
          }
        });
  
        insertSQL += `) VALUES (${valuePlaceholders})`;
  
        try {
          await db.runAsync(insertSQL, values);
        } catch (error) {
          console.error('Error inserting row:', error, row);
          throw error;
        }
      }
  
      console.log('Database setup complete');
    } catch (error) {
      console.error('Error in setupDatabase:', error);
      throw error;
    }
  }
  
  
  async loadDataFromDB() {
    try {
      const db = await SQLite.openDatabaseAsync('renewable_energy');
      
      // Add debugging to verify table structure
      const tableInfo = await db.getAllAsync("PRAGMA table_info(energy_data)");
      console.log('Table columns:', tableInfo);
      
      let query = 'SELECT * FROM energy_data';
      
      if (this.state.selectedContinent) {
        // Make sure the column name matches exactly what's in the database
        query += ` WHERE [Continente] = ?`;
        const result = await db.getAllAsync(query, [this.state.selectedContinent]);
        console.log('Filtered data count:', result.length);
        console.log('First row sample:', result[0]);
        this.setState({ energyData: result, loading: false });
      } else {
        const result = await db.getAllAsync(query);
        console.log('All data count:', result.length);
        console.log('First row sample:', result[0]);
        this.setState({ energyData: result, loading: false });
      }
    } catch (error) {
      console.error('Error loading data from DB:', error);
      this.setState({ 
        error: 'Error loading data from database: ' + error.message,
        loading: false 
      });
    }
  }

  // In loadDataFromDB method, add these logs:
async loadDataFromDB() {
  try {
    const db = await SQLite.openDatabaseAsync('renewable_energy');
    let query = 'SELECT * FROM energy_data';
    
    if (this.state.selectedContinent) {
      query += ` WHERE Continente = ?`;
      const result = await db.getAllAsync(query, [this.state.selectedContinent]);
      console.log('Filtered data count:', result.length);
      console.log('First row sample:', result[0]);
      this.setState({ energyData: result, loading: false });
    } else {
      const result = await db.getAllAsync(query);
      console.log('All data count:', result.length);
      console.log('First row sample:', result[0]);
      this.setState({ energyData: result, loading: false });
    }
  } catch (error) {
    console.error('Error loading data from DB:', error);
    this.setState({ 
      error: 'Error loading data from database: ' + error.message,
      loading: false 
    });
  }
}

  filterByContinent = async (continent) => {
    this.setState({ selectedContinent: continent, loading: true }, () => {
      this.loadDataFromDB();
    });
  }

  render() {
  const { energyData, loading, error, columns } = this.state;

  // Display only essential columns to fit on mobile screen
  const displayColumns = ['Continente', 'Nombre', 'Solar (MWh)', 'Eólica (MWh)', 'Hidráulica (MWh)'];

  return (
    <View style={styles.container}>
      {/* Botón fijo arriba */}
      <View style={styles.botoHomeFlotant}>
        <BotoPersonalitzat
          title="🏠 Home"
          onPress={() => this.props.navigation.navigate('Home')}
          buttonColor="#1565C0"
          textColor="#FFFFFF"
        />
      </View>
  
      <View style={styles.header}>
        <Text style={styles.headerText}>Energías Renovables Global</Text>
      </View>
      
      {loading && <ActivityIndicator size="large" color="#228B22" />}
      
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      
      {!loading && !error && (
        <>
          <View style={styles.filterContainer}>
            <Text 
              style={{padding: 8, backgroundColor: this.state.selectedContinent === 'Europe' ? '#228B22' : '#ddd', color: this.state.selectedContinent === 'Europe' ? 'white' : 'black', borderRadius: 5}}
              onPress={() => this.filterByContinent('Europe')}>
              Europa
            </Text>
            <Text 
              style={{padding: 8, backgroundColor: this.state.selectedContinent === 'Asia' ? '#228B22' : '#ddd', color: this.state.selectedContinent === 'Asia' ? 'white' : 'black', borderRadius: 5}}
              onPress={() => this.filterByContinent('Asia')}>
              Asia
            </Text>
            <Text 
              style={{padding: 8, backgroundColor: this.state.selectedContinent === null ? '#228B22' : '#ddd', color: this.state.selectedContinent === null ? 'white' : 'black', borderRadius: 5}}
              onPress={() => this.filterByContinent(null)}>
              Todos
            </Text>
          </View>
          
          {/* Debug info */}
          {energyData.length > 0 && (
            <Text style={{padding: 5, backgroundColor: '#f0f0f0', marginBottom: 5}}>
              Datos disponibles: {energyData.length}
            </Text>
          )}
          
          <ScrollView horizontal>
            <View>
              {/* Table header */}
              <View style={styles.tableHeader}>
                {displayColumns.map((column, index) => (
                  <View key={index} style={[styles.columnCell, {minWidth: 120}]}>
                    <Text style={styles.headerText}>{column}</Text>
                  </View>
                ))}
              </View>
              
              {/* Table rows */}
              <ScrollView style={{maxHeight: 500}}>
                {energyData.length > 0 ? (
                  energyData.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                      {displayColumns.map((column, colIndex) => (
                        <View key={colIndex} style={[styles.columnCell, {minWidth: 120}]}>
                          <Text style={styles.columnText}>{row[column] || 'N/A'}</Text>
                        </View>
                      ))}
                    </View>
                  ))
                ) : (
                  <Text style={styles.message}>No hay datos disponibles</Text>
                )}
              </ScrollView>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}
}