import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import CalculatorButton from './components/CalculatorButton';
import CalculatorRow from './components/CalculatorRow';

export default function App() {
  const [calList] = useState(['0']);

  const pressMemoryClear = () => {}

  const pressMemoryResult = () => {}

  const pressEqual = (operatorAfter: string) => {}

  const pressNumber = (input: string) => {}

  const pressOperator = (input: string) => {}

  const pressSign = () => {}

  const pressClear = () => {}

  const pressAllClear = () => {}

  const pressPoint = () => {}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.numberRow}>
        <Text style={styles.numberText}>{calList}</Text>
      </View>
      <CalculatorRow>
        <CalculatorButton title="MC" color="black" onPress={pressMemoryClear} />
        <CalculatorButton title="MR" color="black" onPress={pressMemoryResult} />
        <CalculatorButton title="M-" color="black" onPress={() => { pressEqual('memorySubtract') }} />
        <CalculatorButton title="M+" color="black" onPress={() => { pressEqual('memoryAdd') }} />
        <CalculatorButton title="√" color="black" onPress={() => { pressEqual('root') }} />
      </CalculatorRow>
      <CalculatorRow>
        <CalculatorButton title="%" color="black" onPress={() => { pressEqual('percent') }} />
        <CalculatorButton title="7" color="gray" onPress={() => { pressNumber('7') }} />
        <CalculatorButton title="8" color="gray" onPress={() => { pressNumber('8') }} />
        <CalculatorButton title="9" color="gray" onPress={() => { pressNumber('9') }} />
        <CalculatorButton title="÷" color="black" onPress={() => { pressOperator('÷') }} />
      </CalculatorRow>
      <CalculatorRow>
        <CalculatorButton title="±" color="black" onPress={pressSign} />
        <CalculatorButton title="4" color="gray" onPress={() => { pressNumber('4') }} />
        <CalculatorButton title="5" color="gray" onPress={() => { pressNumber('5') }} />
        <CalculatorButton title="6" color="gray" onPress={() => { pressNumber('6') }} />
        <CalculatorButton title="X" color="black" onPress={() => { pressOperator('X') }} />
      </CalculatorRow>
      <CalculatorRow>
        <CalculatorButton title="C" color="red" onPress={() => { pressClear() }} />
        <CalculatorButton title="1" color="gray" onPress={() => { pressNumber('1') }} />
        <CalculatorButton title="2" color="gray" onPress={() => { pressNumber('2') }} />
        <CalculatorButton title="3" color="gray" onPress={() => { pressNumber('3') }} />
        <CalculatorButton title="-" color="black" onPress={() => { pressOperator('-') }} />
      </CalculatorRow>
      <CalculatorRow>
        <CalculatorButton title="AC" color="red" onPress={pressAllClear} />
        <CalculatorButton title="0" color="gray" onPress={() => { pressNumber('0') }} />
        <CalculatorButton title="." color="gray" onPress={pressPoint} />
        <CalculatorButton title="=" color="black" onPress={() => { pressEqual('') }} />
        <CalculatorButton title="+" color="black" onPress={() => { pressOperator('+') }} />
      </CalculatorRow>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    margin: 16
  },

  numberRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  numberText: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    fontSize: 16
  }
});
