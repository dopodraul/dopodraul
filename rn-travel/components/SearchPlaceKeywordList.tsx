import {
  View,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

import {
  useContext,
  useState,
  useEffect
} from 'react';

import BackComponent from './BackComponent';

import {
  keywordJson,
  getSpotName,
  AppContext
} from '../utils/common';

const DropdownComponent = ({
  item,
  stylesColor,
  setInput
}: {
  item: string;
  stylesColor: object;
  setInput: (input: string) => void;
}) => {
  const pressDropdown = () => {
    setInput(item);
  }

  return (
    <TouchableOpacity style={[styles.dropdownItem, stylesColor]} onPress={pressDropdown}>
      <Text style={stylesColor}>{item}</Text>
    </TouchableOpacity>
  );
}

const ResultComponent = ({
  item,
  stylesColor,
  stylesBorder,
  addSearchKeyword
}: {
  item: string;
  stylesColor: object;
  stylesBorder: object;
  addSearchKeyword: () => void;
}) => {
  const text = getSpotName(item);
  const { setSearchSpot, getSpotIcon } = useContext(AppContext);
  const icon = getSpotIcon(item, 16);

  const pressResult = () => {
    addSearchKeyword();
    setSearchSpot(item);
  }

  return (
    <TouchableOpacity style={[styles.resultItem, stylesBorder]} onPress={pressResult}>
      {icon}
      <Text style={stylesColor}>{text}</Text>
    </TouchableOpacity>
  );
}

export default function SearchPlaceKeywordList({ t }: { t: (key: string) => string; }) {
  const {
    setSearchType,
    searchKeyword,
    setSearchKeyword,
    getStyle
  } = useContext(AppContext);

  const stylesColor = getStyle();
  const stylesBorder = { borderColor: stylesColor.color };
  const [input, setInput] = useState('');
  const [resultList, setResultList] = useState<string[]>([]);

  useEffect(() => {
    if (input) {
      const inputLower = input.toLowerCase();
      const inputLength = input.length;
      const resultObj: {[spot: string]: number} = {};

      Object.entries(keywordJson).forEach(([name, spotObj]) => {
        if (name.indexOf(inputLower) !== -1) {
          Object.keys(spotObj).forEach((spot) => {
            const diff = name.length - inputLength;

            if (!resultObj[spot]) {
              resultObj[spot] = Number.MAX_VALUE;
            }

            if (diff < resultObj[spot]) {
              resultObj[spot] = diff;
            }
          });
        }
      });

      setResultList(
        Object.entries(resultObj)
          .sort(([_l, lhs], [_r, rhs]) => lhs - rhs)
          .map(([spot, diff]) => spot)
      );
    } else {
      setResultList([]);
    }
  }, [input]);

  const placeholder = t('inputKeyword');

  const onChangeText = (text: string) => {
    setInput(text);
  }

  const addSearchKeyword = () => {
    if (input && resultList[0]) {
      const newSearchKeyword = [ ...[], ...searchKeyword ];
      const index = searchKeyword.indexOf(input);

      if (index !== -1) {
        newSearchKeyword.splice(index, 1);
      }

      newSearchKeyword.unshift(input);
      setSearchKeyword(newSearchKeyword);
    }
  }

  const title = t('keywordSearch');

  const pressBack = () => {
    setSearchType('');
  }

  const dropdownContent = searchKeyword[0] && !input ?
    <View style={[styles.dropdownContainer, stylesBorder]}>
    <Text style={[styles.dropdownText, stylesColor]}>{t('recentKeyword')}</Text>
    <ScrollView>
      <FlatList
        data={searchKeyword}
        renderItem={({item}) => (
          <DropdownComponent
            item={item}
            stylesColor={stylesColor}
            setInput={setInput}
          />
        )}
      />
    </ScrollView>
  </View> :
  <View />;

  return ([
    <BackComponent title={title} pressBack={pressBack} />,
    <View style={styles.container}>
      <TextInput
        style={[styles.textInput, stylesColor, stylesBorder]}
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={input}
        onChangeText={onChangeText}
        onEndEditing={addSearchKeyword}
      />
      {dropdownContent}
      <ScrollView>
        <FlatList
          data={resultList}
          renderItem={({ item }) => (
            <ResultComponent
              item={item}
              stylesColor={stylesColor}
              stylesBorder={stylesBorder}
              addSearchKeyword={addSearchKeyword} />
          )}
        />
      </ScrollView>
    </View>
  ]);
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },

  textInput: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 16
  },

  dropdownContainer: {
    padding: 16,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 16
  },

  dropdownText: {
    paddingBottom: 8
  },

  dropdownItem: {
    paddingTop: 8,
    paddingBottom: 8
  },

  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1
  }
});
