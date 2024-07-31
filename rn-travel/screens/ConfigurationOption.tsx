import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useContext } from 'react';

import { AppContext } from  '../utils/context';

const renderItem = ({ item }: any) => (
  <View style={styles.item}>
    <Text style={styles.itemName}>{item.title}</Text>
    <Text style={styles.itemValue}>{item.value}</Text>
  </View>
);

const ConfigurationOption = () => {
  const { i18n } = useContext(AppContext);

  const t = (key: string) => {
    return i18n.t('configurationOption:' + key);
  }

  const listData = [
    {
      title: t('language'),
      value: t('languageEn')
    },
    {
      title: t('color'),
      value: t('colorLight')
    },
    {
      title: t('appVersion'),
      value: '1.0.0'
    },
    {
      title: t('updateDate'),
      value: 'July 14, 2024'
    }
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemValue: {
    fontSize: 16
  },
});

export default ConfigurationOption;
