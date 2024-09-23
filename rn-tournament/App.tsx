import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar
} from 'react-native'

import Index from './Index'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Index />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
})
