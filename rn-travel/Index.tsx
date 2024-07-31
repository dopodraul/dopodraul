import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import RecentPlace from './screens/RecentPlace';
import SearchPlace from './screens/SearchPlace';
import CommonApp from './screens/CommonApp';
import ConfigurationOption from './screens/ConfigurationOption';

const Tab = createBottomTabNavigator();

export default function Index({ i18n }: any) {
  const t = (key: string) => {
    return i18n.t('index:' + key);
  }

  return (
    <NavigationContainer>
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
          component={RecentPlace}
          initialParams={{ i18n }} />
        <Tab.Screen
          name="SearchPlace"
          options={{ title: t('searchPlace') }}
          component={SearchPlace}
          initialParams={{ i18n }} />
        <Tab.Screen
          name="CommonApp"
          options={{ title: t('commonApp') }}
          component={CommonApp}
          initialParams={{ i18n }} />
        <Tab.Screen
          name="ConfigurationOption"
          options={{ title: t('configurationOption') }}
          component={ConfigurationOption}
          initialParams={{ i18n }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
