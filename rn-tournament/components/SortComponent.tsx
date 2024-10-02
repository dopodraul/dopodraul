import { TouchableOpacity } from 'react-native'
import { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { AppContext } from '../utils/common'

export default function SortComponent({ navigation, routeName, routeParam = {} }) {
  const { getStyle } = useContext(AppContext)
  const stylesColor = getStyle()

  const onPress = () => {
    navigation.navigate(routeName, routeParam)
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="swap-vertical" size={32} color={stylesColor.color} />
    </TouchableOpacity>
  )
}
