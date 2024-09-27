import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet
} from 'react-native'

import { useContext } from 'react'
import { AppContext } from '../utils/common'
import TournamentListItemComponent from '../components/TournamentListItemComponent'

export default function HomeScreen({ navigation }) {
  const { tournamentList, getStyle } = useContext(AppContext)
  const stylesColor = getStyle()

  const renderItem = ({ item }) => {
    return (<TournamentListItemComponent item={item} navigation={navigation} />)
  }

  const content = tournamentList[0] ?
    <ScrollView>
      <FlatList
        data={tournamentList}
        renderItem={renderItem}
      />
    </ScrollView> :
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
