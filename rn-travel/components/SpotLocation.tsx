import { View } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AppContext, getObjectValue, spotJson } from '../utils/common';
import { MapView, Marker } from '../utils/react-native-maps';

export default function SpotLocation() {
  const { i18n } = useTranslation();
  const { spot, getStyle } = useContext(AppContext);
  const locationList = getObjectValue(spotJson, `${spot}.location`);

  if (locationList) {

    return (
      <MapView
        region={{latitude: locationList[0].xy[0], longitude: locationList[0].xy[1], latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
      >
        <Marker
          key="0"
          coordinate={{latitude: locationList[0].xy[0], longitude: locationList[0].xy[1]}}
          title="title"
          description="description"
        />
      </MapView>
    );
  }

  return (<View />);
}
