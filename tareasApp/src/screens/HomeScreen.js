import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home </Text>
      <Button title="Ir a Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}