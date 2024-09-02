import { useContext } from 'react';
import moment from 'moment';

import SearchPlaceTravelList from './SearchPlaceTravelList';
import SearchPlaceTravelDetail from './SearchPlaceTravelDetail';
import { AppContext } from '../utils/common';

export default function SearchPlaceTravel ({ t }: { t: (key: string) => string; }) {
  const { searchTravelDate } = useContext(AppContext);

  const convertTravelToMoment = (travel: string) => {
    return moment('20' + travel, 'YYYYMMDD');
  }

  return (
    searchTravelDate ?
    <SearchPlaceTravelDetail
      t={t}
      convertTravelToMoment={convertTravelToMoment}
    /> :
    <SearchPlaceTravelList
      t={t}
      convertTravelToMoment={convertTravelToMoment}
    />
  );
}
