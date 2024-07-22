import {PropsWithChildren, useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

type DropdownProps = PropsWithChildren<{
  zIndex: number,
  zIndexInverse: number,
  open: boolean;
  multiple: boolean;
  min: number;
  max: number;
  value: any;
  onOpen: () => void;
  setOpen: (isOpen: boolean) => void;
  onSelectItem: (value: any) => void;

  items: {
    label: string;
    value: any;
  }[];
}>;

export default function DropdownComponent( props: DropdownProps ) {
  const [value, setValue] = useState(props.value);
  const [items, setItems] = useState(props.items);

  const onPress = () => {
    props.setOpen(!props.open);
  }

  const onSelectItem = (item) => {
    if (props.multiple) {
      if (item.length <= props.max) {
        props.onSelectItem(item.map(hash => hash.value));
      }
    } else {
      props.onSelectItem(item.value);
      props.setOpen(false);
    }
  }

  useEffect(() => {
    if (props.items !== undefined) {
      setItems(props.items);
    }

    if (props.value !== undefined) {
      setValue(props.value);
    }
  }, [props]);

  return (
    <DropDownPicker
      multiple={props.multiple}
      max={props.max}
      min={props.min}
      open={props.open}
      zIndex={props.zIndex}
      zIndexInverse={props.zIndexInverse}
      items={items}
      value={value}
      onOpen={props.onOpen}
      onPress={onPress}
      onSelectItem={onSelectItem}
    />
  );
}
