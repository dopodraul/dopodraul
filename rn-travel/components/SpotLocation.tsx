import { View, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { MapView, Marker } from '../utils/react-native-maps';

import {
  AppContext,
  getObjectValue,
  spotJson,
  getFloorName,
  getSpotName
} from '../utils/common';

export default function SpotLocation() {
  const { i18n } = useTranslation();
  const { spot } = useContext(AppContext);
  const locationList = getObjectValue(spotJson, `${spot}.location`);

  if (locationList) {
    const region = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };

    const markerList: {
      title: string;
      pinColor: string;

      coordinate: {
        latitude: number;
        longitude: number;
      };
    }[] = [];

    locationList.forEach((obj: object, index: number) => {
      let title;
      let pinColor = 'red';
      const xy = getObjectValue(obj, 'xy');

      if (index) {
        const name = getObjectValue(obj, 'name');
        title = i18n.t(`spot:${spot}:${name}`);
        pinColor = 'orange';
      } else {
        title = getSpotName(spot);
        region.latitude = xy[0];
        region.longitude = xy[1];
      }

      const floor = getObjectValue(obj, 'floor');

      if (floor) {
        title += ' (' + getFloorName(floor) + ')';
      }

      markerList.push({
        title,
        pinColor,

        coordinate: {
          latitude: xy[0],
          longitude: xy[1]
        }
      });
    });

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}
        >
          {markerList.map(({title, coordinate, pinColor}) => (
            <Marker
              title={title}
              coordinate={coordinate}
              pinColor={pinColor}
            />
          ))}
        </MapView>
      </View>
    );
  }

  return (<View />);
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
