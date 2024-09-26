import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { screenEnum, AppContext } from '../utils/common'

export default function HomeScreen({ navigation }) {
  const { tournamentList, getStyle } = useContext(AppContext)
  const stylesColor = getStyle()
  const stylesBorder = { borderColor: stylesColor.color }

  const renderItem = ({ item }) => {
    const pressEdit = () => {
      navigation.navigate(screenEnum.tournamentEdit, { id: item.id })
    }

    return (
      <View style={[styles.item, stylesBorder]}>
        <View style={styles.itemName}>
          <Text style={stylesColor}>{item.name}</Text>
        </View>
        <View style={styles.itemIcon}>
          <TouchableOpacity style={styles.itemIconEdit} onPress={pressEdit}>
            <Icon name="pencil" size={24} color={stylesColor.color} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="swap-vertical" size={24} color={stylesColor.color} />
          </TouchableOpacity>
        </View>
      </View>
    )
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
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 16
  },

  itemName: {
    flex: 1
  },

  itemIcon: {
    flexDirection: 'row'
  },

  itemIconEdit: {
    marginRight: 8
  }
})
