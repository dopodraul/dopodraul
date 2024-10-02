import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import { useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { phaseTypeEnum, AppContext } from '../utils/common'

export default function PhaseListItemComponent({ tournamentId, index }) {
  let iconName = 'table-large'
  const { getTournament, getStyle } = useContext(AppContext)
  const tournament = getTournament(tournamentId)
  const phase = tournament.phaseList[index]
  const stylesColor = getStyle()
  const stylesBorder = { borderColor: stylesColor.color }
  const finalColor = stylesColor[tournament.phaseFinalIndex === index ? 'color' : 'backgroundColor']

  switch (phase.type) {
    case phaseTypeEnum.singleEliminate:
      iconName = 'tournament'
      break

    case phaseTypeEnum.doubleEliminate:
      iconName = 'axis-y-arrow'
  }

  return (
    <View style={[styles.component, stylesColor, stylesBorder]}>
      <View style={styles.name}>
        <Icon name="trophy" size={24} color={finalColor} style={styles.marginRight} />
        <Icon name={iconName} size={24} color={stylesColor.color} style={styles.marginRight} />
        <Text style={stylesColor}>{phase.name}</Text>
      </View>
      <View style={styles.icon}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  component: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 16
  },

  name: {
    flexDirection: 'row',
    flex: 1
  },

  marginRight: {
    marginRight: 8
  },

  icon: {
  }
})
