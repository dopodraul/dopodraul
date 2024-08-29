import { View, StyleSheet } from 'react-native';
import { useContext } from 'react';

import RecentPlaceMain from '../components/RecentPlaceMain';
import RecentPlaceList from '../components/RecentPlaceList';
import { AppContext } from '../utils/common';

export default function RecentPlace({ navigation }: { navigation: { navigate: (name: string) => void } }) {
  const { recent, getStyle } = useContext(AppContext);
  const stylesColor = getStyle();

  const content = recent[0] ?
    <RecentPlaceList /> :
    <RecentPlaceMain navigation={navigation} />;

  return (
    <View style={[styles.container, stylesColor]}>
      {content}
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
