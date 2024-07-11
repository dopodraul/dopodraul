import React, { PropsWithChildren } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type CalculatorButtonProps = PropsWithChildren<{
  title: string;
  color: string;
  onPress: () => void;
}>;

const CalculatorButton = ( props: CalculatorButtonProps ) => {
  const styleBackground = {
    backgroundColor: props.color
  };

  return (
    <View style={[styles.button, styleBackground]}>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    padding: 24,
    margin: 24,
    backgroundColor: 'black'
  },

  text: {
    color: 'white'
  }
});

export default CalculatorButton;
