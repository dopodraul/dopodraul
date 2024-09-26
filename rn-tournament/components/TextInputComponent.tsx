import { TextInput, StyleSheet } from 'react-native'
import { useState, useContext } from 'react'
import { AppContext } from '../utils/common'

export default function TextInputComponent({
  value,
  placeholder,
  getResult
}: {
  value: string,
  placeholder: string,
  getResult: (result: string) => void
}) {
  const [result, setResult] = useState(value)
  const { getStyle } = useContext(AppContext)
  const stylesColor = getStyle()
  const stylesBorder = { borderColor: stylesColor.color }

  const onChangeText = (newResult: string) => {
    setResult(newResult)
    getResult(newResult)
  }

  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="gray"
      style={[styles.component, stylesColor, stylesBorder]}
      value={result}
      onChangeText={onChangeText}
    />
  )
}

const styles = StyleSheet.create({
  component: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 16
  }
})
