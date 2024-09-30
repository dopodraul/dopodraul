import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native'

import { useContext } from 'react'
import { useRoute } from '@react-navigation/native'
import { AppContext } from '../utils/common'

export default function TournamentViewScreen() {
  const route = useRoute()
  const { getTournament, getStyle } = useContext(AppContext)
  const tournament = getTournament(route.params['id'])
  const stylesColor = getStyle()

  return (
    <View style={[styles.container, stylesColor]}>
      <View>
        <Text style={stylesColor}>{tournament.name}</Text>
      </View>
      <ScrollView style={styles.phase}>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  phase: {
    marginTop: 8
  }
})
