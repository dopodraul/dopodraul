import { View, Text, StyleSheet } from 'react-native'
import { useContext } from 'react'
import { AppContext } from '../utils/common'

export default function HomeScreen() {
  const { getStyle } = useContext(AppContext)
  const stylesColor = getStyle()

  return (
    <View style={[styles.container, stylesColor]}>
      <Text style={stylesColor}>歡迎使用賽程APP</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  }
})
