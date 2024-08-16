import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Rows } from 'react-native-table-component';

import { AppContext, getObjectValue, spotJson } from '../utils/common';

export default function SpotType() {
  const { i18n } = useTranslation();
  const { spot, getStyle } = useContext(AppContext);
  const openList = getObjectValue(spotJson, `${spot}.open`);
  const stylesColor = getStyle();

  const styles = StyleSheet.create({
    container: {
      padding: 16
    },

    table: {
      borderWidth: 1,
      borderColor: stylesColor.color
    },

    row: {
      padding: 8
    }
  });

  const convertOpen = (open: any) => {
    if (open) {
      const openStr = String(open);
      return openStr.substring(0, 2) + ':' + openStr.substring(2, 4);
    }

    return '';
  }

  if (openList) {
    if (openList[1]) {
      const data = openList.map((obj: object) => {
        const name = getObjectValue(obj, 'name');
        const result = [i18n.exists(name) ? i18n.t(name) : i18n.t(`spot:${spot}:${name}`) ];
        const rangeList = getObjectValue(obj, 'range');

        if (rangeList) {
          result.push(convertOpen(rangeList[0]) + ' ~ ' + convertOpen(rangeList[1]));
        }

        return result;
      });

      return (
        <Table borderStyle={styles.table}>
          <Rows textStyle={[styles.row, stylesColor]} data={data} />
        </Table>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={stylesColor}>營業時間</Text>
      </View>
    );
  }

  return (<View />);
}
