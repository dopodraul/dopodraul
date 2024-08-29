import { View, ScrollView, StyleSheet } from 'react-native';
import { useContext, useEffect } from 'react';

import BackComponent from './BackComponent';
import SpotReserve from './SpotReserve';
import SpotContent from './SpotContent';
import SpotOpen from './SpotOpen';
import SpotPrice from './SpotPrice';
import SpotLocation from './SpotLocation';
import SpotAccess from './SpotAccess';
import SpotLink from './SpotLink';
import SpotStay from './SpotStay';
import SpotLastUpdate from './SpotLastUpdate';
import { getSpotName, AppContext } from '../utils/common';

export default function SpotMain() {
  const {
    spot,
    setSpot,
    addRecent
  } = useContext(AppContext);

  useEffect(() => {
    addRecent(spot);
  }, [spot]); // eslint-disable-line

  const title = getSpotName(spot);

  const pressBack = () => {
    setSpot('');
  }

  return (
    <View>
      <BackComponent title={title} pressBack={pressBack} />
      <ScrollView>
        <View style={styles.scrollContent}>
          <SpotReserve />
          <SpotContent />
          <SpotStay />
          <SpotOpen />
          <SpotPrice />
          <SpotLocation />
          <SpotAccess />
          <SpotLink />
          <SpotLastUpdate />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    marginBottom: 160
  }
});
