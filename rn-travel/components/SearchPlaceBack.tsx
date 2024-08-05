import { TouchableOpacity, Text } from 'react-native'
import { useContext } from 'react';

import { AppContext } from '../utils/context';

export default function SearchPlaceBack () {
  const { setSearchType } = useContext(AppContext);

  return (
    <TouchableOpacity onPress={() => { setSearchType('') }}>
      <Text>回上一頁</Text>
    </TouchableOpacity>
  );
}
