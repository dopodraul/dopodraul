import { View, StyleSheet } from 'react-native';
import { useContext } from 'react';

import RecentPlaceMain from '../components/RecentPlaceMain';
import RecentPlaceList from '../components/RecentPlaceList';
import SpotMain from '../components/SpotMain';
import { AppContext } from '../utils/common';

export default function RecentPlace({ navigation }: { navigation: { navigate: (name: string) => void } }) {
  const {
    recentList,
    recentSpot,
    setRecentSpot,
    getStyle
  } = useContext(AppContext);

  let content = <RecentPlaceMain navigation={navigation} />;

  if (recentSpot) {
    content = <SpotMain spot={recentSpot} setSpot={setRecentSpot} />;
  } else if (recentList[0]) {
    content = <RecentPlaceList />;
  }

  const stylesColor = getStyle();

  return (
    <View style={[styles.container, stylesColor]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});
