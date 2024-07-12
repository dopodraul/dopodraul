import React, { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
type CalculatorRowProps = PropsWithChildren<{}>;

const CalculatorRow = ( props: CalculatorRowProps ) => {
  return (
    <View style={styles.row}>{props.children}</View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default CalculatorRow;
