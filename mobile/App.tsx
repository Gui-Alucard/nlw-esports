import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity>
      <Text style={styles.ButtonStyle}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello Expo!</Text>
      <Button title="Like" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonStyle: {
    backgroundColor: '#0077b5',
    color: '#fff',
    padding: 8,
    marginTop: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
