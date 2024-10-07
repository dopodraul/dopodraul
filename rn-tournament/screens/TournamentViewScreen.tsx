import {
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { screenEnum, AppContext } from '../utils/common'
import PhaseListItemComponent from '../components/PhaseListItemComponent'

export default function TournamentViewScreen({ navigation, route }) {
  const { getTournament, getStyle } = useContext(AppContext)
  const tournament = getTournament(route.params['id'])
  const stylesColor = getStyle()

  const addPhase = () => {
    navigation.navigate(screenEnum.phaseEdit, { tournamentId: route.params['id'] })
  }

  const renderItem = ({ index }) => {
    return (
      <PhaseListItemComponent
        tournamentId={route.params['id']}
        index={index}
      />
    )
  }

  const phaseContent = tournament.phaseList[0] ?
    <ScrollView>
      <FlatList
        data={tournament.phaseList}
        renderItem={renderItem}
      />
    </ScrollView> :
    <View style={styles.add}>
      <Icon name="add-circle" size={32} color={stylesColor.color} />
      <TouchableOpacity onPress={addPhase}>
        <Text style={stylesColor}>添加階段</Text>
      </TouchableOpacity>
    </View>

  return (
    <View style={[styles.container, stylesColor]}>
      <View style={styles.title}>
        <Text style={[styles.titleText, stylesColor]}>{tournament.name}</Text>
      </View>
      {phaseContent}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  title: {
    paddingBottom: 32
  },

  titleText: {
    fontSize: 24
  },

  add: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
