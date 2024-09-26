import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

import { useState, useContext, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { screenEnum, AppContext } from '../utils/common'
import TextInputComponent from '../components/TextInputComponent'

export default function TournamentEditScreen({ navigation }) {
  const route = useRoute()
  const { tournamentList, setTournamentList, getStyle } = useContext(AppContext)
  let value = ''

  if (route.params['id']) {
    tournamentList.some((tournament) => {
      if (tournament.id === route.params['id']) {
        value = tournament.name
        return true
      }
    })
  }

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
          return tournament.id === route.params['id'] ?
            { id: tournament.id, name } :
            tournament
        }) :
        [
          ...tournamentList,
          { id: new Date().valueOf(), name }
        ]
    )

    navigation.navigate(screenEnum.home)
  }

  return (
    <View style={[styles.container, stylesColor]}>
      <View style={styles.row}>
        <View style={styles.rowName}>
          <Text style={stylesColor}>名稱</Text>
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
        <View style={styles.rowName}></View>
        <View style={styles.rowValue}>
          <Button
            title="確認"
            disabled={isDisable}
            onPress={pressConfirmButton} />
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
