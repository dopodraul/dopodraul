import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AppContext, getObjectValue, spotJson } from '../utils/common';

export default function SpotLastUpdate() {
  const { i18n } = useTranslation();
  const { spot, getStyle } = useContext(AppContext);
  const stay = getObjectValue(spotJson, `${spot}.stay`);
  const stylesColor = getStyle();

  if (stay) {
    const name = i18n.t('spotDetail:stay');
    let value = '';
    const hour = Math.floor(stay / 60);

    if (hour) {
      value += hour + ' ' + i18n.t('spotDetail:stayHour') + ' ';
    }

    const min = stay % 60;

    if (min) {
      value += min + ' ' + i18n.t('spotDetail:stayMinute');
    }

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
