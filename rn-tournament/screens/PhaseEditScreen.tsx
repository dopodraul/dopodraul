import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

import {
  useContext,
  useMemo,
  useState,
  useEffect
} from 'react'

import {
  phaseType,
  phaseTypeEnum,
  screenEnum,
  AppContext
} from '../utils/common'

import TextRequireComponent from '../components/TextRequireComponent'
import TextInputComponent from '../components/TextInputComponent'
import PickerComponent from '../components/PickerComponent'

export default function PhaseEditScreen({ navigation, route }) {
  const {
    getTournament,
    tournamentList,
    setTournamentList,
    getStyle
  } = useContext(AppContext)

  const { tournamentId, index }: { tournamentId: number, index : number } = route.params
  const tournament = getTournament(tournamentId)
  const stylesColor = getStyle()

  const phase = useMemo(() => {
    return index === undefined ?
      {
        name: '',
        type: phaseTypeEnum.roundRobin,
        teamList: [],
        roundRobin: {},
        singleEliminate: {},
        doubleEliminate: {}
      } as phaseType :
      tournament.phaseList[index]
  }, [index, tournament])

  const [name, setName] = useState(phase.name)
  const [isNameError, setIsNameError] = useState(false)
  const [type, setType] = useState(phase.type)
  const [teamNumber, setTeamNumber] = useState(phase.teamList[0] ? phase.teamList.length.toString() : '')
  const [isTeamNumberError, setIsTeamNumberError] = useState(false)
  const [isDisable, setIsDisable] = useState(true)

  const typeList = [{
    label: '循環賽',
    value: phaseTypeEnum.roundRobin
  }, {
    label: '單淘汰賽',
    value: phaseTypeEnum.singleEliminate
  }, {
    label: '雙敗淘汰賽',
    value: phaseTypeEnum.doubleEliminate
  }]

  const getName = (newName: string) => {
    setName(newName)
    setIsNameError(!newName)
  }

  const selectType = (newType: phaseTypeEnum) => {
    setType(newType)
  }

  const editTeamNumber = (input: string) => {
    const newTeamNumber = parseInt(input)
    const isValid = newTeamNumber > 1
    setIsTeamNumberError(!isValid)
    setTeamNumber(isValid ? newTeamNumber.toString() : '')
  }

  const editTeamName = (teamName: string) => {
    phase.teamList = teamName.length ? teamName.split("\n") : []
  }

  useEffect(() => {
    phase.name = name
  }, [phase, name])

  useEffect(() => {
    phase.type = type
  }, [phase, type])

  useEffect(() => {
    setIsDisable(isNameError || isTeamNumberError)
  }, [isNameError, isTeamNumberError])

  const pressConfirmButton = () => {
    const teamLength = parseInt(teamNumber)

    phase.teamList = Array.from(
      { length: teamLength },
      (_, teamIndex) => phase.teamList[teamIndex] || ''
    )

    if (phase.type === phaseTypeEnum.roundRobin) {
      if (!phase.roundRobin.scoreList) {
        phase.roundRobin.scoreList = []

        for (let teamX = 1; teamX < teamLength; teamX++) {
          if (!phase.roundRobin.scoreList[teamX]) {
            phase.roundRobin.scoreList[teamX] = []
          }

          for (let teamY = 0; teamY < teamX; teamY++) {
            phase.roundRobin.scoreList[teamX][teamY] = []
          }
        }
      }
    }

    if (index === undefined) {
      if (tournament.phaseList[0]) {
        tournament.phaseFinalIndex++
      }

      tournament.phaseList.unshift(phase)
    } else {
      tournament.phaseList[index] = phase
    }

    setTournamentList(
      tournamentList.map(tournamentData => {
        return tournamentId === tournamentData.id ?
          tournament :
          tournamentData
      })
    )

    navigation.navigate(screenEnum.tournamentView, { id: tournamentId })
  }

  return (
    <View style={[styles.container, stylesColor]}>
      <View style={styles.row}>
        <View style={styles.rowName}>
          <Text style={stylesColor}>賽程名稱</Text>
        </View>
        <View style={styles.rowValue}>
          <Text style={stylesColor}>{tournament.name}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.rowName}>
          <TextRequireComponent text="階段名稱" />
        </View>
        <View style={styles.rowValue}>
          <TextInputComponent
            value={phase.name}
            placeholder="請輸入階段名稱"
            isError={isNameError}
            getResult={getName} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.rowName}>
          <TextRequireComponent text="類型" />
        </View>
        <View style={styles.rowValue}>
          <PickerComponent
            itemList={typeList}
            selectedValue={type}
            onValueChange={selectType}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.rowName}>
          <TextRequireComponent text="隊伍數" />
        </View>
        <View style={styles.rowValue}>
          <TextInputComponent
            value={teamNumber}
            placeholder="須大於或等於2"
            inputMode="numeric"
            isError={isTeamNumberError}
            getResult={editTeamNumber} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.rowName}>
          <Text style={stylesColor}>隊伍名稱</Text>
        </View>
        <View style={styles.rowValue}>
          <TextInputComponent
            value={phase.teamList.join("\n")}
            placeholder="一行輸入一隊隊伍"
            multiline={true}
            getResult={editTeamName}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.rowName} />
        <View style={styles.rowValue}>
          <Button
            title="確認"
            disabled={isDisable}
            onPress={pressConfirmButton}
          />
        </View>
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
    paddingBottom: 32
  },

  rowName: {
    flex: 1
  },

  rowValue: {
    flex: 3
  }
})
