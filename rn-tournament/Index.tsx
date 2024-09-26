import { View, StyleSheet } from 'react-native'
import { useContext } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { screenEnum, AppContext } from './utils/common'
import HomeScreen from './screens/HomeScreen'
import TournamentEditScreen from './screens/TournamentEditScreen'
import MenuScreen from './screens/MenuScreen'
import AddComponent from './components/AddComponent'
import MenuComponent from './components/MenuComponent'
const Stack = createNativeStackNavigator()

export default function Index() {
  const { getStyle } = useContext(AppContext)
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
              <View style={styles.row}>
                <AddComponent style={styles.rowItem} navigation={navigation} />
                <MenuComponent navigation={navigation} />
              </View>
            )
          })}
        />
        <Stack.Screen
          name={screenEnum.tournament}
          component={TournamentEditScreen}
          options={({ navigation, route }) => ({
            title: (route.params['id'] ? '編輯' : '添加') + '賽程',
            headerRight: () => (<MenuComponent navigation={navigation} />)
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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },

  rowItem: {
    marginRight: 16
  }
})
