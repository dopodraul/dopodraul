import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native'

import { useContext } from 'react'
import { phaseTypeEnum, AppContext } from '../utils/common'
import RoundRobinComponent from '../components/RoundRobinComponent'

export default function PhaseViewScreen({ route }) {
  const { tournamentId, index }: { tournamentId: number, index : number } = route.params
  const { getTournament, countPhaseMatch, getStyle } = useContext(AppContext)
  const tournament = getTournament(tournamentId)
  const phase = tournament.phaseList[index]
  const match = countPhaseMatch(tournamentId, index)
  const stylesColor = getStyle()
  let content = <RoundRobinComponent tournamentId={tournamentId} index={index} />

  switch (phase.type) {
    case phaseTypeEnum.singleEliminate:
      break

    case phaseTypeEnum.doubleEliminate:
      break
  }

  return (
    <View style={[styles.container, stylesColor]}>
      <ScrollView style={styles.title}>
        <Text style={[styles.titleText, stylesColor]}>賽程 {tournament.name}</Text>
        <Text style={[styles.titleText, stylesColor]}>階段 {phase.name}</Text>
        <Text style={[styles.titleText, stylesColor]}>進度 {match.count} / {match.total}</Text>
      </ScrollView>
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  title: {
    maxHeight: 80,
    marginBottom: 8
  },

  titleText: {
    fontSize: 12,
    paddingBottom: 8
  }
})
