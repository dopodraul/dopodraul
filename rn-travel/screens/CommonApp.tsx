import {
  Platform,
  ScrollView,
  FlatList,
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

import { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import appJson from '../json/app.json';

import {
  getObjectValue,
  openUrl,
  AppContext
} from '../utils/common';

export default function CommonApp() {
  const { getStyle } = useContext(AppContext);
  const stylesColor = getStyle();

  const data = Object.entries(appJson)
    .filter(([_, obj]) => getObjectValue(obj, 'id.' + Platform.OS) || getObjectValue(obj, 'link'))
    .sort(([lhs], [rhs]) => lhs.localeCompare(rhs));

  const appPrefix = {
    android: 'https://play.google.com/store/apps/details?id=',
    ios: 'https://apps.apple.com/app/'
  };

  const iconObj = {
    Ionicons,
    MaterialIcons,
    MaterialCommunityIcons
  };

  const renderItem = ({ item }: { item: [key: string, obj: object] }) => {
    const obj = item[1];
    const name = getObjectValue(obj, 'name');
    const IconComponent = getObjectValue(iconObj, getObjectValue(obj, 'icon.family'));
    const iconName = getObjectValue(obj, 'icon.name');
    const id = getObjectValue(obj, 'id.' + Platform.OS);
    const link = getObjectValue(obj, 'link');

    const appContent = id ?
      <TouchableOpacity onPress={(() => { openUrl(getObjectValue(appPrefix, Platform.OS) + id); })}>
        <MaterialIcons
          name="cloud-download"
          size={24}
          color="#007aff"
        />
      </TouchableOpacity> :
      <View />;

    const linkContent = link ?
      <TouchableOpacity onPress={() => { openUrl(link); }}>
        <Ionicons
          name="link"
          size={24}
          color="#007aff"
        />
      </TouchableOpacity> :
      <View />;

    return (
      <View style={styles.item}>
        <View style={styles.itemName}>
          <IconComponent
            name={iconName}
            size={16}
            color={stylesColor.color} />
          <Text style={[styles.itemNameText, stylesColor]}>
            {name}
          </Text>
        </View>
        <View style={styles.itemApp}>
          {appContent}
        </View>
        <View style={styles.itemLink}>
          {linkContent}
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, stylesColor]}>
      <FlatList data={data} renderItem={renderItem} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  item: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16
  },

  itemName: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },

  itemApp: {
    flex: 1,
    alignItems: 'center'
  },

  itemLink: {
    flex: 1,
    alignItems: 'center'
  },

  itemNameText: {
    fontSize: 16
  }
});
