import { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TodolistComponent( props: {
  id: number;
  isDone: boolean;
  text: string;
  remove: (id: number) => void
}) {
  const [isDone, setIsDone] = useState(props.isDone);
  const [doneIcon, setDoneIcon] = useState('');
  const [textShow, setTextShow] = useState('');
  const [textSave, setTextSave] = useState('');

  const checkDone = () => {
    setIsDone(!isDone);
  }

  const onChangeText = (value: string) => {
    setTextShow(value);
  }

  const onBlur = () => {
    if (textShow) {
      setTextSave(textShow);
    } else {
      setTextShow(textSave);
    }
  }

  const removeTodo = () => {
    props.remove(props.id);
  }

  useEffect(() => {
    setDoneIcon(isDone ? 'check-square-o' : 'square-o');
  }, [isDone]);

  useEffect(() => {
    setTextShow(props.text);
    setTextSave(props.text);
  }, [props]);

  return (
    <TouchableOpacity>
      <View style={styles.item}>
        <TouchableOpacity style={styles.check} onPress={checkDone}>
          <View>
            <Icon name={doneIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.text}>
          <View>
            <TextInput
              value={textShow}
              onChangeText={onChangeText}
              onBlur={onBlur} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.remove} onPress={removeTodo}>
          <View>
            <Icon name="remove" />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 8,
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 24,
    backgroundColor: '#fffaf0'
  },
  check: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 16
  },
  text: {
    flex: 10
  },
  remove: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 16
  }
});
