import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { screenEnum, AppContext } from '../utils/common'

export default function PhaseListItemComponent({ tournamentId, index, navigation }) {
  const {
    getTournament,
    getStyle,
    getPhaseIcon,
    tournamentList,
    setTournamentList
  } = useContext(AppContext)

  const tournament = getTournament(tournamentId)
  const phase = tournament.phaseList[index]
  const stylesColor = getStyle()
  const stylesBorder = { borderColor: stylesColor.color }
  let finalContent = <View />

  if (tournament.phaseList[1]) {
    const finalColor = stylesColor[tournament.phaseFinalIndex === index ? 'color' : 'backgroundColor']

    const setPhaseFinal = () => {
      const newTournamentList = [ ...tournamentList ]

      setTournamentList(newTournamentList.map((tournamentData) => {
        if (tournamentData.id === tournamentId) {
          tournamentData.phaseFinalIndex = index
        }

        return tournamentData
      }))
    }

    finalContent = <TouchableOpacity onPress={setPhaseFinal}>
        <Icon name="trophy" size={24} color={finalColor} style={styles.marginRight} />
      </TouchableOpacity>
  }

  const pressEdit = () => {
    navigation.navigate(screenEnum.phaseEdit, { tournamentId, index })
  }

  return (
    <View style={[styles.component, stylesColor, stylesBorder]}>
      <View style={styles.name}>
        {finalContent}
        <View style={styles.marginRight}>
          {getPhaseIcon(phase.type)}
        </View>
        <Text style={stylesColor}>{phase.name}</Text>
      </View>
      <View style={styles.icon}>
        <TouchableOpacity onPress={pressEdit}>
          <Icon name="pencil" size={24} color={stylesColor.color} style={styles.iconEdit} />
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    flex: 1
  },

  marginRight: {
    marginRight: 8
  },

  icon: {
    flexDirection: 'row'
  },

  iconEdit: {
    marginLeft: 8,
    marginRight: 8
  }
})
