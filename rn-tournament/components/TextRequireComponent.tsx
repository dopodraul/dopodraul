import { View, Text, StyleSheet } from 'react-native'
import { useContext } from 'react'
import { AppContext } from '../utils/common'

export default function TextRequireComponent({ text }) {
  const { getStyle } = useContext(AppContext)
  const stylesColor = getStyle()

  return (
    <View style={styles.component}>
      <Text style={stylesColor}>{text}</Text>
      <Text style={styles.require}>*</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  component: {
    flexDirection: 'row'
  },

  require: {
    color: 'red'
  }
})
