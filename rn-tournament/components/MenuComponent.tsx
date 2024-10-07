import { View, TouchableOpacity } from 'react-native'
import { useContext } from 'react'
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { screenEnum, AppContext } from '../utils/common'

export default function MenuComponent() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
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
