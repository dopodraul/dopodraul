import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import RecentPlace from './screens/RecentPlace';
import SearchPlace from './screens/SearchPlace';
import CommonApp from './screens/CommonApp';
import ConfigurationOption from './screens/ConfigurationOption';
import { AppContext } from './utils/common';

const Tab = createBottomTabNavigator();

export default function Index() {
  const { i18n } = useTranslation();
  const { getStyle } = useContext(AppContext);
  const stylesColor = getStyle();
  const theme = {...{}, ...DefaultTheme};
  theme.colors.text = stylesColor.color;
  theme.colors.card = stylesColor.card;

  const t = (key: string) => {
    return i18n.t('index:' + key);
  }

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            switch (route.name) {
              case 'RecentPlace':
                iconName = focused ? 'time' : 'time-outline';
                break;
              case 'SearchPlace':
                iconName = focused ? 'search' : 'search-outline';
                break;
              case 'CommonApp':
                iconName = focused ? 'apps' : 'apps-outline';
                break;
              default:
                iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="RecentPlace"
          options={{ title: t('recentPlace') }}
          component={RecentPlace} />
        <Tab.Screen
          name="SearchPlace"
          options={{ title: t('searchPlace') }}
          component={SearchPlace} />
        <Tab.Screen
          name="CommonApp"
          options={{ title: t('commonApp') }}
          component={CommonApp} />
        <Tab.Screen
          name="ConfigurationOption"
          options={{ title: t('configurationOption') }}
          component={ConfigurationOption} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
