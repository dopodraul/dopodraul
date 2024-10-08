import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { useContext } from 'react'
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native'
import { screenEnum, colorEnum, AppContext } from '../utils/common'
import TableComponent from './TableComponent'

export default function RoundRobinComponent({ tournamentId, index }) {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const { getTournament, colorValue, getStyle } = useContext(AppContext)
  const tournament = getTournament(tournamentId)
  const phase = tournament.phaseList[index]
  const tableLength = phase.teamList.length + 1
  const teamList = phase.teamList.map((name, index) => name || `隊伍 ${index + 1}`)
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
          const teamIndex = (indexX || indexY) - 1
          const name = teamList[teamIndex]

          const editTeam = () => {
            navigation.navigate(screenEnum.team, {
              tournamentId,
              phaseIndex: index,
              index: teamIndex
            })
          }

          return <TouchableOpacity style={styles.col} onPress={editTeam}>
            <Text style={[styles.text, stylesColor]}>{name}</Text>
          </TouchableOpacity>
        }

        let scoreList: number[]

        if (indexX > indexY) {
          scoreList = [ ...phase.roundRobin.scoreList[indexX - 1][indexY - 1] ]
        } else {
          scoreList = [ ...phase.roundRobin.scoreList[indexY - 1][indexX - 1] ].reverse()
        }

        let text = '尚未比賽'
        let stylesMatch = {}

        if (scoreList[0] !== undefined && scoreList[1] !== undefined) {
          text = `${scoreList[0]} : ${scoreList[1]}`
        } else {
          stylesMatch = { backgroundColor: colorValue === colorEnum.dark ? 'red' : 'pink' }
        }

        const editScore = () => {
          navigation.navigate(screenEnum.score, {
            tournamentId,
            phaseIndex: index,
            indexList: [indexX - 1, indexY - 1]
          })
        }

        return <TouchableOpacity style={[styles.col, stylesMatch]} onPress={editScore}>
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
