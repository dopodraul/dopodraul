import { TouchableOpacity } from 'react-native'
import { useContext } from 'react'
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { screenEnum, AppContext } from '../utils/common'

export default function RankComponent({ tournamentId, index }) {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const { getStyle } = useContext(AppContext)
  const stylesColor = getStyle()

  const onPress = () => {
    navigation.navigate(screenEnum.rank, { tournamentId, index })
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="ranking-star" size={32} color={stylesColor.color} />
    </TouchableOpacity>
  )
}
