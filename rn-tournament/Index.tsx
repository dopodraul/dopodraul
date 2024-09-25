import { useContext } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppContext } from './utils/common'
import HomeScreen from './screens/HomeScreen'
import MenuScreen from './screens/MenuScreen'
import MenuComponent from './components/MenuComponent'

const Stack = createNativeStackNavigator()

export default function Index() {
  const { screenEnum, getStyle } = useContext(AppContext)
  const initialRouteName = screenEnum.home
  const stylesColor = getStyle()
  const theme = {...{}, ...DefaultTheme}
  theme.colors.text = stylesColor.color
  theme.colors.card = stylesColor.card

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name={initialRouteName}
          component={HomeScreen}
          options={({ navigation }) => ({
            title: '',
            headerRight: () => (
              <MenuComponent navigation={navigation} />
            )
          })}
        />
        <Stack.Screen
          name={screenEnum.menu}
          component={MenuScreen}
          options={{ title: '選項' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
