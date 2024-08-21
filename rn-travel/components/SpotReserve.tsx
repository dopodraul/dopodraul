import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { AppContext, spotJson, getObjectValue } from '../utils/common';

export default function SpotReserve() {
  const { i18n } = useTranslation();
  const { spot } = useContext(AppContext);

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
