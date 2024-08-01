import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import PickerComponent from '../components/PickerComponent';
import { AppContext } from '../utils/context';

const ConfigurationOption = () => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useContext(AppContext);

  const t = (key: string) => {
    return i18n.t('configurationOption:' + key);
  }

  const languageList = [{
    label: t('languageEn'),
    value: 'en'
  }, {
    label: t('languageZhTw'),
    value: 'zh-TW'
  }, {
    label: t('languageJa'),
    value: 'ja'
  }];

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.columnName}>
          <Text style={styles.columnNameText}>{t('language')}</Text>
        </View>
        <View style={styles.columnValue}>
          <PickerComponent
            selectedValue={language}
            itemList={languageList}
            onValueChange={changeLanguage}
            itemStyle={styles.columnValueText} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.columnName}>
          <Text style={styles.columnNameText}>{t('color')}</Text>
        </View>
        <View style={styles.columnValue}>
          <Text style={styles.columnValueText}>{t('colorLight')}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.columnName}>
          <Text style={styles.columnNameText}>{t('appVersion')}</Text>
        </View>
        <View style={styles.columnValue}>
          <Text style={styles.columnValueText}>1.0.0</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16
  },
  columnName: {
    flex: 1
  },
  columnValue: {
    flex: 1,
    flexDirection: 'row-reverse'
  },
  columnNameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  columnValueText: {
    fontSize: 16
  },
});

export default ConfigurationOption;