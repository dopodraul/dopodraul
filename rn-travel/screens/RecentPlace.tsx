import { View, StyleSheet } from 'react-native';
import { useContext } from 'react';

import RecentPlaceMain from '../components/RecentPlaceMain';
import { AppContext } from '../utils/common';

export default function RecentPlace({ navigation }: { navigation: { navigate: (name: string) => void } }) {
  const { getStyle } = useContext(AppContext);
  const stylesColor = getStyle();

  return (
    <View style={[styles.container, stylesColor]}>
      <RecentPlaceMain navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
