import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { Table, Rows } from 'react-native-table-component';

import { AppContext, getObjectValue, spotJson } from '../utils/common';

export default function SpotOpen() {
  const { i18n } = useTranslation();
  const { spot, getStyle } = useContext(AppContext);
  const openList = getObjectValue(spotJson, `${spot}.open`);
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

  const convertOpen = (open: any) => {
    if (open) {
      const moment = Moment(open, 'HHmm');
      return moment.format('LT');
    }

    return '';
  }

  const convertDate = (date: any) => {
    if (date) {
      const moment = Moment(date, 'MMDD');
      return moment.format('MMMM Do');
    }

    return '';
  }

  if (openList) {
    const data = openList.map((obj: object) => {
      const name = getObjectValue(obj, 'name');
      const result = [i18n.exists(name) ? i18n.t(name) : i18n.t(`spot:${spot}:${name}`)];
      const dateRange = getObjectValue(obj, 'dateRange');

      if (dateRange) {
        result[0] = convertDate(dateRange[0]) + ' ~ ' + convertDate(dateRange[1]);
      }

      const rangeList = getObjectValue(obj, 'range');

      if (rangeList) {
        result.push(convertOpen(rangeList[0]) + ' ~ ' + convertOpen(rangeList[1]));

        const serviceList = getObjectValue(obj, 'service');

        if (serviceList) {
          result[1] += "\n(" +
            i18n.t('spotDetail:openService') +
            ' ' +
            convertOpen(serviceList[0]) +
            ' ~ ' +
            convertOpen(serviceList[1]) +
            ')';
        }
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
