import { TextInput, StyleSheet, InputModeOptions } from 'react-native'
import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../utils/common'

export default function TextInputComponent({
  value,
  placeholder = '',
  inputMode = 'text',
  textAlign = 'left',
  multiline = false,
  isError = false,
  isEffect = false,
  getResult
}: {
  value: string,
  placeholder?: string,
  inputMode?: InputModeOptions,
  textAlign?: 'left' | 'center',
  multiline?: boolean,
  isError?: boolean,
  isEffect?: boolean,
  getResult: (result: string) => void
}) {
  const [result, setResult] = useState(value)
  const { getStyle } = useContext(AppContext)
  const stylesColor = getStyle()
  const stylesBorder = { borderColor: stylesColor.color }
  const stylesError = isError ? { backgroundColor: 'pink' } : {}

  const onChangeText = (newResult: string) => {
    setResult(newResult)
    getResult(newResult)
  }

  useEffect(() => {
    if (isEffect) {
      setResult(value)
    }
  }, [isEffect, value])

  return (
    <TextInput
      inputMode={inputMode}
      textAlign={textAlign}
      placeholder={placeholder}
      placeholderTextColor="gray"
      multiline={multiline}
      style={[styles.component, stylesColor, stylesBorder, stylesError]}
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
