import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#3B5BDB',
  secondary: '#5C7CFA',
  background: '#F5F6FA',
  white: '#FFFFFF',
  text: '#1F2937',
  gray: '#9CA3AF',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colors.text,
  },

  input: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  link: {
    marginTop: 10,
    textAlign: 'center',
    color: colors.primary,
  }
});