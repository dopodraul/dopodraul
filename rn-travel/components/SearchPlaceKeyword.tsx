import { useContext } from 'react';

import SearchPlaceKeywordList from './SearchPlaceKeywordList';
import SpotMain from './SpotMain';
import { AppContext } from '../utils/common';

export default function SearchPlaceKeyword ({ t }: { t: (key: string) => string; }) {
  const { searchSpot, setSearchSpot } = useContext(AppContext);

  return (
    searchSpot ?
      <SpotMain spot={searchSpot} setSpot={setSearchSpot} /> :
      <SearchPlaceKeywordList t={t} />
  );
}
