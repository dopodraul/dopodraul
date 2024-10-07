import { TouchableOpacity } from 'react-native'
import { useContext } from 'react'
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { screenEnum, AppContext } from '../utils/common'

export default function SortComponent({ screenName, screenParam = {} }: { screenName: screenEnum, screenParam?: object }) {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const { getStyle } = useContext(AppContext)
  const stylesColor = getStyle()

  const onPress = () => {
    navigation.navigate(screenName, screenParam)
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="swap-vertical" size={32} color={stylesColor.color} />
    </TouchableOpacity>
  )
}
