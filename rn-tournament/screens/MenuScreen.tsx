import { View, Text, StyleSheet } from 'react-native'
import { useContext } from 'react'
import { AppContext } from '../utils/common'
import PickerComponent from '../components/PickerComponent'

export default function MenuScreen() {
  const {
    colorEnum,
    colorValue,
    setColorValue,
    getStyle
  } = useContext(AppContext)

  const stylesColor = getStyle()

  const colorList = [{
    label: '淺色',
    value: colorEnum.light
  }, {
    label: '深色',
    value: colorEnum.dark
  }]

  return (
    <View style={[styles.container, stylesColor]}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={stylesColor}>顏色</Text>
        </View>
        <View style={styles.column}>
          <PickerComponent
            itemList={colorList}
            selectedValue={colorValue}
            onValueChange={setColorValue}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  column: {
    flex: 1
  }
})
