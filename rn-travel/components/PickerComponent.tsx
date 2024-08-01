import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type valueType = string;

export default function PickerComponent({
  itemList,
  selectedValue,
  onValueChange,
  style,
  itemStyle
}: {
  selectedValue: valueType;
  onValueChange: (value: valueType) => void;
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<TextStyle>;

  itemList: {
    label: string;
    value: valueType;
  }[];
}) {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={style}
      itemStyle={itemStyle}
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
