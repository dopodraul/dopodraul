import { View, Text, StyleSheet } from 'react-native';

export default function CommonApp() {
  return (
    <View style={styles.container}>
      <Text>常用APP與連結</Text>
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
