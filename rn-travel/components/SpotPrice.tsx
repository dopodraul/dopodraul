import { View, Text, StyleSheet } from 'react-native';
import { useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Rows } from 'react-native-table-component';

import { AppContext, getObjectValue, spotJson } from '../utils/common';

export default function SpotPrice({ spot }: { spot: string; }) {
  const { i18n } = useTranslation();
  const { getStyle } = useContext(AppContext);
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

  type priceDataNameType = string;
  type priceDataValueType = {[type: string]: number};

  type priceDataType = {
    name: priceDataNameType;
    nameList: priceDataNameType[];
    groupNumber: number;
    data: {[age: string]: priceDataValueType};
  };

  const t = (key: string) => {
    return i18n.exists(key) ? i18n.t(key) : i18n.t(`spot:${spot}:${key}`);
  }

  const convertPriceToTable = (obj: priceDataType) => {
    const typeSort = ['disibility', 'escort'];
    const key = 'price';
    let colMax = 0;
    const resultHead = [''];

    if (obj.name) {
      resultHead[0] = t(obj.name);
    } else if (obj.nameList) {
      resultHead[0] = obj.nameList.map((name) => t(name)).join(' & ');
    }

    const result = [resultHead];
    let colLength = 0;
    const colList: string[] = [];
    const data = Object.entries(obj.data);

    data.sort(
      ([_l, colObjLhs], [_r, colObjRhs]) => colObjRhs[key] - colObjLhs[key]
    ).forEach(([row, colObj], rowIndex) => {
      const resultRow = [
        row.split(',').map((age) => i18n.t('spotDetail:' + age)).join(' & ')
      ];

      result.push(resultRow);

      if (rowIndex === 0) {
        Object.entries(colObj).sort(([colLhs, priceLhs], [colRhs, priceRhs]) => {
          return priceLhs === priceRhs ?
            typeSort.indexOf(colLhs) - typeSort.indexOf(colRhs) :
            priceRhs - priceLhs;
        }).forEach(([col]) => {
          colList.push(col);
        });

        colLength = colList.length;
      }

      colList.forEach((col) => {
        if (colObj[col] === 0) {
          resultRow.push(i18n.t('spotDetail:priceFree'));
        } else if (colObj[col]) {
          resultRow.push(colObj[col] + ' ' + i18n.t('spotDetail:priceYen'));
        } else {
          resultRow.push('');
        }

        if (rowIndex === 0) {
          let head = i18n.t('spotDetail:' + col);

          if (col === 'group' && obj.groupNumber) {
            head += ' (' + i18n.t('spotDetail:groupNumber', { number: obj.groupNumber }) + ')';
          }

          resultHead.push(head);
        }
      });

      if (colLength > colMax) {
        colMax = colLength;
      }
    });

    return colMax > data.length ?
      result[0].map((_, colIndex) => result.map(row => row[colIndex])) :
      result;
  }

  const priceList = getObjectValue(spotJson, `${spot}.priceData`);

  if (priceList) {
    const content: ReactNode[] = [];

    priceList.forEach((priceData: priceDataType, priceIndex: number) => {
      const priceTable = convertPriceToTable(priceData);

      if (priceIndex === 0 &&
        !priceList[1] &&
        !priceTable[2] &&
        !priceTable[0][2]) {
        content.push(
          <View style={styles.container}>
            <View>
              <Text style={stylesColor}>{i18n.t('spotDetail:price')}</Text>
            </View>
            <View style={styles.value}>
              <Text style={stylesColor}>{priceTable[1][1]}</Text>
            </View>
          </View>
        );
      } else {
        content.push(
          <Table style={styles.table} borderStyle={styles.tableBorder}>
            <Rows textStyle={[styles.row, stylesColor]} data={priceTable} />
          </Table>
        );
      }
    });

    return (content);
  }

  return (<View />);
}
