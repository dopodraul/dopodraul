import { View, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../utils/context';
import SearchPlaceMain from '../components/SearchPlaceMain';
import SearchPlaceTravel from '../components/SearchPlaceTravel';
import SearchPlaceMap from '../components/SearchPlaceMap';
import SearchPlaceKeyword from '../components/SearchPlaceKeyword';

export default function SearchPlace() {
  const { i18n } = useTranslation();
  const { searchType, getStyle } = useContext(AppContext);

  const stylesColor = getStyle();

  const t = (key: string) => {
    return i18n.t('searchPlace:' + key);
  }

  let content = <SearchPlaceMain t={t} />;

  if (searchType === 'travel') {
    content = <SearchPlaceTravel />;
  } else if (searchType === 'map') {
    content = <SearchPlaceMap />;
  } else if (searchType === 'keyword') {
    content = <SearchPlaceKeyword />
  }

  return (
    <View style={[styles.container, stylesColor]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});
