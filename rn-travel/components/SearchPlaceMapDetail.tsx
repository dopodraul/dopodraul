import { View, StyleSheet } from 'react-native';

import {
  useContext,
  useEffect,
  useRef
} from 'react';

import BackComponent from './BackComponent';

import {
  MapView,
  Marker,
  Region
} from '../utils/react-native-maps';

import {
  mapJson,
  getObjectValue,
  getSpotName,
  AppContext
} from '../utils/common';

export default function SearchPlaceMapDetail({ t }: { t: (key: string) => string; }) {
  const {
    searchMapArea,
    setSearchMapArea,
    searchMapAreaToRegion,
    setSearchMapAreaToRegion,
    setSearchSpot
  } = useContext(AppContext);

  const title = t(searchMapArea);

  const pressBack = () => {
    setSearchMapArea('');
  };

  const colorList = [
    'red',
    'yellow',
    'tan',
    'blue',
    'teal',
    'purple',
    'tomato',
    'gold',
    'linen',
    'navy',
    'turquoise',
    'plum',
    'orange',
    'wheat',
    'green',
    'aqua',
    'voilet',
    'indigo'
  ];

  const iconToColor: {[icon: string]: string} = {};

  const markerList: {
    title: string;
    pinColor: string;
    onCalloutPress: () => void;

    coordinate: {
      latitude: number;
      longitude: number;
    };
  }[] = [];

  const data: {
    center: number[];
    data: {[spot: string]: any};
  } = getObjectValue(mapJson, searchMapArea);

  Object.entries(data.data).forEach(([spot, obj]) => {
    const location = getObjectValue(obj, 'location.0.xy');

    if (location) {
      let pinColor = '';
      const icon = getObjectValue(obj, 'icon');

      if (icon) {
        const iconKey = [icon.family, icon.name].join(',');

        if (!iconToColor[iconKey]) {
          iconToColor[iconKey] = colorList[Object.keys(iconToColor).length];
        }

        pinColor = iconToColor[iconKey]
      }

      markerList.push({
        pinColor,
        title: getSpotName(spot),

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

  // eslint-disable-next-line
  const regionDefault = {
    latitude: data.center[0],
    longitude: data.center[1],
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const mapRef = useRef<MapView>(null);

  const saveRegion = (region: Region) => {
    searchMapAreaToRegion[searchMapArea] = region;
    setSearchMapAreaToRegion(searchMapAreaToRegion);
  }

  useEffect(() => {
    if (mapRef.current && searchMapAreaToRegion[searchMapArea]) {
      mapRef.current.fitToCoordinates([searchMapAreaToRegion[searchMapArea]]);

      (Object.keys(regionDefault) as (keyof typeof regionDefault)[]).forEach((key) => {
        regionDefault[key] = getObjectValue(searchMapAreaToRegion[searchMapArea], key);
      });
    }
  }, [
    regionDefault,
    searchMapArea,
    searchMapAreaToRegion
  ]);

  return([
    <BackComponent title={title} pressBack={pressBack} />,
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={regionDefault}
        ref={mapRef}
        onRegionChangeComplete={(region) => { saveRegion(region); }}>
        {markerList.map(({title, pinColor, coordinate, onCalloutPress}) => (
          <Marker
            title={title}
            pinColor={pinColor}
            coordinate={coordinate}
            onCalloutPress={onCalloutPress}
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
