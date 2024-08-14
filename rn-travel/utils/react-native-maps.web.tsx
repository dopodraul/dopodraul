import { View } from 'react-native';
import { ReactNode } from 'react';

const MapView = ({ children }: { children: ReactNode }) => {
  return (<View>{children}</View>);
}

const Marker = () => {
  return (<View />);
}

export { MapView, Marker };
