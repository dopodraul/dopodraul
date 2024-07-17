import {PropsWithChildren, useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

type DropdownProps = PropsWithChildren<{
  value: any;
  onClose: (any) => void;

  items: {
    label: string;
    value: any;
  }[];
}>;

export default function DropdownComponent( props: DropdownProps ) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props.value);
  const [items, setItems] = useState(props.items);

  useEffect(() => {
    if (props.items !== undefined) {
      setItems(props.items);
    }

    if (props.value !== undefined) {
      setValue(props.value);
    }
  }, [props]);

  useEffect(() => {
    if (open === false) {
      props.onClose(value);
    }
  }, [open, props, value]);

  return (
    <DropDownPicker
      open={open}
      items={items}
      value={value}
      setOpen={setOpen}
      setValue={setValue}
    />
  );
}
