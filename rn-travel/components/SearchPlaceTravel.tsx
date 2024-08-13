import { View } from 'react-native'
import { useContext } from 'react';
import moment from 'moment';

import SearchPlaceTravelList from './SearchPlaceTravelList';
import SearchPlaceTravelDetail from './SearchPlaceTravelDetail';
import { AppContext } from '../utils/common';

export default function SearchPlaceTravel ({ t }: { t: (key: string) => string; }) {
  const { searchTravel } = useContext(AppContext);

  const convertTravelToMoment = (travel: string) => {
    return moment('20' + travel, 'YYYYMMDD');
  }

  return searchTravel ? (
    <View>
      <SearchPlaceTravelDetail
        t={t}
        convertTravelToMoment={convertTravelToMoment}
      />
    </View>
  ) : (
    <View>
      <SearchPlaceTravelList
        t={t}
        convertTravelToMoment={convertTravelToMoment}
      />
    </View>
  );
}
