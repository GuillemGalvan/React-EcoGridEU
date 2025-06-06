import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const BotoPersonalitzat = ({
  title,
  onPress,
  buttonColor = '#FFC107', 
  textColor   = '#000000', 
}) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: buttonColor }]}
    onPress={onPress}
  >
    <Text style={[styles.text, { color: textColor }]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    paddingVertical: 14,
    borderRadius: 8,
    elevation: 3,          
    shadowColor: '#000',    
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
