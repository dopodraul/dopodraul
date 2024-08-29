import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { AppContext, getObjectValue, spotJson } from '../utils/common';

export default function SpotLastUpdate({ spot }: { spot: string; }) {
  const { i18n } = useTranslation();
  const { getStyle } = useContext(AppContext);
  const lastUpdate = getObjectValue(spotJson, `${spot}.lastUpdate`);
  const stylesColor = getStyle();

  if (lastUpdate) {
    const name = i18n.t('spotDetail:lastUpdate');
    const value = moment('20' + lastUpdate, 'YYYYMMDD').fromNow();

    return (
      <View style={styles.container}>
        <View>
          <Text style={stylesColor}>{name}</Text>
        </View>
        <View style={styles.value}>
          <Text style={stylesColor}>{value}</Text>
        </View>
      </View>
    );
  }

  return (<View />);
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row'
  },

  value: {
    marginLeft: 8
  }
});
