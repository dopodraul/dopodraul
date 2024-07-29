import { Text, View, SafeAreaView, TextInput, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';

// or any files within the Snack
import TodolistComponent from './components/TodolistComponent';

const windowHeight = Dimensions.get('window').height;

type itemType = {
  id: number;
  isDone: boolean;
  text: string;
};

const TodolistCard = (props: {
  todolist: itemType[];
  setIsDone: (id: number, isDone: boolean) => void;
  setText: (id: number, text: string) => void;
  remove: (id: number) => void;
  setTodolist: (todolist: itemType[]) => void;
}) => {
  const [todolist, setTodolist] = useState(props.todolist);

  const keyExtractor = (item: itemType) => {
    return item.id.toString();
  }

  const renderItem = (info: DragListRenderItemInfo<itemType>) => {
    const {item, onDragStart, onDragEnd} = info;

    return (
      <TouchableOpacity
        onPressIn={onDragStart}
        onPressOut={onDragEnd}>
        <TodolistComponent
          id={item.id}
          isDone={item.isDone}
          text={item.text}
          setIsDone={props.setIsDone}
          setText={props.setText}
          remove={props.remove} />
      </TouchableOpacity>
    );
  }

  const onReordered = (fromIndex: number, toIndex: number) => {
    const newTodolist = [...todolist];
    const todolistDrag = newTodolist.splice(fromIndex, 1);
    newTodolist.splice(toIndex, 0, todolistDrag[0]);
    props.setTodolist(newTodolist);
  }

  useEffect(() => {
    setTodolist(props.todolist);
  }, [props]);

  if (todolist[0]) {
    return (
      <View>
        <DragList
          data={todolist}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onReordered={onReordered} />
      </View>
    );
  }

  return (<View><Text>尚無待辦項目，請由上列選單添加</Text></View>);
}

type MessageBarPropsTodoType = {
  id: number;
  isDone: boolean;
  text: string;
  index: number;
};

const MessageBar = (props: {
  message: string;
  todoUndo: MessageBarPropsTodoType;
  undoRemove: (hash: MessageBarPropsTodoType) => void;
}) => {
  const [message, setMessage] = useState('');

  const [todoUndo, setTodoUndo] = useState({
    id: 0,
    text: '',
    isDone: false,
    index: 0
  });

  const undoRemove = () => {
    props.undoRemove(todoUndo);
  }

  useEffect(() => {
    setMessage(props.message);
    setTodoUndo(props.todoUndo);
  }, [props]);

  if (message) {
    return (
      <View
        style={[
          styles.message,
          {
            top: windowHeight - 96,
            width: Dimensions.get('window').width - 32
          }
        ]}>
        <View>
          <Text>{message}</Text>
        </View>
        <TouchableOpacity onPress={undoRemove}>
          <Text style={styles.messageUndo}>復原</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (<View></View>);
}

export default function App() {
  const [id, setId] = useState(1);
  const [textAdd, setTextAdd] = useState('');
  const [todolist, setTodolist] = useState<any[]>([]);
  const [addColor, setAddColor] = useState('');
  const [message, setMessage] = useState('');
  const [timeoutId, setTimeoutId] = useState(setTimeout(() => {}));

  const [todoUndo, setTodoUndo] = useState({
    id: 0,
    text: '',
    isDone: false,
    index: 0
  });

  const addTodo = () => {
    if (textAdd) {
      setTodolist([...todolist, {
        id,
        text: textAdd,
        isDone: false
      }]);

      setId(id + 1);
      setTextAdd('');
    }
  }

  const setIsDone = (id: number, isDone: boolean) => {
    setTodolist(todolist.map(hash => {
      return id === hash.id ? {...hash, ...{isDone}} : hash;
    }));
  }

  const setText = (id: number, text: string) => {
    setTodolist(todolist.map(hash => {
      return id === hash.id ? {...hash, ...{text}} : hash;
    }));
  }

  const removeTodo = (id: number) => {
    clearTimeout(timeoutId);
    const newTodoList : any[] = [];

    todolist.forEach((hash, index) => {
      if (id === hash.id) {
        setMessage('已移除 ' + hash.text);
        setTodoUndo({...hash, ...{index}});

        setTimeoutId(setTimeout(() => {
          setMessage('');
        }, 8000));
      } else {
        newTodoList.push(hash);
      }
    });

    setTodolist(newTodoList);
  }

  const undoRemove = (hash: MessageBarPropsTodoType) => {
    setMessage('');

    setTodolist(
      todolist.slice(0, hash.index)
        .concat([hash])
        .concat(todolist.slice(hash.index))
      );
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
        <ScrollView style={{maxHeight: windowHeight - 224}}>
          <TodolistCard
            todolist={todolist}
            setIsDone={setIsDone}
            setText={setText}
            remove={removeTodo}
            setTodolist={setTodolist} />
        </ScrollView>
      </Card>
      <MessageBar
        message={message}
        todoUndo={todoUndo}
        undoRemove={undoRemove} />
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
    paddingRight: 24
  },
  message: {
    position: 'absolute',
    zIndex: 100,
    flexDirection: 'row',
    backgroundColor: '#a9a9a9',
    padding: 16
  },
  messageUndo: {
    marginLeft: 8,
    color: 'blue'
  }
});
