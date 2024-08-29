import { View, Text, StyleSheet } from 'react-native';
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

export default function SpotAccess() {
  const { i18n } = useTranslation();
  const { spot, getStyle } = useContext(AppContext);
  const accessList = getObjectValue(spotJson, `${spot}.access`);
  const stylesColor = getStyle();

  if (accessList) {
    let coordinate;

    const region = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };

    const location = getObjectValue(spotJson, `${spot}.location.0`);

    if (location) {
      const xy = getObjectValue(location, 'xy');
      region.latitude = xy[0];
      region.longitude = xy[1];

      coordinate = {
        latitude: xy[0],
        longitude: xy[1]
      };
    }

    const markerList: {
      title: string;
      description: string;

      coordinate: {
        latitude: number;
        longitude: number;
      };
    }[] = [];

    accessList.forEach((accessObj: object) => {
      const fromList = getObjectValue(accessObj, 'from');

      fromList.forEach((from: string) => {
        const spotLocation = getObjectValue(spotJson, `${from}.location`);

        if (spotLocation) {
          const title = getSpotName(from);

          const description = i18n.t(
            'spotDetail:accessSentence', {
              place: title,
              action: i18n.t('spotDetail:accessWalk'),
              from: i18n.t('spotDetail:accessFrom')
            }
          );

          spotLocation.forEach((locationObj: object) => {
            const xy = getObjectValue(locationObj, 'xy');

            markerList.push({
              title,
              description,

              coordinate: {
                latitude: xy[0],
                longitude: xy[1]
              }
            });
          });
        }
      });
    });

    const text = i18n.t('spotDetail:access');
    let title = getSpotName(spot);
    const floor = getObjectValue(location, 'floor');

    if (floor) {
      title += ' (' + getFloorName(floor) + ')';
    }

    const locationMarker = coordinate ?
      <Marker
        title={title}
        coordinate={coordinate}
        pinColor="red"
      /> :
      <View />;

    return (
      <View>
        <Text style={[styles.text, stylesColor]}>{text}</Text>
        <View style={styles.view}>
          <MapView
            region={region}
            style={styles.mapView}
          >
            {locationMarker}

            {markerList.map(({title, description, coordinate}) => (
              <Marker
                title={title}
                description={description}
                coordinate={coordinate}
                pinColor="blue"
              >
              </Marker>
            ))}
          </MapView>
        </View>
      </View>
    );
  }

  return (<View />);
}

const styles = StyleSheet.create({
  text: {
    padding: 8
  },

  view: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    height: 360
  },

  mapView: {
    width: '95%',
    height: '100%'
  }
});
