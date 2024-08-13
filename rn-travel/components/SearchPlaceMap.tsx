import { View } from 'react-native'
import { useContext } from 'react';

import { AppContext } from '../utils/common';
import BackComponent from './BackComponent';

export default function SearchPlaceKeyword ({ t }: { t: (key: string) => string; }) {
  const { setSearchType } = useContext(AppContext);
  const title = t('mapSearch');

  const pressBack = () => {
    setSearchType('');
  }

  return (
    <View>
      <BackComponent title={title} pressBack={pressBack} />
    </View>
  );
}
