import { View, Text, StyleSheet } from 'react-native';

export default function ConfigurationOption() {
  return (
    <View style={styles.container}>
      <Text>設定</Text>
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
