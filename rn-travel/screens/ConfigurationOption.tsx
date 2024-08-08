import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import PickerComponent from '../components/PickerComponent';
import { AppContext } from '../utils/context';

const ConfigurationOption = () => {
  const { i18n } = useTranslation();
  const { language, setLanguage, color, setColor, getStyle } = useContext(AppContext);
  const stylesColor = getStyle();

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

  const colorList = [{
    label: t('colorLight'),
    value: 'light'
  }, {
    label: t('colorDark'),
    value: 'dark'
  }];

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    moment.locale(newLanguage);
  }

  return (
    <View style={[styles.container, stylesColor]}>
      <View style={styles.row}>
        <View style={styles.columnName}>
          <Text style={[styles.columnNameText, stylesColor]}>{t('language')}</Text>
        </View>
        <View style={styles.columnValue}>
          <PickerComponent
            selectedValue={language}
            itemList={languageList}
            onValueChange={changeLanguage} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.columnName}>
          <Text style={[styles.columnNameText, stylesColor]}>{t('color')}</Text>
        </View>
        <View style={styles.columnValue}>
          <PickerComponent
            selectedValue={color}
            itemList={colorList}
            onValueChange={setColor} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.columnName}>
          <Text style={[styles.columnNameText, stylesColor]}>{t('appVersion')}</Text>
        </View>
        <View style={styles.columnValue}>
          <Text style={[styles.columnValueText, stylesColor]}>1.0.0</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
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
  }
});

export default ConfigurationOption;
