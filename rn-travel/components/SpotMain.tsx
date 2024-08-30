import {ScrollView } from 'react-native';
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

export default function SpotMain({ spot, setSpot }: {
  spot: string;
  setSpot: (spot: string) => void;
}) {
  const { addRecentSpot } = useContext(AppContext);

  useEffect(() => {
    addRecentSpot(spot);
  }, [spot]); // eslint-disable-line

  const title = getSpotName(spot);

  const pressBack = () => {
    setSpot('');
  }

  const content = [
    <BackComponent title={title} pressBack={pressBack} />,
    <ScrollView>
      <SpotReserve spot={spot} />
      <SpotContent spot={spot} />
      <SpotStay spot={spot} />
      <SpotOpen spot={spot} />
      <SpotPrice spot={spot} />
      <SpotLocation spot={spot} />
      <SpotAccess spot={spot} />
      <SpotLink spot={spot} />
      <SpotLastUpdate spot={spot} />
    </ScrollView>
  ];

  return (content);
}
