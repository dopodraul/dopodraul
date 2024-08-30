import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { AppContext } from '../utils/common';

export default function BackComponent ({ title, pressBack }: {
  title: string;
  pressBack: () => void;
}) {
  const { getStyle } = useContext(AppContext);
  const stylesColor = getStyle();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pressBack}>
        <Icon name="chevron-back" size={24} style={stylesColor} />
      </TouchableOpacity>
      <Text style={[styles.title, stylesColor]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  title: {
    flex: 1,
    textAlign: 'center'
  }
});
