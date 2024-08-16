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
      const name = getObjectValue(obj, 'name');
      const result = [i18n.exists(name) ? i18n.t(name) : i18n.t(`spot:${spot}:${name}`) ];
      const value = getObjectValue(obj, 'value');

      if (value) {
        result.push(value + ' ' + i18n.t('spotDetail:priceYen'));
      }

      return result;
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
