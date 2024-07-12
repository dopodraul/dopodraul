import { Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import CalculatorRow from '../components/CalculatorRow';
import CalculatorButton from '../components/CalculatorButton';

export default function Index() {
  const errorResult = 'ERROR';
  const [numberMemory, setNumberMemory] = useState(0);
  const [calList, setCalList] = useState(['0']);

  const pressNumber = (input: string) => {
    const indexTarget = calList.length - 1;

    const newCalList = calList.map((text, index) => {
      if (index === indexTarget) {
        if (text === '0' || text === errorResult) {
          return input;
        }

        if (text === '-0') {
          return '-' + input;
        }

        return text + input;
      }

      return text;
    });

    setCalList(newCalList);
  }

  const pressOperator = (input: string) => {
    const calListLength = calList.length;

    if (calListLength === 1) {
      setCalList([calList[0] === errorResult ? '0' : calList[0], input, '0']);
    } else if (calList[calListLength - 1] !== '0') {
      setCalList([...calList, input, '0']);
    }
  }

  const pressEqual = (operatorAfter: string) => {
    const numberLhs = Number(calList[0]);
    let numberCal = isNaN(numberLhs) ? 0 : numberLhs;
    const calListLength = calList.length;

    for (let index = 1; index < calListLength - 1; index += 2) {
      const operator = calList[index];
      const numberRhs = Number(calList[index + 1]);

      switch (operator) {
        case '+':
          numberCal += numberRhs;
          break;

        case '-':
          numberCal -= numberRhs;
          break;

        case 'X':
          numberCal *= numberRhs;
          break;

        case '÷':
          numberCal /= numberRhs;
          break;
      }
    }

    if (operatorAfter === 'root') {
      const numberResult = Math.sqrt(numberCal);
      setCalList([isFinite(numberResult) ? String(numberResult) : errorResult]);
    } else if (operatorAfter === 'percent') {
      const numberResult = numberCal / 100;
      setCalList([isFinite(numberResult) ? String(numberResult) : errorResult]);
    } else {
      setCalList([isFinite(numberCal) ? String(numberCal) : errorResult]);

      if (operatorAfter === 'memoryAdd') {
        setNumberMemory(numberMemory + numberCal);
      } else if (operatorAfter === 'memorySubtract') {
        setNumberMemory(numberMemory - numberCal);
      }
    }
  }

  const pressClear = () => {
    const calListLength = calList.length;

    if (calListLength === 1) {
      setCalList(['0']);
    } else {
      const indexLast = calListLength - 1;

      if (calList[indexLast] === '0') {
        const newCalList = calList.slice(0, calListLength - 2);
        setCalList(newCalList);
      } else {
        const newCalList = calList.map((text, index) => {
          return index === indexLast ? '0' : text;
        });

        setCalList(newCalList);
      }
    }
  }

  const pressAllClear = () => {
    setCalList(['0']);
  }

  const pressSign = () => {
    const indexTarget = calList.length - 1;

    const newCalList = calList.map((text, index) => {
      if (index === indexTarget) {
        if (text === errorResult) {
          return '-0';
        }

        return text[0] === '-' ? text.slice(1) : '-' + text;
      }

      return text;
    });

    setCalList(newCalList);
  }

  const pressPoint = () => {
    const indexTarget = calList.length - 1;

    const newCalList = calList.map((text, index) => {
      if (index === indexTarget) {
        if (text === errorResult) {
          return '0.';
        }

        if (text.indexOf('.') === -1) {
          return text + '.';
        }
      }

      return text;
    })

    setCalList(newCalList);
  }

  const pressMemoryResult = () => {
    setCalList([isFinite(numberMemory) ? String(numberMemory) : errorResult]);
  }

  const pressMemoryClear = () => {
    setNumberMemory(0);
  }

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  numberRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  numberText: {
    backgroundColor: 'white',
    padding: 24,
    margin: 24,
    fontSize: 24
  }
});
