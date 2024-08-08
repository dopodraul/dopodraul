import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { useContext, useState } from 'react';
import { Table, Rows } from 'react-native-table-component';
import moment from 'moment';

import travelJson from '../json/travel.json';
import BackComponent from './BackComponent';
import { AppContext } from '../utils/context';

const travelToMoment = (travel: string) => {
  return moment('20' + travel, 'YYYYMMDD');
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
    const text = travelToMoment(item).format('LL');

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
  type travelType = keyof typeof travelJson;
  const travelData = travelJson[travel as travelType];
  type keyType = keyof typeof travelData;
  const travelMoment = travelToMoment(travel);
  const title = travelMoment.format('LL');
  const { getStyle } = useContext(AppContext);
  const stylesColor = getStyle();
  const flexArr = [1, 11];

  const pressBack = () => {
    setTravel('');
  }

  const styles = StyleSheet.create({
    border: {
      borderWidth: 1,
      borderColor: stylesColor.color
    },
    text: {
      margin: 8
    }
  });

  const data = [];

  if (travelData.hasOwnProperty('airport')) {
    const airportList = travelData['airport' as keyType] as string[];

    data.push([
      t('airport'),
      airportList.join(' ')
    ]);
  }

  if (travelData.hasOwnProperty('hotel')) {
    const hotelList = travelData['hotel' as keyType] as string[];

    data.push([
      t('hotel'),
      hotelList.join(' ')
    ]);
  }

  if (travelData.hasOwnProperty('transportation')) {
    const transportationList = travelData['transportation' as keyType] as string[];

    data.push([
      t('transportation'),
      transportationList.join(' ')
    ]);
  }

  if (travelData.hasOwnProperty('spot')) {
    const spotList = travelData['spot' as keyType] as string[][][];

    spotList.forEach(([morningList, afternoonList]) => {
      if (morningList && morningList[0]) {
        data.push([
          travelMoment.format('MMM D') + ' ' + t('morning'),
          morningList.join(' ')
        ]);
      }

      if (afternoonList && afternoonList[0]) {
        data.push([
          travelMoment.format('MMM D') + ' ' + t('afternoon'),
          afternoonList.join(' ')
        ]);
      }

      travelMoment.add(1, 'days');
    });
  }

  setTimeout(() => { console.log(travelData) }, 2000) // TODO

  return (
    <View>
      <View>
        <BackComponent title={title} pressBack={pressBack} />
      </View>
      <ScrollView>
        <Table borderStyle={styles.border}>
          <Rows
            textStyle={[styles.text, stylesColor]}
            data={data}
            flexArr={flexArr}
          />
        </Table>
      </ScrollView>
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
