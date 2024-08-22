import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Rows } from 'react-native-table-component';

import { AppContext, getObjectValue, spotJson } from '../utils/common';

export default function SpotPrice() {
  const { i18n } = useTranslation();
  const { spot, getStyle } = useContext(AppContext);
  const priceList = getObjectValue(spotJson, `${spot}.price`);
  const stylesColor = getStyle();

  const styles = StyleSheet.create({
    container: {
      padding: 8,
      flexDirection: 'row'
    },

    table: {
      marginBottom: 8
    },

    tableBorder: {
      borderWidth: 1,
      borderColor: stylesColor.color
    },

    row: {
      padding: 8
    },

    value: {
      marginLeft: 8
    }
  });

  if (priceList) {
    const data = priceList.map((obj: object) => {
      const keyList: string[] = getObjectValue(obj, 'name');
      const nameList: string[] = [];

      if (keyList) {
        keyList.forEach((key) => {
          nameList.push(i18n.exists(key) ? i18n.t(key) : i18n.t(`spot:${spot}:${key}`));
        });
      }

      let price = '';
      const value = getObjectValue(obj, 'value');

      if (value) {
        price = value + ' ' + i18n.t('spotDetail:priceYen');
      } else {
        price = i18n.t('spotDetail:priceFree');
      }

      return [
        nameList.join(' & '),
        price
      ];
    });

    if (data[1]) {
      return (
        <Table style={styles.table} borderStyle={styles.tableBorder}>
          <Rows textStyle={[styles.row, stylesColor]} data={data} />
        </Table>
      );
    }

    return (
      <View style={styles.container}>
        <View>
          <Text style={stylesColor}>{data[0][0]}</Text>
        </View>
        <View style={styles.value}>
          <Text style={stylesColor}>{data[0][1]}</Text>
        </View>
      </View>
    );
  }

  return (<View />);
}
