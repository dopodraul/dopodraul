import { View, ScrollView, StyleSheet } from 'react-native';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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
import { AppContext } from '../utils/common';

export default function SpotMain() {
  const {
    spot,
    setSpot,
    addRecent
  } = useContext(AppContext);

  useEffect(() => {
    addRecent(spot);
  }, [spot]); // eslint-disable-line

  const { i18n } = useTranslation();
  const title = i18n.t(`spot:${spot}:name`);

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
