import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './screens/HomeScreen'
import MenuComponent from './components/MenuComponent'

const Stack = createNativeStackNavigator()
const initialRouteName = 'Home'

export default function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name={initialRouteName}
          component={HomeScreen}
          options={{
            title: '',
            headerRight: () => (
              <MenuComponent />
            )
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
