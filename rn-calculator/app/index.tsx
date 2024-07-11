import { Text, View, StyleSheet } from 'react-native';
import CalculatorRow from '../components/CalculatorRow';
import CalculatorButton from '../components/CalculatorButton';

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.numberRow}>
        <Text style={styles.numberText}>0</Text>
      </View>
      <CalculatorRow>
        <CalculatorButton title="MC" color="black" onPress={()=>{}} />
        <CalculatorButton title="MR" color="black" onPress={()=>{}} />
        <CalculatorButton title="M-" color="black" onPress={()=>{}} />
        <CalculatorButton title="M+" color="black" onPress={()=>{}} />
        <CalculatorButton title="√" color="black" onPress={()=>{}} />
      </CalculatorRow>
      <CalculatorRow>
        <CalculatorButton title="%" color="black" onPress={()=>{}} />
        <CalculatorButton title="7" color="gray" onPress={()=>{}} />
        <CalculatorButton title="8" color="gray" onPress={()=>{}} />
        <CalculatorButton title="9" color="gray" onPress={()=>{}} />
        <CalculatorButton title="÷" color="black" onPress={()=>{}} />
      </CalculatorRow>
      <CalculatorRow>
        <CalculatorButton title="±" color="black" onPress={()=>{}} />
        <CalculatorButton title="4" color="gray" onPress={()=>{}} />
        <CalculatorButton title="5" color="gray" onPress={()=>{}} />
        <CalculatorButton title="6" color="gray" onPress={()=>{}} />
        <CalculatorButton title="X" color="black" onPress={()=>{}} />
      </CalculatorRow>
      <CalculatorRow>
        <CalculatorButton title="C" color="red" onPress={()=>{}} />
        <CalculatorButton title="1" color="gray" onPress={()=>{}} />
        <CalculatorButton title="2" color="gray" onPress={()=>{}} />
        <CalculatorButton title="3" color="gray" onPress={()=>{}} />
        <CalculatorButton title="-" color="black" onPress={()=>{}} />
      </CalculatorRow>
      <CalculatorRow>
        <CalculatorButton title="AC" color="red" onPress={()=>{}} />
        <CalculatorButton title="0" color="gray" onPress={()=>{}} />
        <CalculatorButton title="." color="gray" onPress={()=>{}} />
        <CalculatorButton title="=" color="black" onPress={()=>{}} />
        <CalculatorButton title="+" color="black" onPress={()=>{}} />
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
