import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { Moment } from 'moment';

import BackComponent from './BackComponent';
import { AppContext } from '../utils/context';
import travelJson from '../json/travel.json';

export default function SearchPlaceTravelList({ t, convertTravelToMoment }: {
  t: (key: string) => string;
  convertTravelToMoment: (travel: string) => Moment
}) {
  const { setSearchType, setSearchTravel, getStyle } = useContext(AppContext);
  const stylesColor = getStyle();
  const stylesBorder = { borderColor: stylesColor.color };

  const data = Object.keys(travelJson)
    .sort((lhs, rhs) => {
    return lhs > rhs ? -1 : 1;
  });

  const pressBack = () => {
    setSearchType('');
  }

  const renderItem = ({ item }: { item: string }) => {
    const text = convertTravelToMoment(item).format('LL');

    const onPress = () => {
      setSearchTravel(item);
    }

    const styles = StyleSheet.create({
      listItem: {
        padding: 16,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 16
      }
    });

    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.listItem, stylesColor, stylesBorder]}>{text}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <View>
        <BackComponent title={t('travelSearch')} pressBack={pressBack} />
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={renderItem} />
      </View>
    </View>
  );
}
