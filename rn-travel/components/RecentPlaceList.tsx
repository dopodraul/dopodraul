import { ScrollView, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { spotJson, getObjectValue, AppContext } from '../utils/common';

export default function RecentPlaceList() {
  const { i18n } = useTranslation();
  const { recent, getStyle } = useContext(AppContext);
  const stylesColor = getStyle();

  const iconObj = {
    MaterialIcons,
    MaterialCommunityIcons
  };

  const renderItem = ({ item }: { item: string }) => {
    const name = i18n.t(`spot:${item}:name`);
    const icon: object = getObjectValue(spotJson, `${item}.icon`);
    const IconComponent = getObjectValue(iconObj, getObjectValue(icon, 'family'));
    const iconName = getObjectValue(icon, 'name');

    return <TouchableOpacity style={styles.item}>
      <IconComponent name={iconName} size={16} color={stylesColor.color} />
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
