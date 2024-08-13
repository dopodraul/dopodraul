import { View, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { Table, Row, Rows } from 'react-native-table-component';

import { AppContext, getObjectValue, spotJson } from '../utils/common';

export default function SpotType() {
  const { spot, getStyle } = useContext(AppContext);
  const openList = getObjectValue(spotJson, `${spot}.open`);
  const stylesColor = getStyle();

  const styles = StyleSheet.create({
    container: {
      paddingTop: 16,
      paddingBottom: 16
    },

    table: {
      borderWidth: 1,
      borderColor: stylesColor.color
    },

    row: {
      padding: 8
    }
  });

  if (openList) {
    const data = openList.map((obj: object) => {
      const result = [getObjectValue(obj, 'name')];
      const rangeList = getObjectValue(obj, 'range');

      if (rangeList) {
        const rangeStart = rangeList[0] || '';
        const rangeEnd = rangeList[1] || '';
        result.push(`${rangeStart} ~ ${rangeEnd}`);
      }

      return result;
    });

    return (
      <Table borderStyle={styles.table}>
        <Row textStyle={[styles.row, stylesColor]} data={['營業時間']} />
        <Rows textStyle={[styles.row, stylesColor]} data={data} />
      </Table>
    );
  }

  return (<View />);
}
