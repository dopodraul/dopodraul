import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { useContext } from 'react'
import { colorEnum, phaseType, AppContext } from '../utils/common'
import TableComponent from './TableComponent'

export default function RoundRobinComponent({ phase }: { phase: phaseType }) {
  const tableLength = phase.teamList.length + 1
  const teamList = phase.teamList.map((name, index) => name || `隊伍 ${index + 1}`)
  const { colorValue, getStyle } = useContext(AppContext)
  const stylesColor = getStyle()

  const data = Array.from(
    { length: tableLength },
    (_x, indexX) => Array.from(
      { length: tableLength },
      (_y, indexY) => {
        if (indexX === indexY) {
          return <View style={[styles.col, styles.none]} />
        }

        if (indexX === 0 || indexY === 0) {
          const name = teamList[(indexX || indexY) - 1]

          return <TouchableOpacity style={styles.col}>
            <Text style={[styles.text, stylesColor]}>{name}</Text>
          </TouchableOpacity>
        }

        let scoreList: number[]

        if (indexX > indexY) {
          scoreList = [ ...phase.roundRobin.scoreList[indexX - 1][indexY - 1] ]
        } else {
          scoreList = [ ...phase.roundRobin.scoreList[indexY - 1][indexX - 1] ].reverse()
        }

        const isComplete = scoreList[0] !== undefined && scoreList[1] !== undefined
        let text = '尚未比賽'
        let stylesMatch = {}

        if (isComplete) {
          text = `${scoreList[0]} : ${scoreList[1]}`
        } else {
          stylesMatch = { backgroundColor: colorValue === colorEnum.dark ? 'red' : 'pink' }
        }

        return <TouchableOpacity style={[styles.col, stylesMatch]}>
          <Text style={[styles.text, stylesColor, stylesMatch]}>{text}</Text>
        </TouchableOpacity>
      }
    )
  )

  return (
    <View style={styles.container}>
      <TableComponent data={data}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 64
  },

  col: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  none: {
    backgroundColor: 'gray'
  },

  text: {
    fontSize: 8
  }
})
