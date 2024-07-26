import { useState, useEffect, PropsWithChildren } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type TodolistProps = PropsWithChildren<{
  isDone: boolean;
  text: string;
}>;

export default function TodolistComponent( props: TodolistProps ) {
  const [isDone, setIsDone] = useState(props.isDone);
  const [doneIcon, setDoneIcon] = useState('');
  const [text, setText] = useState(props.text);

  useEffect(() => {
    setDoneIcon(isDone ? 'check-square-o' : 'square-o');
  }, [isDone]);

  return (
    <TouchableOpacity>
      <View style={styles.item}>
        <TouchableOpacity style={styles.check}>
          <View>
            <Icon name={doneIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.text}>
          <View>
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.remove}>
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
    justifyContent: 'center'
  },
  text: {
    flex: 10
  },
  remove: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
});
