import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { AppContext } from '../utils/context';

export default function BackComponent ({ title, pressBack }: {
  title: string;
  pressBack: () => void;
}) {
  const { getStyle } = useContext(AppContext);
  const stylesColor = getStyle();

  return (
    <View style={styles.container}>
      <View style={styles.backContent}>
        <View style={styles.backIcon}>
          <TouchableOpacity onPress={pressBack}>
            <Icon name="chevron-back" size={24} style={stylesColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.backBlank}>
        </View>
      </View>
      <View style={styles.title}>
        <Text style={stylesColor}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },

  backContent: {
    flexDirection: 'row'
  },

  backIcon: {
    flex: 1
  },

  backBlank: {
    flex: 11
  },

  title: {
    alignItems: 'center'
  }
});
