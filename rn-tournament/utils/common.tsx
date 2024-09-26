import {
  createContext,
  ReactNode,
  useState
} from 'react'

enum screenEnum {
  home = 'home',
  menu = 'menu',
  tournament = 'tournament'
}

enum colorEnum {
  light = 'light',
  dark = 'dark'
}

type tournamentType = {
  id: number,
  name: string
}

const AppContext = createContext({
  tournamentList: [] as tournamentType[],
  setTournamentList: (tournamentList: tournamentType[]) => {},
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

  return (
    <AppContext.Provider value={{
      tournamentList,
      setTournamentList,
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
  colorEnum,
  AppContext,
  AppProvider
}
