import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { useContext, useState } from 'react';
import { Table, Rows } from 'react-native-table-component';
import moment from 'moment';

import travelJson from '../json/travel.json';
import spotKyoto from '../json/spotKyoto.json';
import BackComponent from './BackComponent';
import { AppContext } from '../utils/context';
const spotJson = spotKyoto;

const travelToMoment = (travel: string) => {
  return moment('20' + travel, 'YYYYMMDD');
}

const SearchPlaceTravelList = ({ t, setTravel }: {
  t: (key: string) => string;
  setTravel: (travel: string) => void;
}) => {
  const { setSearchType, getStyle } = useContext(AppContext);
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
  const { getStyle, i18n } = useContext(AppContext);
  const stylesColor = getStyle();
  const flexArr = [1, 3];

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
    },
    spot: {
      marginRight: 8
    },
    underline: {
      textDecorationLine: 'underline'
    }
  });

  const data = [];

  const convertSpotToButton = (spot: string) => {
    const name = i18n.t(`spot:${spot}:name`);

    return spotJson.hasOwnProperty(spot) ?
      <TouchableOpacity style={styles.spot}>
        <Text style={styles.underline}>{name}</Text>
      </TouchableOpacity> :
      <Text style={styles.spot}>{name}</Text>;
  }

  if (travelData.hasOwnProperty('airport')) {
    const airportList = travelData['airport' as keyType] as string[];

    data.push([
      t('airport'),
      airportList.map(convertSpotToButton)
    ]);
  }

  if (travelData.hasOwnProperty('hotel')) {
    const hotelList = travelData['hotel' as keyType] as string[];

    data.push([
      t('hotel'),
      hotelList.map(convertSpotToButton)
    ]);
  }

  if (travelData.hasOwnProperty('transportation')) {
    const transportationList = travelData['transportation' as keyType] as string[];

    data.push([
      t('transportation'),
      transportationList.map(convertSpotToButton)
    ]);
  }

  if (travelData.hasOwnProperty('spot')) {
    const spotList = travelData['spot' as keyType] as string[][][];

    spotList.forEach(([morningList, afternoonList]) => {
      const travelString = travelMoment.format('MMM D');

      if (morningList && morningList[0]) {
        data.push([
          travelString + ' ' + t('morning'),
          morningList.map(convertSpotToButton)
        ]);
      }

      if (afternoonList && afternoonList[0]) {
        data.push([
          travelString + ' ' + t('afternoon'),
          afternoonList.map(convertSpotToButton)
        ]);
      }

      travelMoment.add(1, 'days');
    });
  }

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
  const [travel, setTravel] = useState('');

  return travel ? (
    <View>
      <SearchPlaceTravelDetail
        t={t}
        travel={travel}
        setTravel={setTravel}
      />
    </View>
  ) : (
    <View>
      <SearchPlaceTravelList t={t} setTravel={setTravel} />
    </View>
  );
}
