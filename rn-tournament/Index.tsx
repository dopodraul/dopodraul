import { View, StyleSheet } from 'react-native'
import { useContext } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { screenEnum, AppContext } from './utils/common'
import HomeScreen from './screens/HomeScreen'
import TournamentEditScreen from './screens/TournamentEditScreen'
import TournamentSortScreen from './screens/TournamentSortScreen'
import TournamentViewScreen from './screens/TournamentViewScreen'
import PhaseEditScreen from './screens/PhaseEditScreen'
import PhaseSortScreen from './screens/PhaseSortScreen'
import PhaseViewScreen from './screens/PhaseViewScreen'
import MenuScreen from './screens/MenuScreen'
import AddComponent from './components/AddComponent'
import SortComponent from './components/SortComponent'
import MenuComponent from './components/MenuComponent'
const Stack = createNativeStackNavigator()

export default function Index() {
  const { tournamentList, getTournament, getStyle } = useContext(AppContext)
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
          options={() => ({
            title: '',
            headerRight: () => {
              const sortContent = tournamentList[1] ?
                <View style={styles.rowItem}>
                  <SortComponent routeName={screenEnum.tournamentSort} />
                </View> :
                <View />

              return (
                <View style={styles.row}>
                  <View style={styles.rowItem}>
                    <AddComponent routeName={screenEnum.tournamentEdit} />
                  </View>
                  {sortContent}
                  <MenuComponent />
                </View>
              )
            }
          })}
        />
        <Stack.Screen
          name={screenEnum.tournamentEdit}
          component={TournamentEditScreen}
          options={({ route }) => ({
            title: (route.params['id'] ? '編輯' : '添加') + '賽程',
            headerRight: () => (<MenuComponent />)
          })}
        />
        <Stack.Screen
          name={screenEnum.tournamentSort}
          component={TournamentSortScreen}
          options={() => ({
            title: '排列賽程',
            headerRight: () => (<MenuComponent />)
          })}
        />
        <Stack.Screen
          name={screenEnum.tournamentView}
          component={TournamentViewScreen}
          options={({ route }) => {
            const tournament = getTournament(route.params['id'])

            return {
              title: tournament.name,
              headerRight: () => {
                const sortContent = tournament.phaseList[1] ?
                  <View style={styles.rowItem}>
                    <SortComponent
                      routeName={screenEnum.phaseSort}
                      routeParam={{ tournamentId: route.params['id'] }}
                    />
                  </View> :
                  <View />

                return (
                  <View style={styles.row}>
                    <View style={styles.rowItem}>
                      <AddComponent
                        routeName={screenEnum.phaseEdit}
                        routeParam={{tournamentId: route.params['id']}}
                      />
                    </View>
                    {sortContent}
                    <MenuComponent />
                  </View>
                )
              }
            }
          }}
        />
        <Stack.Screen
          name={screenEnum.phaseEdit}
          component={PhaseEditScreen}
          options={({ route }) => ({
            title: (route.params['index'] === undefined ? '添加' : '編輯') + '階段',
            headerRight: () => (<MenuComponent />)
          })}
        />
        <Stack.Screen
          name={screenEnum.phaseSort}
          component={PhaseSortScreen}
          options={() => ({
            title: '排列階段',
            headerRight: () => (<MenuComponent />)
          })}
        />
        <Stack.Screen
          name={screenEnum.phaseView}
          component={PhaseViewScreen}
          options={({ route }) => {
            const phase = getTournament(route.params['tournamentId']).phaseList[route.params['index']]

            return {
              title: phase.name,
              headerRight: () => (<MenuComponent />)
            }
          }}
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
