import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native'

import { useContext } from 'react'
import { AppContext } from '../utils/common'
import TournamentItemComponent from '../components/TournamentItemComponent'

export default function HomeScreen({ navigation }) {
  const { tournamentList, getStyle } = useContext(AppContext)
  const stylesColor = getStyle()

  const renderItem = ({ item }) => {
    return (<TournamentItemComponent item={item} navigation={navigation} />)
  }

  const content = tournamentList[0] ?
    <FlatList
      data={tournamentList}
      renderItem={renderItem}
    /> :
    <Text style={stylesColor}>歡迎使用賽程APP</Text>

  return (
    <View style={[styles.container, stylesColor]}>
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  }
})
