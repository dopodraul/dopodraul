import { Text, SafeAreaView, StyleSheet } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import TodolistComponent from './components/TodolistComponent';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Text></Text>
      </Card>
      <Card style={styles.card}>
        <TodolistComponent isDone={true} text="Content" />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    marginTop: 32,
    marginBottom: 32,
    marginLeft: 16,
    marginRight: 16
  },
  card: {
    padding: 8,
    marginBottom: 8
  }
});
