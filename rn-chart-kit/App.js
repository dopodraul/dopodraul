import { Text, SafeAreaView, StyleSheet } from 'react-native';
import {useEffect, useState} from 'react';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';

export default function App() {
  const [wifiDataSrc, setWifiDataSrc] = useState([]);
  const [wifiDataChart, setWifiDataChart] = useState({});

  const getWifiData = async () => {
    // https://data.gov.tw/dataset/67472

    try {
      const response = await fetch('https://odws.hccg.gov.tw/001/Upload/25/opendataback/9059/9/e2e2a99e-0bd3-42a7-8263-8f09afb5b4c4.json');
      const json = await response.json();
      setWifiDataSrc(json);
    } catch(_e) {
    }
  }

  useEffect(() => {
    getWifiData();
  }, []);

  useEffect(() => {
    const newWifiDataChart = {};

    wifiDataSrc.forEach((data) => {
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
    const placeUser = { list: [], index: {} };
    const dateList = Object.keys(wifiDataChart);
    dateList.sort();
    dateList.reverse();

    dateList.slice(0, 6).forEach((date) => {
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
  }, [wifiDataChart]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
        Change code in the editor and watch it change on your phone! Save to get a shareable url.
      </Text>
      <Card>
        <AssetExample />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
