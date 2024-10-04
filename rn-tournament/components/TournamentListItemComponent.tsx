import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native'

import { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { screenEnum, AppContext } from '../utils/common'

export default function TournamentListItemComponent({ item, navigation }) {
  const { tournamentList, setTournamentList, getStyle } = useContext(AppContext)
  const stylesColor = getStyle()
  const stylesBorder = { borderColor: stylesColor.color }

  const pressItem = () => {
    navigation.navigate(screenEnum.tournamentView, { id: item.id })
  }

  const pressEdit = () => {
    navigation.navigate(screenEnum.tournamentEdit, { id: item.id })
  }

  const pressRemove = () => {
    Alert.alert(
      '',
      `確定要移除 ${item.name} 嗎`,
      [{
        text: '取消'
      }, {
        text: '確定',
        isPreferred: true,
        onPress: () => { setTournamentList(tournamentList.filter(tournament => tournament.id !== item.id)) }
      }],
      {
        cancelable: true
      }
    )
  }

  return (
    <View style={[styles.component, stylesBorder]}>
      <View style={styles.name}>
        <TouchableOpacity onPress={pressItem}>
          <Text style={stylesColor}>{item.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.icon}>
        <TouchableOpacity onPress={pressEdit} style={styles.iconEdit}>
          <Icon name="pencil" size={24} color={stylesColor.color} />
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
    flex: 1
  },

  icon: {
    flexDirection: 'row'
  },

  iconEdit: {
    marginLeft: 8,
    marginRight: 8
  }
})
