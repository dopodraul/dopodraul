import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

import { useContext, useState } from 'react'
import { phaseTypeEnum, screenEnum, AppContext } from '../utils/common'
import ScoreComponent from '../components/ScoreComponent'

export default function ScoreScreen({ navigation, route }) {
  const {
    tournamentId,
    phaseIndex,
    indexList: indexRoute
  } = route.params

  const {
    getStyle,
    getTournament,
    setPhase
  } = useContext(AppContext)

  const tournament = getTournament(tournamentId)
  const phase = tournament.phaseList[phaseIndex]
  const [isDisable, setIsDisable] = useState(true)
  let round = ''
  let isDraw = false
  let isReverse = false
  let indexList = [ ...indexRoute ]
  let teamList: string[] = []
  let scoreList: number[] = []

  if (phase.type === phaseTypeEnum.roundRobin) {
    isDraw = true
    teamList = indexRoute.map((index : number) => phase.teamList[index] || `隊伍${index + 1}`)
    isReverse = indexList[0] < indexList[1]

    if (isReverse) {
      indexList = [ indexRoute[1], indexRoute[0] ]
    }

    scoreList = [ ...phase.roundRobin.scoreList[indexList[0]][indexList[1]] ]

    if (isReverse) {
      scoreList = scoreList.reverse()
    }
  }

  const stylesColor = getStyle()

  const getScore = (result: number, index: number) => {
    scoreList[index] = result

    setIsDisable(
      isNaN(scoreList[0]) ||
      isNaN(scoreList[1]) ||
      (!isDraw && (scoreList[0] === scoreList[1]))
    )
  }

  const pressConfirmButton = () => {
    const newPhase = { ...phase }

    if (phase.type === phaseTypeEnum.roundRobin) {
      newPhase.roundRobin.scoreList[indexList[0]][indexList[1]] = isReverse ? scoreList.reverse() : scoreList
    }

    setPhase(tournamentId, phaseIndex, newPhase)
    navigation.navigate(screenEnum.phaseView, { tournamentId, index: phaseIndex })
  }

  return (
    <View style={[styles.container, stylesColor]}>
      <View style={styles.row}>
        <View>
          <Text style={[stylesColor, styles.title]}>賽程 {tournament.name}</Text>
          <Text style={[stylesColor, styles.title]}>階段 {phase.name}</Text>
          <Text style={[stylesColor, styles.title]}>{round}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.firstCol}>
          <Text style={stylesColor}>{teamList[0]}</Text>
        </View>
        <View style={styles.col}>
          <ScoreComponent value={scoreList[0]} getScore={ (result) => { getScore(result, 0) }}
          />
        </View>
        <View style={styles.col}>
          <ScoreComponent value={scoreList[1]} getScore={ (result) => { getScore(result, 1) }} />
        </View>
        <View style={styles.lastCol}>
          <Text style={stylesColor}>{teamList[1]}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.button}>
          <Button
            title="確認"
            disabled={isDisable}
            onPress={pressConfirmButton}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  title: {
    marginBottom: 8
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 32
  },

  firstCol: {
    flex: 1,
    paddingRight: 8,
    alignItems: 'flex-end'
  },

  col: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8
  },

  lastCol: {
    flex: 1,
    paddingLeft: 8
  },

  button: {
    flex: 1
  }
})
