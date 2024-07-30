import { SafeAreaView, StyleSheet } from 'react-native';

import Index from './Index';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Index />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
