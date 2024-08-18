import { StyleSheet } from 'react-native';
import { ReactNode } from 'react';
import L, { LatLngExpression } from 'leaflet';

import {
  MapContainer,
  TileLayer,
  Popup,
  AttributionControl,
  Marker as LeafletMarker
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

type LatLng = {
  latitude: number;
  longitude: number;
};

const MapView = ({ children, region }: {
  children: ReactNode;
  region: LatLng;
}) => {
  const center: LatLngExpression = [region.latitude, region.longitude];
  const prefix = `<a href='https://www.google.com/maps?q=${region.latitude},${region.longitude}' target="_blank">Google Maps</a>`;

  return (
    <MapContainer
      center={center}
      style={styles.map}
      zoom={16}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <AttributionControl
        position="bottomright"
        prefix={prefix}
      />
      {children}
    </MapContainer>
  );
}

const Marker = ({
  title,
  description,
  coordinate
}: {
  title: string;
  description: string;
  coordinate: LatLng;
}) => {
  const position: LatLngExpression = [coordinate.latitude, coordinate.longitude];
  const icon = new L.Icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png' });

  return (
    <LeafletMarker
      position={position}
      icon={icon}
    >
      <Popup>
        {title} <br />
        {description}
      </Popup>
    </LeafletMarker>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '95%',
    height: 360
  }
});

export { MapView, Marker };
