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
    <View>
      <TouchableOpacity style={[styles.button, styleBackground]} onPress={props.onPress}>
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
    width: 48,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: 'black'
  },

  text: {
    color: 'white'
  }
});

export default CalculatorButton;
