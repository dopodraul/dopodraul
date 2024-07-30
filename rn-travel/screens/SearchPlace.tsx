import { View, Text, StyleSheet } from 'react-native';

export default function SearchPlace() {
  return (
    <View style={styles.container}>
      <Text>搜尋景點</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
