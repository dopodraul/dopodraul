import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native'

import { useContext } from 'react'
import { phaseTypeEnum, AppContext } from '../utils/common'
import RoundRobinComponent from '../components/RoundRobinComponent'

export default function PhaseViewScreen({ navigation, route }) {
  const { tournamentId, index }: { tournamentId: number, index : number } = route.params
  const { getTournament, getStyle } = useContext(AppContext)
  const tournament = getTournament(tournamentId)
  const phase = tournament.phaseList[index]
  const stylesColor = getStyle()
  let content = <RoundRobinComponent phase={phase} />

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
    maxHeight: 64,
    marginBottom: 8
  },

  titleText: {
    paddingBottom: 8
  }
})
