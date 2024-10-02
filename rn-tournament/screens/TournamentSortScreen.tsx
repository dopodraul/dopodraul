import { ScrollView, StyleSheet } from 'react-native'
import { useContext } from 'react'
import DragList, { DragListRenderItemInfo } from 'react-native-draglist'
import { tournamentType, AppContext } from '../utils/common'
import TournamentSortItemComponent from '../components/TournamentSortItemComponent'

export default function TournamentSortScreen({ navigation }) {
  const { tournamentList, setTournamentList, getStyle } = useContext(AppContext)
  const stylesColor = getStyle()
  const keyExtractor = (tournament: tournamentType) => ( tournament.id.toString() )

  const onReordered = (fromIndex: number, toIndex: number) => {
    const newTournamentList = [ ...tournamentList ]
    const removeTournamentList = newTournamentList.splice(fromIndex, 1)
    newTournamentList.splice(toIndex, 0, removeTournamentList[0])
    setTournamentList(newTournamentList)
  }

  const renderItem = (info: DragListRenderItemInfo<tournamentType>) => {
    return (<TournamentSortItemComponent info={info} />)
  }

  return (
    <ScrollView style={stylesColor}>
      <DragList
        style={styles.container}
        data={tournamentList}
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
