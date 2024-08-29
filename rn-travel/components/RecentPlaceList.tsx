import { ScrollView, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../utils/common';

export default function RecentPlaceList() {
  const {
    recent,
    getStyle,
    getSpotIcon
  } = useContext(AppContext);

  const { i18n } = useTranslation();
  const stylesColor = getStyle();

  const renderItem = ({ item }: { item: string }) => {
    const name = i18n.t(`spot:${item}:name`);
    const icon = getSpotIcon(item, 16);

    return <TouchableOpacity style={styles.item}>
      {icon}
      <Text style={[styles.text, stylesColor]}>{name}</Text>
    </TouchableOpacity>;
  }

  return (
    <ScrollView>
      <FlatList
        data={recent}
        renderItem={renderItem}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16
  },

  text: {
    fontSize: 16
  }
});
