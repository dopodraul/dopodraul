import { View, TouchableOpacity } from 'react-native'
import { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { screenEnum, AppContext } from '../utils/common'

export default function MenuComponent({ navigation }) {
  const { getStyle } = useContext(AppContext)
  const stylesColor = getStyle()

  const onPress = () => {
    navigation.navigate(screenEnum.menu)
  }

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Icon name="build" size={32} color={stylesColor.color} />
      </TouchableOpacity>
    </View>
  )
}
