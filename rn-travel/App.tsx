import { SafeAreaView, StyleSheet } from 'react-native';

import Index from './Index';
import { AppProvider } from './utils/common';

function App() {
  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <Index />
      </SafeAreaView>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
