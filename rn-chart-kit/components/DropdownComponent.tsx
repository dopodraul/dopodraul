import {PropsWithChildren, useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

type DropdownProps = PropsWithChildren<{
  open: boolean;
  value: any;
  onOpen: () => void;
  setOpen: (boolean) => void;
  setValue: (any) => void;
  onClose: (any) => void;

  items: {
    label: string;
    value: any;
  }[];
}>;

export default function DropdownComponent( props: DropdownProps ) {
  const [result, setResult] = useState(props.value);
  const [items, setItems] = useState(props.items);

  const setValue = (_setValue) => {
    const newValue = _setValue();
    setResult(newValue);
    props.setValue(newValue);
    props.setOpen(false);
  }

  const onPress = () => {
    props.setOpen(!props.open);
  }

  useEffect(() => {
    if (props.items !== undefined) {
      setItems(props.items);
    }

    if (props.value !== undefined) {
      setResult(props.value);
    }
  }, [props]);

  return (
    <DropDownPicker
      open={props.open}
      items={items}
      value={result}
      setValue={setValue}
      onOpen={props.onOpen}
      onPress={onPress}
    />
  );
}
