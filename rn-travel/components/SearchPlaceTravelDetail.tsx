import { Moment } from 'moment';
import { Table, Rows } from 'react-native-table-component';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';

import {
  useContext,
  useEffect,
  useRef
} from 'react';

import travelJson from '../json/travel.json';
import BackComponent from './BackComponent';

import {
  AppContext,
  getObjectValue,
  getSpotName,
  spotJson
} from '../utils/common';

export default function SearchPlaceTravelDetail({ t, convertTravelToMoment }: {
  t: (key: string) => string;
  convertTravelToMoment: (travel: string) => Moment
}) {
  const {
    searchTravelDate,
    setSearchTravelDate,
    searchTravelTop,
    setSearchTravelTop,
    setSearchSpot,
    getStyle
  } = useContext(AppContext);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: searchTravelTop, animated: false});
    }
  }, [searchTravelTop]);

  const travelData = getObjectValue(travelJson, searchTravelDate);
  const travelMoment = convertTravelToMoment(searchTravelDate);
  const title = travelMoment.format('LL');
  const stylesColor = getStyle();
  const flexArr = [1, 5];

  const pressBack = () => {
    setSearchTravelDate('');
  }

  const styles = StyleSheet.create({
    table: {
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
    const name = getSpotName(spot);

    const onPress = () => {
      setSearchSpot(spot);
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

  const scrollViewRef = useRef<ScrollView>(null);

  const saveScrollTop = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setSearchTravelTop(event.nativeEvent.contentOffset.y);
  }

  return ([
    <BackComponent title={title} pressBack={pressBack} />,
    <ScrollView
      ref={scrollViewRef}
      onScroll={saveScrollTop}
      scrollEventThrottle={16}>
      <Table borderStyle={styles.table}>
        <Rows
          textStyle={[styles.text, stylesColor]}
          data={data}
          flexArr={flexArr}
        />
      </Table>
    </ScrollView>
  ]);
}
