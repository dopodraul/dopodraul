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
  score = 'score'
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
  countPhaseMatch: (tournamentId: number, index: number) => { return { count: 0, total: 0 } },
  setPhase: (tournamentId: number, index: number, phase: phaseType) => {},
  colorValue: colorEnum.light,
  setColorValue: (colorValue: colorEnum) => {},
  getStyle: () => { return { color: '', backgroundColor: '', card: '' } },
  getPhaseIcon: (type: phaseTypeEnum) => { return <></> }
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

  return (
    <AppContext.Provider value={{
      tournamentList,
      setTournamentList,
      getTournament,
      countPhaseMatch,
      setPhase,
      colorValue,
      setColorValue,
      getStyle,
      getPhaseIcon
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
