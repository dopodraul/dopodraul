import { View, Button, StyleSheet } from 'react-native'
import { useState, useContext, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { screenEnum, AppContext } from '../utils/common'
import TextRequireComponent from '../components/TextRequireComponent'
import TextInputComponent from '../components/TextInputComponent'

export default function TournamentEditScreen({ navigation }) {
  const {
    tournamentList,
    setTournamentList,
    getTournament,
    getStyle
  } = useContext(AppContext)

  const route = useRoute()
  const value = route.params['id'] ? getTournament(route.params['id']).name : ''
  const [name, setName] = useState(value)
  const [isDisable, setIsDisable] = useState(true)
  const stylesColor = getStyle()

  const getName = (newName: string) => {
    setName(newName)
  }

  useEffect(() => {
    setIsDisable(!name)
  }, [name])

  const pressConfirmButton = () => {
    setTournamentList(
      route.params['id'] ?
        tournamentList.map((tournament) => {
          if (tournament.id === route.params['id']) {
            tournament.name = name
          }

          return tournament
        }) :
        [
          {
            id: new Date().valueOf(),
            name,
            phaseFinalIndex: 0,
            phaseList: []
          },
          ...tournamentList
        ]
    )

    navigation.navigate(screenEnum.home)
  }

  return (
    <View style={[styles.container, stylesColor]}>
      <View style={styles.row}>
        <View style={styles.rowName}>
          <TextRequireComponent text="名稱" />
        </View>
        <View style={styles.rowValue}>
          <TextInputComponent
            value={value}
            placeholder="請輸入賽程名稱"
            getResult={getName}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.rowName} />
        <View style={styles.rowValue}>
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
  }
})
