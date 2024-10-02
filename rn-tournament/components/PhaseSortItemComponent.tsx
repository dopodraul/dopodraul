import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

import { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { DragListRenderItemInfo } from 'react-native-draglist';
import { phaseType, AppContext } from '../utils/common'

export default function PhaseSortItemComponent({ info }: { info: DragListRenderItemInfo<phaseType> }) {
  const { getStyle, getPhaseIcon } = useContext(AppContext)
  const stylesColor = getStyle()
  const stylesBorder = { borderColor: stylesColor.color }
  const {item, index, onDragStart, onDragEnd, isActive} = info
  const stylesBackground = isActive ? { backgroundColor: 'aqua' } : {}

  return (
    <TouchableOpacity
      style={[styles.component, stylesBorder, stylesBackground]}
      key={index}
      onPressIn={onDragStart}
      onPressOut={onDragEnd}
    >
      <Icon name="chevron-expand" color={stylesColor.color} size={24} style={styles.icon} />
      <View style={styles.icon}>
        {getPhaseIcon(item.type)}
      </View>
      <Text style={[stylesColor, stylesBackground]}>{item.name}</Text>
    </TouchableOpacity>
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

  icon: {
    paddingRight: 8
  }
})
