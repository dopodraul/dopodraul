import { useContext } from 'react';

import {
  ScrollView,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

import BackComponent from './BackComponent';
import { mapJson, AppContext } from '../utils/common';

export default function SearchPlaceMapList({ t }: { t: (key: string) => string; }) {
  const {
    setSearchType,
    setSearchMapArea,
    getStyle
  } = useContext(AppContext);

  const stylesColor = getStyle();
  const stylesBorder = { borderColor: stylesColor.color };
  const data = Object.keys(mapJson).sort();

  const renderItem = ({ item }: { item: string; }) => {
    const text = t(item);

    const pressArea = () => {
      setSearchMapArea(item);
    }

    return <TouchableOpacity onPress={pressArea}>
      <Text style={[styles.item, stylesColor, stylesBorder]}>{text}</Text>
    </TouchableOpacity>;
  }

  const title = t('mapSearch');

  const pressBack = () => {
    setSearchType('');
  }

  return ([
    <BackComponent title={title} pressBack={pressBack} />,
    <ScrollView>
      <FlatList renderItem={renderItem} data={data} />
    </ScrollView>
  ]);
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 16
  }
});
