import { View } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import BackComponent from './BackComponent';
import SpotContent from './SpotContent';
import SpotOpen from './SpotOpen';
import { AppContext } from '../utils/common';

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
      <View>
        <SpotContent />
      </View>
      <View>
        <SpotOpen />
      </View>
    </View>
  );
}
