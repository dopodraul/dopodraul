import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import RecentPlace from './screens/RecentPlace';
import SearchPlace from './screens/SearchPlace';
import CommonApp from './screens/CommonApp';
import ConfigurationOption from './screens/ConfigurationOption';

const Tab = createBottomTabNavigator();

export default function Index() {
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
        <Tab.Screen name="RecentPlace" component={RecentPlace} options={{ title: '' }} />
        <Tab.Screen name="SearchPlace" component={SearchPlace} options={{ title: '' }} />
        <Tab.Screen name="CommonApp" component={CommonApp} options={{ title: '' }} />
        <Tab.Screen name="ConfigurationOption" component={ConfigurationOption} options={{ title: '' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
