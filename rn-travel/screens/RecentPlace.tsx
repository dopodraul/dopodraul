import { View, Text, StyleSheet } from 'react-native';

export default function RecentPlace() {
  return (
    <View style={styles.container}>
      <Text>最近觀看景點</Text>
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
