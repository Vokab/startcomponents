import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {COLORS_THEME, FONTS} from '../../constants/theme';
import {SIZES} from '../../constants/theme';
import Arabic from '../../../assets/sa.png';
import ShadowEffect from '../../../assets/shadowImg.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {wrapper} from '../../besmart/firstAlgo';

const MissedChar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [word, setWord] = useState('Success');
  const [wordMissed, setWordMissed] = useState();
  const [missedChars, setMissedChars] = useState([]);
  const [arrayOfSuggChars, setArayOfSuggChars] = useState([]);
  const [myIndex, setMyIndex] = useState(0);
  const containerBg = {
    backgroundColor: darkMode ? COLORS_THEME.bgDark : COLORS_THEME.bgWhite,
  };
  const backgroundColor = {
    backgroundColor: darkMode ? COLORS_THEME.bgWhite : COLORS_THEME.bgDark,
  };
  const color = darkMode ? COLORS_THEME.textWhite : COLORS_THEME.textDark;

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  const shuffle = async array => {
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    // setShuffledArray(array);
    return array;
  };
  const buildTheMissedWord = () => {
    let newObj = {};
    let secNewObj = {};
    const arr = [];
    originalWord = word.split('');
    stateWord = word.split('');
    wordToArray = word.split('');
    randomIndex = Math.floor(Math.random() * wordToArray.length); // for getting random index
    wordToArray.splice(randomIndex, 1); // for remove first one char
    secRandomIndex = Math.floor(Math.random() * wordToArray.length);
    wordToArray.splice(secRandomIndex, 1); // for remove second one char
    console.log('first randomIndex is =>', randomIndex);
    console.log('second secRandomIndex is =>', secRandomIndex);
    console.log('final word is =>', wordToArray);
    newObj.char = originalWord[randomIndex];
    newObj.index = randomIndex;
    arr.push(newObj);
    stateWord[randomIndex] = '_';
    if (secRandomIndex >= randomIndex) {
      secNewObj.char = originalWord[secRandomIndex + 1];
      secNewObj.index = secRandomIndex + 1;
      arr.push(secNewObj);
      stateWord[secRandomIndex + 1] = '_';
    } else {
      secNewObj.char = originalWord[secRandomIndex];
      secNewObj.index = secRandomIndex;
      arr.push(secNewObj);
      stateWord[secRandomIndex] = '_';
    }
    console.log('stateWordarr =>', stateWord);
    setMissedChars(arr);
    setWordMissed(stateWord);
    // wordToArrayForRemove = word.split('');
    // randomIndex = Math.floor(Math.random() * wordToArray.length);
    // wordToArray.splice(randomIndex, 0, randomItem);
    // secRandomIndex = Math.floor(Math.random() * wordToArray.length);
    const arr2 = [];
    for (let i = 0; i < 8; i++) {
      const randomCharacter =
        alphabet[Math.floor(Math.random() * alphabet.length)];
      arr2.push(randomCharacter);
    }
    arr.forEach(item => {
      arr2.push(item.char);
    });
    shuffle(arr2);
    setArayOfSuggChars(arr2);
    console.log('arr =>', arr2);
  };

  const fillChar = item => {
    // console.log('myIndex', myIndex);
    // console.log('missedChars[myIndex].index', missedChars);
    const ar = wordMissed;
    ar[wordMissed.indexOf('_')] = item;
    setWordMissed(ar);
    setMyIndex(myIndex + 1);
    // missedChars
    // wordMissed
  };
  const checkResponse = () => {
    // console.log('wordMissed =>', wordMissed.join(''));
    // console.log('word =>', word);
    // console.log('wordMissed.length =>', wordMissed.length);
    // console.log('word.length =>', word.length);
    if (word === wordMissed.join('')) {
      Alert.alert('Correct Answer');
    } else {
      Alert.alert('Wrong Answer -- Correct answer is ', word);
    }
  };
  useEffect(() => {
    buildTheMissedWord();
  }, []);

  return (
    <View style={[styles.wrapper, containerBg]}>
      <Image source={ShadowEffect} style={styles.shadowImageBg} />
      {!isKeyboardVisible && (
        <View style={styles.header}>
          <TouchableOpacity>
            <AntDesign name="exclamationcircleo" size={18} color={color} />
          </TouchableOpacity>
        </View>
      )}

      {!isKeyboardVisible && (
        <View style={styles.questionWrapper}>
          <View style={styles.questionContent}>
            <MaterialCommunityIcons
              name="lightbulb-outline"
              size={30}
              color={'#D2FF00'}
            />
            <Text style={styles.questionText}>
              Complete the missed charachters
            </Text>
          </View>
        </View>
      )}
      <View
        style={[
          styles.nativeWordBox,
          {backgroundColor: darkMode ? '#00000040' : '#ffffff50'},
        ]}>
        <View style={styles.nativeWordBoxContent}>
          <Text style={[styles.nativeWordTxt, {color: color}]}>نجاح</Text>
          <Image source={Arabic} style={styles.nativeFlag} />
        </View>
      </View>
      <View style={styles.cardsResponseContainer}>
        <View style={styles.cardsRes}>
          {wordMissed?.map((item, index) => {
            if (index === wordMissed.indexOf('_')) {
              return (
                <Text
                  key={index}
                  style={[styles.cardsResText, {color: '#FF4C00'}]}>
                  {item}
                </Text>
              );
            }
            return (
              <Text key={index} style={styles.cardsResText}>
                {item}
              </Text>
            );
          })}
        </View>
      </View>
      <View style={styles.suggCardsContainer}>
        <View style={styles.suggCardsSubContainer}>
          {arrayOfSuggChars.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                disabled={wordMissed.indexOf('_') === -1}
                style={styles.suggSingleCard}
                onPress={() => {
                  fillChar(item);
                }}>
                <Text style={styles.suggSingleCardTxt}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.blurParrent}>
          <TouchableOpacity
            style={[styles.btnGo, backgroundColor]}
            onPress={() => checkResponse()}>
            <Text style={styles.checkBtnTxt}>check</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={[styles.progressBarParent, backgroundColor]}>
          <View style={styles.progressBarChild}></View>
        </View>
      </View>
    </View>
  );
};

export default MissedChar;

const styles = StyleSheet.create({
  suggCardsSubContainer: {
    width: '80%',
    // height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggSingleCard: {
    backgroundColor: '#fff',
    width: 40,
    marginHorizontal: '2.5%',
    marginVertical: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FF4C00',
    borderWidth: 1,
  },
  suggSingleCardTxt: {
    color: '#000',
    fontSize: 18,
    fontFamily: FONTS.enFontFamilyBold,
  },
  cardsResText: {
    color: '#fff',
    fontFamily: FONTS.enFontFamilyBold,
    fontSize: 24,
    letterSpacing: 4,
  },
  cardsRes: {
    backgroundColor: '#1D1E3775',
    width: '80%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkBtnTxt: {
    fontFamily: FONTS.enFontFamilyBold,
    color: '#000',
    fontSize: 24,
  },
  questionWrapper: {
    flex: 1,
    width: '100%',
  },
  questionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingHorizontal: 20,
    height: '100%',
    width: '100%',
  },
  questionText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
    marginRight: 10,
    fontFamily: FONTS.enFontFamilyBold,
  },

  progressBarChild: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 30,
    height: 8,
    backgroundColor: '#FF4C00',
    borderRadius: 6,
  },
  progressBarParent: {
    position: 'relative',
    width: 80,
    height: 8,
    // backgroundColor: '#FFFFFF',   // Changed To DarkLight Code
    borderRadius: 6,
  },
  footer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 10,
    //***************
    width: '100%',
    // backgroundColor: 'yellow',
    //***************
  },
  btnContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor: 'blue',
    // marginTop: 40,
    flex: 2,
    // //***************
    // backgroundColor: 'red',
    // width: '100%',
    // //***************
  },
  blurParrent: {
    position: 'relative',
    // backgroundColor: 'blue',
    width: '100%',
    height: 70,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnGo: {
    width: '80%',
    height: 60,
    borderRadius: 10,
    // backgroundColor: '#fff',  // Changed To DarkLight Code
    // marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggCardsContainer: {
    width: '100%',
    // marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
    // //***************
    // backgroundColor: '#23af0d',
    // width: '100%',
    // //***************
  },
  cardsResponseContainer: {
    width: '100%',
    // marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
    // //***************
    // backgroundColor: '#a79d08',
    // width: '100%',
    // //***************
  },
  nativeWordTxt: {
    // color: '#fff',  // Changed To DarkLight Code
    fontSize: 35,
    // fontWeight: 'bold',
    fontFamily: 'Nunito-SemiBold',
  },
  nativeWordBoxContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  nativeFlag: {
    width: 26,
    height: 26,
    // backgroundColor: 'red',
    // marginRight: 10,
    marginLeft: 15,
  },
  nativeWordBox: {
    width: '100%',
    // height: 80,
    flex: 1.5,
    // //***************
    // backgroundColor: '#ce3207',
    // width: '100%',
    // //***************
    // backgroundColor: '#00000040',  // Changed To DarkLight Code
    marginTop: 20,
  },
  header: {
    width: '100%',
    height: 40,
    flex: 0.5,
    // //***************
    // backgroundColor: '#a300c4',
    // width: '100%',
    // //***************
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  wrapper: {
    // justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'blue',
    // height: windowHeight,
    flex: 12,
    width: '100%',
    // backgroundColor: '#181920',  // Changed To DarkLight Code
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowImageBg: {
    width: 400,
    height: 500,
    opacity: 0.25,
    position: 'absolute',
    top: SIZES.height / 2 - 200 - 50,
    left: SIZES.width / 2 - 200,
    // backgroundColor: 'red',
  },
});
