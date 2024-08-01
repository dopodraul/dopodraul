import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.container}
      itemStyle={styles.item}
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
