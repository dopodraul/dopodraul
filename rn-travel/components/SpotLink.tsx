import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AppContext,
  getObjectValue,
  openUrl,
  spotJson
} from '../utils/common';

export default function SpotLink({ spot }: { spot: string; }) {
  const { i18n } = useTranslation();
  const { getStyle } = useContext(AppContext);
  const linkList = getObjectValue(spotJson, `${spot}.link`);
  const stylesColor = getStyle();

  if (linkList) {
    const renderItem = ({ item }: {
      item: {
        name: string;
        url: string;
      }
    }) => {
      const urlLength = item.url.length;

      const url = urlLength > 20 ?
        item.url.substring(0, 10) + ' ... ' + item.url.substring(urlLength - 10) :
        item.url;

      let name = i18n.t(i18n.exists(item.name) ? item.name : `spot:${spot}:${item.name}`);
      name += ' ' + url;

      const onPress = () => {
        openUrl(item.url);
      }

      return (
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.text, styles.url]}>{name}</Text>
        </TouchableOpacity>
      );
    }

    const text = i18n.t('spotDetail:link');

    return (
      <View>
        <Text style={[styles.text, stylesColor]}>{text}</Text>
        <FlatList
          data={linkList}
          renderItem={renderItem}
        />
      </View>
    );
  }

  return (<View />);
}

const styles = StyleSheet.create({
  text: {
    padding: 8
  },

  url: {
    color: '#007aff',
    textDecorationLine: 'underline'
  }
});
