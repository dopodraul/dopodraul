import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { tournamentType, AppContext } from '../utils/common'
import { DragListRenderItemInfo } from 'react-native-draglist'

export default function TournamentSortItemComponent({ info }: { info: DragListRenderItemInfo<tournamentType> }) {
  const { getStyle } = useContext(AppContext)
  const stylesColor = getStyle()
  const stylesBorder = { borderColor: stylesColor.color }
  const {item, onDragStart, onDragEnd, isActive} = info;
  const stylesBackground = isActive ? { backgroundColor: 'aqua' } : {}

  return (
    <TouchableOpacity
      style={[styles.component, stylesBorder, stylesBackground]}
      key={item.id}
      onPressIn={onDragStart}
      onPressOut={onDragEnd}
    >
      <Icon name="chevron-expand" color={stylesColor.color} size={24} />
      <Text style={[styles.text, stylesColor, stylesBackground]}>{item.name}</Text>
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

  text: {
    paddingLeft: 8
  }
})
