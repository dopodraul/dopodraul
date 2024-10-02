import {
  createContext,
  ReactNode,
  useState
} from 'react'

enum screenEnum {
  home = 'home',
  menu = 'menu',
  tournamentEdit = 'tournamentEdit',
  tournamentSort = 'tournamentSort',
  tournamentView = 'tournamentView',
  phaseEdit = 'phaseEdit'
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

  return (
    <AppContext.Provider value={{
      tournamentList,
      setTournamentList,
      getTournament,
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
