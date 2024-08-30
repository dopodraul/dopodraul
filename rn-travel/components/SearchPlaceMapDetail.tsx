import { View, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import BackComponent from './BackComponent';
import { MapView, Marker } from '../utils/react-native-maps';

import {
  areaJson,
  getObjectValue,
  AppContext
} from '../utils/common';

export default function SearchPlaceMapDetail({ t }: { t: (key: string) => string; }) {
  const {
    searchMapArea,
    setSearchMapArea,
    setSearchSpot
  } = useContext(AppContext);

  const { i18n } = useTranslation();
  const title = t(searchMapArea);

  const pressBack = () => {
    setSearchMapArea('');
  };

  const markerList: {
    title: string;
    onCalloutPress: () => void;

    coordinate: {
      latitude: number;
      longitude: number;
    };
  }[] = [];

  const data: {
    center: number[];
    data: {[spot: string]: any};
  } = getObjectValue(areaJson, searchMapArea);

  Object.entries(data.data).forEach(([spot, obj]) => {
    const location = getObjectValue(obj, 'location.0.xy');

    if (location) {
      markerList.push({
        title: i18n.t(`spot:${spot}:name`),

        coordinate: {
          latitude: location[0],
          longitude: location[1]
        },

        onCalloutPress: () => {
          setSearchSpot(spot);
        }
      });
    }
  });

  const region = {
    latitude: data.center[0],
    longitude: data.center[1],
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  return([
    <BackComponent title={title} pressBack={pressBack} />,
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        {markerList.map(({title, coordinate, onCalloutPress}) => (
          <Marker
            title={title}
            coordinate={coordinate}
            onCalloutPress={onCalloutPress}
            pinColor="red"
          />
        ))}
      </MapView>
    </View>
  ]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    height: 360
  },

  map: {
    width: '95%',
    height: '100%'
  }
});
