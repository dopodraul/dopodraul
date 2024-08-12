import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Rows } from 'react-native-table-component';
import moment from 'moment';

import travelJson from '../json/travel.json';
import BackComponent from './BackComponent';
import spotJson from '../utils/spot';
import { getObjectValue } from '../utils/common';
import { AppContext } from '../utils/context';

const travelToMoment = (travel: string) => {
  return moment('20' + travel, 'YYYYMMDD');
}

const SearchPlaceTravelList = ({ t }: { t: (key: string) => string; }) => {
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
    const text = travelToMoment(item).format('LL');

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

const SearchPlaceTravelDetail = ({ t }: {  t: (key: string) => string; }) => {
  const i18n = useTranslation();
  const { searchTravel, setSearchTravel, setSpot, getStyle } = useContext(AppContext);
  const travelData = getObjectValue(travelJson, searchTravel);
  const travelMoment = travelToMoment(searchTravel);
  const title = travelMoment.format('LL');
  const stylesColor = getStyle();
  const flexArr = [1, 5];

  const pressBack = () => {
    setSearchTravel('');
  }

  const styles = StyleSheet.create({
    table: {
      marginBottom: 160
    },

    border: {
      borderWidth: 1,
      borderColor: stylesColor.color
    },

    text: {
      margin: 8
    },

    spot: {
      paddingRight: 8
    },

    underline: {
      textDecorationLine: 'underline'
    }
  });

  const data = [];

  const convertSpotToButton = (spot: string) => {
    const name = i18n.t(`spot:${spot}:name`);

    const onPress = () => {
      setSpot(spot);
    }

    return spotJson.hasOwnProperty(spot) ?
      <TouchableOpacity style={styles.spot} onPress={onPress}>
        <Text style={[styles.underline, stylesColor]}>{name}</Text>
      </TouchableOpacity> :
      <View style={styles.spot}>
        <Text style={stylesColor}>{name}</Text>
      </View>;
  }

  if (travelData.airport) {
    const airportList = travelData.airport;

    data.push([
      t('airport'),
      airportList.map(convertSpotToButton)
    ]);
  }

  if (travelData.hotel) {
    const hotelList = travelData.hotel;

    data.push([
      t('hotel'),
      hotelList.map(convertSpotToButton)
    ]);
  }

  if (travelData.transportation) {
    const transportationList = travelData.transportation;

    data.push([
      t('transportation'),
      transportationList.map(convertSpotToButton)
    ]);
  }

  if (travelData.spot) {
    const spotList = travelData.spot as string[][][];

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
        <Table style={styles.table} borderStyle={styles.border}>
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
  const { searchTravel } = useContext(AppContext);

  return searchTravel ? (
    <View>
      <SearchPlaceTravelDetail t={t} />
    </View>
  ) : (
    <View>
      <SearchPlaceTravelList t={t} />
    </View>
  );
}
