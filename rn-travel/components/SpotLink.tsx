import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AppContext,
  getObjectValue,
  openUrl,
  spotJson
} from '../utils/common';

export default function SpotLink() {
  const { i18n } = useTranslation();
  const { spot, getStyle } = useContext(AppContext);
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

      const name = i18n.t(item.name) + ' ' + url;

      const onPress = () => {
        openUrl(item.url);
      }

      return (
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.text, stylesColor]}>{name}</Text>
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
  }
});
