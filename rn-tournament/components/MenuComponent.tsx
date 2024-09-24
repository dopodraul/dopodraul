import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default function MenuComponent() {
  const onPress = () => {}

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Icon name="menu" size={32} />
      </TouchableOpacity>
    </View>
  )
}
