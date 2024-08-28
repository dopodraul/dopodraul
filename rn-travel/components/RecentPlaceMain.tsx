import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';

import { AppContext } from '../utils/common';

export default function RecentPlaceMain({ navigation }: { navigation: { navigate: (name: string) => void } }) {
  const { i18n } = useTranslation();
  const { getStyle } = useContext(AppContext);
  const stylesColor = getStyle();
  const welcome = i18n.t('recentPlace:welcome');
  const searchPlaceSentenceSuffix = i18n.t('recentPlace:searchPlaceSentenceSuffix', { page: i18n.t('index:searchPlace') });
  const configurationOptionSentenceSuffix = i18n.t('recentPlace:configurationOptionSentenceSuffix', { page: i18n.t('index:configurationOption') });

  let searchPlaceSentencePrefix = i18n.t('recentPlace:searchPlaceSentencePrefix', { page: i18n.t('index:searchPlace') });

  if (searchPlaceSentencePrefix) {
    searchPlaceSentencePrefix += ' ';
  }

  let configurationOptionSentencePrefix = i18n.t('recentPlace:configurationOptionSentencePrefix', { page: i18n.t('index:configurationOption') });

  if (configurationOptionSentencePrefix) {
    configurationOptionSentencePrefix += ' ';
  }

  const navigate = (name: string) => navigation.navigate(name);

  return (
    <View style={[styles.container, stylesColor]}>
      <Text style={[styles.text, stylesColor]}>{welcome}</Text>
      <TouchableOpacity style={styles.touch} onPress={() => { navigate('SearchPlace'); }}>
        <Text style={[styles.text, stylesColor]}>{searchPlaceSentencePrefix}</Text>
        <Icon name="search-outline" size={24} color={stylesColor.color} />
        <Text style={[styles.text, stylesColor]}>{searchPlaceSentenceSuffix}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touch} onPress={() => { navigate('ConfigurationOption'); }}>
        <Text style={[styles.text, stylesColor]}>{configurationOptionSentencePrefix}</Text>
        <Icon name="settings-outline" size={24} color={stylesColor.color} />
        <Text style={[styles.text, stylesColor]}>{configurationOptionSentenceSuffix}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  touch: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  text: {
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 24
  }
});
