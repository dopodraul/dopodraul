import { StyleSheet } from 'react-native';
import { useContext } from 'react';
import { Picker } from '@react-native-picker/picker';

import { AppContext } from '../utils/context';

type valueType = string;

export default function PickerComponent({
  itemList,
  selectedValue,
  onValueChange
}: {
  selectedValue: valueType;
  onValueChange: (value: valueType) => void;

  itemList: {
    label: string;
    value: valueType;
  }[];
}) {
  const { getStyle } = useContext(AppContext);
  const stylesColor = getStyle();

  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={[styles.container, stylesColor]}
      itemStyle={[styles.item, stylesColor]}
    >
      {
        itemList.map((item) => (
          <Picker.Item
            label={item.label}
            value={item.value} />
        ))
      }
    </Picker>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    height: 40,
    width: 128,
    backgroundColor: '#f0f0f0',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8
  }
});
