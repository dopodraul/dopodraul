import {
  createContext,
  ReactNode,
  useState
} from 'react'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

enum screenEnum {
  home = 'home',
  menu = 'menu',
  tournamentEdit = 'tournamentEdit',
  tournamentSort = 'tournamentSort',
  tournamentView = 'tournamentView',
  phaseEdit = 'phaseEdit',
  phaseSort = 'phaseSort',
  phaseView = 'phaseView',
  team = 'team',
  score = 'score',
  rank = 'rank'
}

enum phaseTypeEnum {
  roundRobin = 'roundRobin',
  singleEliminate = 'singleEleminate',
  doubleEliminate = 'doubleEliminate'
}

enum colorEnum {
  light = 'light',
  dark = 'dark'
}

type roundRobinResultType = {
  win: number,
  draw: number,
  lose: number,
  scoreWin: number,
  scoreLose: number
}

type rankType = {
  rank: { rank: number, teamList: number[] }[],
  roundRobinPoint: number[]
}

type singleEliminateType = {}

type phaseType = {
  name: string,
  type: phaseTypeEnum,
  teamList: string[],
  singleEliminate: singleEliminateType,

  roundRobin: {
    pointWin: number,
    pointDraw: number,
    pointLose: number,
    scoreList: number[][][]
  },

  doubleEliminate: {
    win: singleEliminateType,
    lose: {}
  }
}

type tournamentType = {
  id: number,
  name: string,
  phaseFinalIndex: number,
  phaseList: phaseType[]
}

const AppContext = createContext({
  tournamentList: [] as tournamentType[],
  setTournamentList: (tournamentList: tournamentType[]) => {},
  getTournament: (id: number) => { return {} as tournamentType },
  getPhaseIcon: (type: phaseTypeEnum) => { return <></> },
  countPhaseMatch: (tournamentId: number, index: number) => { return { count: 0, total: 0 } },
  getRoundRobinResult: (tournamentId: number, index: number) => { return [] as roundRobinResultType[] },
  getPhaseRank: (tournamentId: number, index: number, roundRobinResult?: roundRobinResultType[]) => { return {} as rankType },
  setPhase: (tournamentId: number, index: number, phase: phaseType) => {},
  colorValue: colorEnum.light,
  setColorValue: (colorValue: colorEnum) => {},
  getStyle: () => { return { color: '', backgroundColor: '', card: '' } }
})

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [colorValue, setColorValue] = useState(colorEnum.light)
  const [tournamentList, setTournamentList]= useState<tournamentType[]>([])

  const getStyle = () => {
    return colorValue === colorEnum.dark ? {
        color: 'white',
        backgroundColor: 'rgba(28, 27, 31, 1)',
        card: 'black'
      } : {
        color: 'black',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        card: 'white'
      }
  }

  const getTournament = (id: number) => {
    let result = {} as tournamentType

    tournamentList.some(tournament => {
      if (id === tournament.id) {
        result = tournament
        return true
      }
    })

    return result
  }

  const getPhaseIcon = (type: phaseTypeEnum) => {
    let name = 'table-large'

    switch (type) {
      case phaseTypeEnum.singleEliminate:
        name = 'tournament'
        break

      case phaseTypeEnum.doubleEliminate:
        name = 'axis-y-arrow'
    }

    return <Icon name={name} size={24} color={getStyle().color} />
  }

  const countPhaseMatch = (tournamentId: number, index: number) => {
    const result = { count: 0, total: 0 }
    const phase = getTournament(tournamentId).phaseList[index]

    switch (phase.type) {
      case phaseTypeEnum.singleEliminate:
        break

      case phaseTypeEnum.doubleEliminate:
        break

      default:
        const factorial = (n: number) => n > 1 ? n * factorial(n - 1) : 1
        result.total = factorial(phase.teamList.length) / (factorial(2) * factorial(phase.teamList.length - 2))

        phase.roundRobin.scoreList.forEach(rowList =>
          rowList.forEach(columnList => {
            if (columnList[0] !== undefined) {
              result.count++
            }
          })
        )
    }

    return result
  }

  const getRoundRobinResult = (tournamentId: number, index: number) => {
    const phase = getTournament(tournamentId).phaseList[index]

    if (phase.type !== phaseTypeEnum.roundRobin) {
      return []
    }

    const result: roundRobinResultType[] = phase.teamList.map(() => ({
      win: 0,
      draw: 0,
      lose: 0,
      scoreWin: 0,
      scoreLose: 0
    }))

    phase.roundRobin.scoreList.forEach((rowList, indexRow) => {
      rowList.forEach((columnList, indexColumn) => {
        if (columnList[0] !== undefined) {
          result[indexRow].scoreWin += columnList[0]
          result[indexRow].scoreLose += columnList[1]
          result[indexColumn].scoreWin += columnList[1]
          result[indexColumn].scoreLose += columnList[0]

          if (columnList[0] === columnList[1]) {
            result[indexRow].draw++
            result[indexColumn].draw++
          } else if (columnList[0] > columnList[1]) {
            result[indexRow].win++
            result[indexColumn].lose++
          } else {
            result[indexRow].lose++
            result[indexColumn].win++
          }
        }
      })
    })

    return result
  }

  const getPhaseRank = (tournamentId: number, index: number, roundRobinResult: roundRobinResultType[] = []) => {
    const result: rankType = {
      rank: [],
      roundRobinPoint: []
    }

    const phase = getTournament(tournamentId).phaseList[index]

    switch (phase.type) {
      case phaseTypeEnum.singleEliminate:
        break

      case phaseTypeEnum.doubleEliminate:
        break

      default:
        const pointTeam = {}

        roundRobinResult.forEach((res, teamIndex) => {
          const point = res.win * phase.roundRobin.pointWin +
            res.draw * phase.roundRobin.pointDraw +
            res.lose * phase.roundRobin.pointLose

          if (!pointTeam[point]) {
            pointTeam[point] = []
          }

          result.roundRobinPoint[teamIndex] = point
          pointTeam[point].push(teamIndex)
        })

        let rank = 1

        result.rank = Object.keys(pointTeam).sort(
          (lhs, rhs) => Number(rhs) - Number(lhs)
        ).map(point => {
          const rankObj = {
            rank,
            teamList: pointTeam[point]
          }

          rank += pointTeam[point].length
          return rankObj
        })
    }

    return result
  }

  const setPhase = (tournamentId: number, index: number, phase: phaseType) => {
    setTournamentList(
      tournamentList.map(tournament => {
        if (tournamentId === tournament.id) {
          tournament.phaseList = tournament.phaseList.map((phaseData, phaseIndex) => {
            return index === phaseIndex ? phase : phaseData
          })
        }

        return tournament
      })
    )
  }

  return (
    <AppContext.Provider value={{
      tournamentList,
      setTournamentList,
      getTournament,
      getPhaseIcon,
      countPhaseMatch,
      getRoundRobinResult,
      getPhaseRank,
      setPhase,
      colorValue,
      setColorValue,
      getStyle
    }}>
      {children}
    </AppContext.Provider>
  )
}

export {
  screenEnum,
  phaseTypeEnum,
  colorEnum,
  tournamentType,
  phaseType,
  AppContext,
  AppProvider
}
