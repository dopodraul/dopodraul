import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle
} from 'react-native'

import { useContext } from 'react'
import { phaseTypeEnum, colorEnum, AppContext } from '../utils/common'
import TextInputComponent from '../components/TextInputComponent'
import TableComponent from '../components/TableComponent'

export default function RankScreen({ route }) {
  const {
    getTournament,
    getRoundRobinResult,
    getPhaseRank,
    setPhase,
    colorValue,
    getStyle
  } = useContext(AppContext)

  const width = 64
  const height = 48
  let widthArr = [128]
  const { tournamentId, index } = route.params
  const phase = getTournament(tournamentId).phaseList[index]
  const heightArr = new Array(phase.teamList.length).fill(height)
  const roundRobinResult = getRoundRobinResult(tournamentId, index)
  const phaseRank = getPhaseRank(tournamentId, index, roundRobinResult)
  const stylesColor = getStyle()

  const backgroundObj = colorValue === colorEnum.dark ? {
    rank: ['', '#C0A200', '#909090', '#B77B48'],
    multi: ['', '#008080']
  } : {
    rank: ['', 'gold', 'silver', 'sandybrown'],
    multi: ['', 'aqua']
  }

  const textToNode = (text: any, backgroundColor = '') => {
    const stylesNode: StyleProp<ViewStyle> = backgroundColor ? {
      flex: 1,
      justifyContent: 'center',
      backgroundColor
    } : {}

    return <View style={stylesNode}>
      <Text style={[styles.tableText, { color: stylesColor.color }]}>{text}</Text>
    </View>
  }

  const data: any[][] = [['排名', '隊伍'].map(text => textToNode(text))]
  let content = <View />

  if (phase.type === phaseTypeEnum.roundRobin) {
    const isError = phase.roundRobin.pointWin < phase.roundRobin.pointDraw ||
      phase.roundRobin.pointDraw < phase.roundRobin.pointLose

    const setPoint = (key: string, pointStr: string) => {
      const point = Number(pointStr)

      if (!isNaN(point)) {
        const newPhase = { ...phase }
        newPhase.roundRobin[key] = point
        setPhase(tournamentId, index, newPhase)
      }
    }

    content = <View>
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Text style={stylesColor}>勝利積分</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={stylesColor}>平手積分</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={stylesColor}>敗北積分</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <TextInputComponent
            value={phase.roundRobin.pointWin.toString()}
            inputMode="numeric"
            isError={isError}
            getResult={point => { setPoint('pointWin', point) }}
          />
        </View>
        <View style={styles.rowItem}>
          <TextInputComponent
            value={phase.roundRobin.pointDraw.toString()}
            inputMode="numeric"
            isError={isError}
            getResult={point => { setPoint('pointDraw', point) }}
          />
        </View>
        <View style={styles.rowItem}>
          <TextInputComponent
            value={phase.roundRobin.pointLose.toString()}
            inputMode="numeric"
            isError={isError}
            getResult={point => { setPoint('pointLose', point) }}
          />
        </View>
      </View>
    </View>

    const dataHead = ['積分', '勝利', '平手', '敗北', '總得分', '總失分', '得失分'].map(text => textToNode(text))
    data[0] = data[0].concat(dataHead)
    widthArr = widthArr.concat(new Array(dataHead.length).fill(width))
    let lastRank = 0
    let backgroundIndex = 1

    phaseRank.rank.forEach(rankObj => {
      let background = backgroundObj.rank[rankObj.rank]

      if (!background) {
        if (lastRank !== rankObj.rank) {
          lastRank = rankObj.rank
          backgroundIndex = Number(!backgroundIndex)
        }

        background = backgroundObj.multi[backgroundIndex]
      }

      rankObj.teamList.forEach(teamIndex => {
        data.push([
          rankObj.rank,
          phase.teamList[teamIndex] || `隊伍${teamIndex + 1}`,
          phaseRank.roundRobinPoint[teamIndex],
          roundRobinResult[teamIndex].win,
          roundRobinResult[teamIndex].draw,
          roundRobinResult[teamIndex].lose,
          roundRobinResult[teamIndex].scoreWin,
          roundRobinResult[teamIndex].scoreLose,
          roundRobinResult[teamIndex].scoreWin - roundRobinResult[teamIndex].scoreLose
        ].map(text => textToNode(text, background)))
      })
    })
  }

  return (
    <View style={[styles.container, stylesColor]}>
      {content}
      <View style={styles.table}>
        <TableComponent
          data={data}
          width={width}
          height={height}
          widthArr={widthArr}
          heightArr={heightArr}
          isBorder={true}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8
  },

  rowItem: {
    flex: 1,
    marginRight: 16
  },

  table: {
    flex: 1,
    paddingBottom: 64
  },

  tableText: {
    textAlign: 'center'
  }
})
