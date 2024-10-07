import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native'

import { useContext } from 'react'
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { screenEnum, AppContext } from '../utils/common'

export default function PhaseListItemComponent({ tournamentId, index }) {
  const {
    getTournament,
    getStyle,
    getPhaseIcon,
    tournamentList,
    setTournamentList
  } = useContext(AppContext)

  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const tournament = getTournament(tournamentId)
  const phase = tournament.phaseList[index]
  const stylesColor = getStyle()
  const stylesBorder = { borderColor: stylesColor.color }
  let finalContent = <View />

  if (tournament.phaseList[1]) {
    const finalColor = stylesColor[tournament.phaseFinalIndex === index ? 'color' : 'backgroundColor']

    const setPhaseFinal = () => {
      const newTournamentList = [ ...tournamentList ]

      setTournamentList(newTournamentList.map(tournamentData => {
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

  const pressItem = () => {
    navigation.navigate(screenEnum.phaseView, { tournamentId, index })
  }

  const pressEdit = () => {
    navigation.navigate(screenEnum.phaseEdit, { tournamentId, index })
  }

  const pressRemove = () => {
    Alert.alert(
      '',
      `確定要移除 ${phase.name} 嗎`,
      [{
        text: '取消'
      }, {
        text: '確定',
        isPreferred: true,
        onPress: () => {
          const newPhaseList = [ ...tournament.phaseList ]
          newPhaseList.splice(index, 1)
          const newTournamentList = [ ...tournamentList ]

          setTournamentList(
            newTournamentList.map(tournamentData => {
              if (tournamentData.id === tournamentId) {
                tournamentData.phaseList = newPhaseList

                if (index < tournamentData.phaseFinalIndex) {
                  tournamentData.phaseFinalIndex--
                }

                if (tournamentData.phaseFinalIndex >= newPhaseList.length) {
                  tournamentData.phaseFinalIndex = 0
                }
              }

              return tournamentData
            })
          )
        }
      }],
      {
        cancelable: true
      }
    )
  }

  return (
    <View style={[styles.component, stylesColor, stylesBorder]}>
      <View style={styles.name}>
        {finalContent}
        <View style={styles.marginRight}>
          {getPhaseIcon(phase.type)}
        </View>
        <TouchableOpacity style={styles.nameText} onPress={pressItem}>
          <Text style={stylesColor}>{phase.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.icon}>
        <TouchableOpacity onPress={pressEdit}>
          <Icon name="pencil" size={24} color={stylesColor.color} style={styles.iconEdit} />
        </TouchableOpacity>
        <TouchableOpacity onPress={pressRemove}>
          <Icon name="trash" size={24} color={stylesColor.color} />
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

  nameText: {
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
