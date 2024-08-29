import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { spotJson, getObjectValue } from '../utils/common';

export default function SpotReserve({ spot }: { spot: string; }) {
  const { i18n } = useTranslation();

  return (
    getObjectValue(spotJson, `${spot}.isReserve`) ?
      <View style={styles.container}>
        <Icon name="error" color="red" size={24} />
        <Text style={styles.text}>{i18n.t('spotDetail:reserve')}</Text>
      </View> :
      <View />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8
  },

  text: {
    color: 'red'
  }
});
