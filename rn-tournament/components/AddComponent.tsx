import { TouchableOpacity } from 'react-native'
import { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { AppContext } from '../utils/common'

export default function MenuComponent({ navigation, routeName, routeParam = {} }) {
  const { getStyle } = useContext(AppContext)
  const stylesColor = getStyle()

  const onPress = () => {
    navigation.navigate(routeName, routeParam)
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="add-circle" size={32} color={stylesColor.color} />
    </TouchableOpacity>
  )
}
