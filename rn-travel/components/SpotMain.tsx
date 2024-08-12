import { View, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import BackComponent from './BackComponent';
import SpotContent from './SpotContent';
import SpotOpen from './SpotOpen';
import { AppContext } from '../utils/context';

export default function SpotMain() {
  const { i18n } = useTranslation();
  const { spot, setSpot } = useContext(AppContext);
  const title = i18n.t(`spot:${spot}:name`);

  const pressBack = () => {
    setSpot('');
  }

  return (
    <View>
      <BackComponent title={title} pressBack={pressBack} />
      <View style={styles.row}>
        <View style={styles.content}>
          <SpotContent />
        </View>
        <View style={styles.open}>
          <SpotOpen />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center'
  },

  content: {
    flex: 2
  },

  open: {
    flex: 1
  }
});
