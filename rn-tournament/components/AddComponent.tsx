import { View, TouchableOpacity } from 'react-native'
import { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { screenEnum, AppContext } from '../utils/common'

export default function MenuComponent({ navigation, style }) {
  const { getStyle } = useContext(AppContext)
  const stylesColor = getStyle()

  const onPress = () => {
    navigation.navigate(screenEnum.tournamentEdit, {})
  }

  return (
    <View style={style}>
      <TouchableOpacity onPress={onPress}>
        <Icon name="add-circle" size={32} color={stylesColor.color} />
      </TouchableOpacity>
    </View>
  )
}
