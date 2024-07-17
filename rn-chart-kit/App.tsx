import { Text, SafeAreaView, StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import React, { useEffect, useState, PropsWithChildren } from 'react';

// You can import supported modules from npm
import { Card } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import DropdownComponent from './components/DropdownComponent';

const MARGIN_Y = 16;

type datasetType = {
  color: () => string;
  data: number[];
};

type chartDataType = {
  labels: string[];
  datasets: datasetType[];
  legend: string[];
};

type chartProps = PropsWithChildren<{
  data: chartDataType;
}>;

const Chart = (props: chartProps) => {
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0.5,
    color: () => 'black'
  };

  useEffect(() => {
    Dimensions.addEventListener('change', ({ window: {width} }) => {
      setWindowWidth(width);
    });
  }, []);

  return (
    props.data ?
    <ScrollView
      horizontal={true}
      maxWidth={windowWidth - MARGIN_Y * 2}>
      <LineChart
        data={props.data}
        width={windowWidth * 2}
        height={220}
        chartConfig={chartConfig}>
      </LineChart>
    </ScrollView> :
    ''
  );
}

export default function App() {
  const placeSize = 5;
  const dateSize = 6;
  const [dateStart, setDateStart] = useState(undefined);
  const [dateEnd, setDateEnd] = useState(undefined);
  const [placeChart, setPlaceChart] = useState([]);
  const [wifiDataSrc, setWifiDataSrc] = useState([]);
  const [wifiDataChart, setWifiDataChart] = useState({});
  const [lineChartData, setLineChartData] = useState(null);
  const [dateItem, setDateItem] = useState(undefined);

  const getWifiData = async () => {
    // https://data.gov.tw/dataset/67472

    try {
      const response = await fetch('https://odws.hccg.gov.tw/001/Upload/25/opendataback/9059/9/e2e2a99e-0bd3-42a7-8263-8f09afb5b4c4.json');
      const json = await response.json();
      setWifiDataSrc(json);
    } catch(e) {
    }
  }

  useEffect(() => {
    getWifiData();
  }, []);

  useEffect(() => {
    const newWifiDataChart = {};

    wifiDataSrc.forEach((data: {}) => {
      const year = Number(data['年月'].substr(0, 3)) + 1911;
      const month = data['年月'].substr(3);
      const date = `${year}-${month}-01`;

      if (!newWifiDataChart[date]) {
        newWifiDataChart[date] = {};
      }

      newWifiDataChart[date][data['熱點名稱']] = Number(data['使用人次']);
    });

    setWifiDataChart(newWifiDataChart);
  }, [wifiDataSrc]);

  useEffect(() => {
    const placeUser: {
      index: object,

      list: {
        place: string,
        user: number
      }[]
    } = {
      index: {},
      list: []
    };

    const dateList = Object.keys(wifiDataChart);
    dateList.sort();
    dateList.reverse();
    const newDateStart = dateList[dateSize - 1];
    setDateStart(newDateStart);
    const newDateEnd = dateList[0];
    setDateEnd(newDateEnd);

    setDateItem(dateList.map((date => {
      const list = date.split('-');

      return {
        label: `${list[0]}/${list[1]}`,
        value: date
      };
    })));

    dateList.slice(0, dateSize).forEach((date) => {
      for (const place in wifiDataChart[date]) {
        if (placeUser.index[place] === undefined) {
          placeUser.index[place] = placeUser.list.length;

          placeUser.list.push({
            place,
            user: 0
          });
        }

        placeUser.list[placeUser.index[place]].user += wifiDataChart[date][place];
      }
    });

    placeUser.list.sort((lhs, rhs) => { return rhs.user - lhs.user });
    const newPlaceChart = placeUser.list.slice(0, placeSize).map((hash) => hash.place);
    setPlaceChart(newPlaceChart);
  }, [wifiDataChart]);

  useEffect(() => {
    const colorList = [
      'black',
      'blue',
      'green',
      'yellow',
      'red'
    ];

    if (dateStart && dateEnd) {
      const dateObjMax = new Date(dateEnd);

      const newLineChartData: chartDataType = {
        labels: [],
        datasets: [],
        legend: []
      };

      for (const dateObj = new Date(dateStart); dateObj <= dateObjMax; dateObj.setMonth(dateObj.getMonth() + 1)) {
        newLineChartData.labels.push(dateObj.toJSON().substring(0, 10));
      }

      if (placeChart) {
        placeChart.forEach((place, index) => {
          newLineChartData.legend.push(place);

          const dataset: datasetType = {
            color: () => colorList[index],
            data: []
          };

          newLineChartData.datasets.push(dataset);

          newLineChartData.labels.forEach((date) => {
            dataset.data.push(wifiDataChart[date][place]);
          });
        });
      }

      setLineChartData(newLineChartData);
    }
  }, [dateStart, dateEnd, placeChart, wifiDataChart]);

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <ScrollView>
          <View style={styles.flex}>
            <View style={styles.flex}>
              <Text>日期</Text>
            </View>
            <View style={styles.flex}>
              <DropdownComponent
                items={dateItem}
                value={dateStart}
                onClose={setDateStart}
              />
            </View>
            <View style={styles.flex}>
            <DropdownComponent
                items={dateItem}
                value={dateEnd}
                onClose={setDateEnd}
              />
            </View>
          </View>
          <View style={styles.flex}>
            <Chart data={lineChartData}></Chart>
          </View>
        </ScrollView>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
    marginLeft: MARGIN_Y,
    marginRight: MARGIN_Y
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 8
  }
});
