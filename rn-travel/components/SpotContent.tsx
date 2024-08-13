import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../utils/common';

export default function SpotContent() {
  const { i18n } = useTranslation();
  const { spot, getStyle } = useContext(AppContext);
  const stylesColor = getStyle();
  const key = `spot:${spot}:content`;

  return (
    i18n.exists(key) ?
      <View style={styles.container}>
        <Text style={stylesColor}>{i18n.t(key)}</Text>
      </View> :
      <View />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 8
  }
});
