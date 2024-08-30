import { useContext } from 'react';

import { AppContext } from '../utils/common';
import SearchPlaceMapList from './SearchPlaceMapList';
import SearchPlaceMapDetail from './SearchPlaceMapDetail';
import SpotMain from './SpotMain';

export default function SearchPlaceKeyword ({ t }: { t: (key: string) => string; }) {
  const {
    searchMapArea,
    searchSpot,
    setSearchSpot
  } = useContext(AppContext);

  let content = <SearchPlaceMapList t={t} />;

  if (searchSpot) {
    content = <SpotMain spot={searchSpot} setSpot={setSearchSpot} />;
  } else if (searchMapArea) {
    content = <SearchPlaceMapDetail t={t} />;
  }

  return (content);
}
