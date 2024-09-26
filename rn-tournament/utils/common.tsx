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

const AppContext = createContext({
  colorValue: colorEnum.light,
  setColorValue: (colorValue: colorEnum) => {},
  getStyle: () => { return { color: '', backgroundColor: '', card: '' } }
})

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [colorValue, setColorValue] = useState(colorEnum.light)

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
