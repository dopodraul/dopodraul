import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

import { useContext, useState } from 'react'
import { screenEnum, AppContext } from '../utils/common'
import TextInputComponent from '../components/TextInputComponent'

export default function TeamScreen({ navigation, route }) {
  const { tournamentId, phaseIndex, index } = route.params

  const {
    getTournament,
    setPhase,
    getStyle
  } = useContext(AppContext)

  const tournament = getTournament(tournamentId)
  const phase = tournament.phaseList[phaseIndex]
  let teamName = ''
  const teamNameObj = {}

  phase.teamList.forEach((team, teamIndex) => {
    if (index === teamIndex) {
      teamName = team
    } else if (team) {
      teamNameObj[team] = 1
    }
  })

  const [name, setName] = useState(teamName)
  const stylesColor = getStyle()

  let warningContent = teamNameObj[name] ?
    <View style={styles.row}>
      <View style={styles.rowName} />
      <View style={styles.rowValue}>
        <Text style={styles.warning}>警告: 階段當中有別的同名隊伍 </Text>
      </View>
    </View> :
  <View />

  const getName = (newName: string) => {
    setName(newName)
  }

  const pressConfirmButton = () => {
    setPhase(
      tournamentId,
      phaseIndex,
      {
        ...phase,
        teamList: phase.teamList.map(
          (team, teamIndex) => { return index === teamIndex ? name : team }
        )
      }
    )

    navigation.navigate(screenEnum.phaseView, { tournamentId, index: phaseIndex })
  }

  return (
    <View style={[styles.container, stylesColor]}>
      <View style={styles.row}>
        <View style={styles.rowName}>
          <Text style={stylesColor}>賽程</Text>
        </View>
        <View style={styles.rowValue}>
          <Text style={stylesColor}>{tournament.name}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.rowName}>
          <Text style={stylesColor}>階段</Text>
        </View>
        <View style={styles.rowValue}>
          <Text style={stylesColor}>{phase.name}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.rowName}>
          <Text style={stylesColor}>隊伍{index + 1}</Text>
        </View>
        <View style={styles.rowValue}>
          <TextInputComponent
            value={teamName}
            placeholder="請輸入隊伍名稱"
            getResult={getName}
          />
        </View>
      </View>
      {warningContent}
      <View style={styles.row}>
        <View style={styles.rowName} />
        <View style={styles.rowValue}>
          <Button title="確認" onPress={pressConfirmButton} />
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

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 32
  },

  rowName: {
    flex: 1
  },

  rowValue: {
    flex: 3
  },

  warning: {
    color: 'crimson'
  }
})
