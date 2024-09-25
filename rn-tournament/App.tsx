import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar
} from 'react-native'

import { AppProvider } from './utils/common'
import Index from './Index'

export default function App() {
  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <Index />
      </SafeAreaView>
    </AppProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
})
