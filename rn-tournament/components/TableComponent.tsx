import {
  View,
  ScrollView,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native'

import {
  useState,
  useRef,
  useEffect,
  useContext,
  ReactNode
} from 'react'

import {
  Table,
  Rows,
  Row,
  Col
} from 'react-native-reanimated-table'

import { AppContext } from '../utils/common'

export default function TableComponent({
  data,
  width = 32,
  height = 32,
  widthArr = [],
  heightArr = [],
  isBorder = false
}: {
  data: (string | ReactNode)[][],
  width?: number,
  height?: number,
  widthArr?: number[],
  heightArr?: number[],
  isBorder?: boolean
}) {
  const [scrollX, setScrollX] = useState(0)
  const scrollViewRefHeadX = useRef<ScrollView>(null)
  const scrollViewRefBodyX = useRef<ScrollView>(null)
  const [scrollY, setScrollY] = useState(0)
  const scrollViewRefHeadY = useRef<ScrollView>(null)
  const scrollViewRefBodyY = useRef<ScrollView>(null)
  const { getStyle } = useContext(AppContext)
  const stylesColor = getStyle()
  const stylesBorder = isBorder ? { borderWidth: 1, borderColor: stylesColor.color } : {}

  const onScrollX = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollX(event.nativeEvent.contentOffset.x)
  }

  const onScrollY = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(event.nativeEvent.contentOffset.y)
  }

  useEffect(() => {
    const scrollResult = { x: scrollX, animated: false }

    if (scrollViewRefHeadX.current) {
      scrollViewRefBodyX.current.scrollTo(scrollResult)
    }

    if (scrollViewRefBodyX.current) {
      scrollViewRefHeadX.current.scrollTo(scrollResult)
    }
  }, [scrollViewRefHeadX, scrollViewRefBodyX, scrollX])

  useEffect(() => {
    const scrollResult = { y: scrollY, animated: false }

    if (scrollViewRefHeadY.current) {
      scrollViewRefBodyY.current.scrollTo(scrollResult)
    }

    if (scrollViewRefBodyY.current) {
      scrollViewRefHeadY.current.scrollTo(scrollResult)
    }
  }, [scrollViewRefHeadY, scrollViewRefBodyY, scrollY])

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Table borderStyle={stylesBorder}>
          <Row
            data={[data[0][0]]}
            widthArr={[width]}
            height={height}
          />
        </Table>
        <ScrollView
          horizontal={true}
          ref={scrollViewRefHeadX}
          onScrollEndDrag={onScrollX}
        >
          <Table borderStyle={stylesBorder}>
            <Row
              data={data[0].slice(1)}
              widthArr={widthArr}
              height={height}
            />
          </Table>
        </ScrollView>
      </View>
      <View style={styles.row}>
        <View style={{ width: width + 1 }}>
          <ScrollView
            ref={scrollViewRefHeadY}
            onScrollEndDrag={onScrollY}
          >
            <Table borderStyle={stylesBorder}>
              <Col
                data={data.map(list => list[0]).slice(1)}
                width={width}
                heightArr={heightArr}
              />
            </Table>
          </ScrollView>
        </View>
        <ScrollView
          ref={scrollViewRefBodyY}
          onScrollEndDrag={onScrollY}
        >
          <ScrollView
            horizontal={true}
            ref={scrollViewRefBodyX}
            onScrollEndDrag={onScrollX}
          >
            <Table borderStyle={stylesBorder}>
              <Rows
                data={data.slice(1).map(list => list.slice(1))}
                widthArr={widthArr}
                heightArr={heightArr}
              />
            </Table>
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  row: {
    flexDirection: 'row'
  }
})
