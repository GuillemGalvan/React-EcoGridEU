import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    perspective: 1000,
  },
  button: {
    width: 280,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backfaceVisibility: 'hidden',
  },
  front: {
    position: 'absolute',
  },
  back: {
    backgroundColor: '#f5f7fa',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});