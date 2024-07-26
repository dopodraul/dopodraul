import { Text, View, SafeAreaView, TextInput, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// or any files within the Snack
import TodolistComponent from './components/TodolistComponent';

const TodolistCard = (props: {
  todoList: { id: number, isDone: boolean; text: string; }[],
  setIsDone: (id: number, isDone: boolean) => void;
  setText: (id: number, text: string) => void;
  remove: (id: number) => void
}) => {
  const [todoList, setTodoList] = useState(props.todoList);

  useEffect(() => {
    setTodoList(props.todoList);
  }, [props]);

  if (todoList[0]) {
    return (
      <View>{
        todoList.map((hash) => (
          <TodolistComponent
            id={hash.id}
            isDone={hash.isDone}
            text={hash.text}
            setIsDone={props.setIsDone}
            setText={props.setText}
            remove={props.remove} />
        ))
      }</View>
    );
  }

  return (<View><Text>尚無待辦項目，請由上列選單添加</Text></View>);
}

export default function App() {
  const [id, setId] = useState(1);
  const [textAdd, setTextAdd] = useState('');
  const [todoList, setTodoList] = useState<any[]>([]);
  const [addColor, setAddColor] = useState('');

  const addTodo = () => {
    if (textAdd) {
      setTodoList([...todoList, {
        id,
        text: textAdd,
        isDone: false
      }]);

      setId(id + 1);
      setTextAdd('');
    }
  }

  const setIsDone = (id: number, isDone: boolean) => {
    setTodoList(todoList.map(hash => {
      return id === hash.id ? Object.assign(hash, {isDone}) : hash;
    }));
  }

  const setText = (id: number, text: string) => {
    setTodoList(todoList.map(hash => {
      return id === hash.id ? Object.assign(hash, {text}) : hash;
    }));
  }

  const removeTodo = (id: number) => {
    setTodoList(todoList.filter(hash => {
      return id !== hash.id;
    }));
  }

  useEffect(() => {
    setAddColor(textAdd ? 'black' : '#fffaf0');
  }, [textAdd]);

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.menu}>
          <View style={styles.menuInput}>
            <TextInput
              value={textAdd}
              onChangeText={setTextAdd}
              placeholder="請輸入待辦項目" />
          </View>
          <TouchableOpacity style={styles.menuAdd} onPress={addTodo}>
            <View>
              <Icon name="plus" color={addColor} />
            </View>
          </TouchableOpacity>
        </View>
      </Card>
      <Card style={styles.card}>
        <ScrollView style={{maxHeight: Dimensions.get('window').height - 224}}>
          <TodolistCard
            todoList={todoList}
            setIsDone={setIsDone}
            setText={setText}
            remove={removeTodo} />
        </ScrollView>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
    marginTop: 32,
    marginBottom: 32,
    marginLeft: 16,
    marginRight: 16
  },
  card: {
    padding: 16,
    margin: 16
  },
  menu: {
    flexDirection: 'row',
  },
  menuInput: {
    flex: 5,
    borderWidth: 1,
    padding: 8
  },
  menuAdd: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 24
  }
});
