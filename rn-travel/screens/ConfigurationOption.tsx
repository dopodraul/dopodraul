import { View, Text, FlatList, StyleSheet } from 'react-native';

const listData = [
  { title: 'Language', value: 'English' },
  { title: 'Color', value: 'Light' },
  { title: 'App Version', value: '1.0.0' },
  { title: 'Last Updated', value: 'July 14, 2024' },
];

const renderItem = ({ item }: any) => (
  <View style={styles.item}>
    <Text style={styles.itemName}>{item.title}</Text>
    <Text style={styles.itemValue}>{item.value}</Text>
  </View>
);

const ConfigurationOption = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemValue: {
    fontSize: 16
  },
});

export default ConfigurationOption;
