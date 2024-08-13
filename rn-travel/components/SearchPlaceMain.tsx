import { Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';

import { AppContext } from '../utils/common';

export default function SearchPlaceMain({ t }: { t: (key: string) => string; }) {
  const { setSearchType, getStyle } = useContext(AppContext);
  const stylesColor = getStyle();
  const stylesBorder = { borderColor: stylesColor.color };

  const data = [{
    name: t('travelSearch'),
    type: 'travel'
  }, {
    name: t('mapSearch'),
    type: 'map'
  }, {
    name: t('keywordSearch'),
    type: 'keyword'
  }];

  const styles = StyleSheet.create({
    item: {
      padding: 16,
      marginTop: 16,
      marginBottom: 32,
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 16
    }
  });

  const changeType = (type: string) => {
    setSearchType(type);
  }

  const renderItem = ({ item }: { item: { name: string; type: string; } }) => {
    return (
      <TouchableOpacity
        style={[styles.item, stylesColor, stylesBorder]}
        onPress={() => { changeType(item.type); }}
      >
        <Text style={stylesColor}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
    ></FlatList>
  );
}
