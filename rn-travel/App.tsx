import { SafeAreaView, StyleSheet } from 'react-native';

import Index from './Index';
import i18n from './utils/i18n';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Index i18n={i18n} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
