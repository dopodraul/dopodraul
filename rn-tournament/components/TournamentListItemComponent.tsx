import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { screenEnum, AppContext } from '../utils/common'

export default function TournamentListItemComponent({ item, navigation }) {
  const { getStyle } = useContext(AppContext)
  const stylesColor = getStyle()
  const stylesBorder = { borderColor: stylesColor.color }

  const pressEdit = () => {
    navigation.navigate(screenEnum.tournamentEdit, { id: item.id })
  }

  return (
    <View style={[styles.component, stylesBorder]}>
      <View style={styles.name}>
        <Text style={stylesColor}>{item.name}</Text>
      </View>
      <View style={styles.icon}>
        <TouchableOpacity onPress={pressEdit}>
          <Icon name="pencil" size={24} color={stylesColor.color} />
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
  }
})
