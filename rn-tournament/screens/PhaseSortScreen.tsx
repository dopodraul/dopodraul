import {ScrollView, StyleSheet } from 'react-native'
import { useContext } from 'react'
import { useRoute } from '@react-navigation/native'
import DragList, { DragListRenderItemInfo } from 'react-native-draglist'
import { phaseType, AppContext } from '../utils/common'
import PhaseSortItemComponent from '../components/PhaseSortItemComponent'

export default function PhaseSortScreen() {
  const {
    tournamentList,
    setTournamentList,
    getTournament,
    getStyle
  } = useContext(AppContext)

  const route = useRoute()
  const tournament = getTournament(route.params['tournamentId'])
  const stylesColor = getStyle()
  const keyExtractor = (_: phaseType, index: number) => ( index.toString() )

  const onReordered = (fromIndex: number, toIndex: number) => {
    const newPhaseList = [ ...tournament.phaseList ]
    const removePhaseList = newPhaseList.splice(fromIndex, 1)
    newPhaseList.splice(toIndex, 0, removePhaseList[0])
    const newTournamentList = [ ...tournamentList ]

    setTournamentList(
      newTournamentList.map((tournamentData) => {
        if (tournamentData.id === tournament.id) {
          tournamentData.phaseList = newPhaseList
        }

        return tournamentData
      }
    ))
  }

  const renderItem = (info: DragListRenderItemInfo<phaseType>) => {
    return (<PhaseSortItemComponent info={info} />)
  }

  return (
    <ScrollView style={stylesColor}>
      <DragList
        style={styles.container}
        data={tournament.phaseList}
        keyExtractor={keyExtractor}
        onReordered={onReordered}
        renderItem={renderItem}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 32
  }
})
