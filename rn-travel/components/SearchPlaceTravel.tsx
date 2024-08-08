import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { useContext, useState } from 'react';
import moment from 'moment';

import travelJson from '../json/travel.json';
import BackComponent from './BackComponent';
import { AppContext } from '../utils/context';

const travelToMoment = (travel: string) => {
  return moment('20' + travel, 'YYYYMMDD').format('LL');
}

const SearchPlaceTravelList = ({ setTravel }: { setTravel: (travel: string) => void; }) => {
  const { getStyle } = useContext(AppContext);
  const stylesColor = getStyle();
  const stylesBorder = { borderColor: stylesColor.color };

  const data = Object.keys(travelJson)
    .sort((lhs, rhs) => {
    return lhs > rhs ? -1 : 1;
  });

  const renderItem = ({ item }: { item: string }) => {
    const text = travelToMoment(item);

    const onPress = () => {
      setTravel(item);
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
      <FlatList
        data={data}
        renderItem={renderItem} />
    </View>
  );
}

const SearchPlaceTravelDetail = ({ travel, t, setTravel }: {
  travel: string;
  t: (key: string) => string;
  setTravel: (travel: string) => void;
}) => {
  const { getStyle } = useContext(AppContext);
  const stylesColor = getStyle();
  const title = travelToMoment(travel);

  const pressBack = () => {
    setTravel('');
  }

  return (
    <View>
      <BackComponent title={title} pressBack={pressBack} />
      <Text style={stylesColor}>Content</Text>
    </View>
  );
}

export default function SearchPlaceTravel ({ t }: { t: (key: string) => string; }) {
  const { setSearchType } = useContext(AppContext);
  const [travel, setTravel] = useState('');

  const pressBack = () => {
    setSearchType('');
  }

  return travel ? (
    <View>
      <SearchPlaceTravelDetail t={t} travel={travel} setTravel={setTravel} />
    </View>
  ) : (
    <View>
      <BackComponent title={t('travelSearch')} pressBack={pressBack} />
      <SearchPlaceTravelList setTravel={setTravel} />
    </View>
  );
}
