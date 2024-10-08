import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { AppContext } from '../utils/common'
import TextInputComponent from './TextInputComponent'
type scoreType = number | undefined

export default function ScoreComponent({ value, getScore }: {
  value: scoreType,
  getScore: (result: scoreType) => void
}) {
  const [scoreText, setScoreText] = useState(value === undefined ? '0' : value.toString())
  const { getStyle } = useContext(AppContext)
  const stylesColor = getStyle()

  const changeScore = (diff: number) => {
    const score = Number(scoreText)
    setScoreText(isNaN(score) ? '0' : (score + diff).toString())
  }

  const getResult = (resultStr: string) => {
    setScoreText(resultStr)
  }

  useEffect(() => {
    getScore(Number(scoreText))
  }, [scoreText, getScore])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => { changeScore(1) }}>
        <Icon name="caret-up" color={stylesColor.color} size={24} />
      </TouchableOpacity>
      <View style={styles.item}>
        <TextInputComponent
          value={scoreText}
          inputMode="numeric"
          textAlign="center"
          isEffect={true}
          getResult={getResult}
        />
      </View>
      <TouchableOpacity onPress={() => { changeScore(-1) }}>
        <Icon name="caret-down" color={stylesColor.color} size={24} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },

  item: {
    paddingBottom: 8
  }
})
