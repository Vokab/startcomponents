import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {COLORS_THEME, FONTS} from '../../../constants/theme';
import {SIZES} from '../../../constants/theme';
import Arabic from '../../../../assets/sa.png';
import ShadowEffect from '../../../../assets/shadowImg.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {wrapper} from '../../besmart/firstAlgo';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  finishLoop,
  goNextRedux,
  resetLoopStepRedux,
  updateLoopRoad,
} from '../../../redux/Loop/loop.actions';
import loopReduxTypes from '../../../redux/LoopRedux/loopRedux.types';
import {Loop} from '../../../realm/models/Loop';
import {RealmContext} from '../../../realm/models';
import {PassedWords} from '../../../realm/models/PassedWords';
const {useQuery, useObject, useRealm} = RealmContext;
const mapState = ({loopRedux}) => ({
  loopStep: loopRedux.loopStep,
  loopRoad: loopRedux.loopRoad,
});

const FindIt = props => {
  const realm = useRealm();
  const loop = useQuery(Loop);
  let isDefaultDiscover = loop[0].isDefaultDiscover;
  let isCustomDiscover = loop[0].isCustomDiscover;
  const {loopType} = props;
  const navigation = useNavigation();
  const {loopStep, loopRoad} = useSelector(mapState);
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [words, setWord] = useState('keyboard');
  const [suggWords, setSuggWords] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const word = loopRoad[loopStep].wordObj.wordLearnedLang;
  const passedWord = useObject(PassedWords, loopRoad[loopStep].wordObj._id);
  const containerBg = {
    backgroundColor: darkMode ? COLORS_THEME.bgDark : COLORS_THEME.bgWhite,
  };
  const backgroundColor = {
    backgroundColor: darkMode ? COLORS_THEME.bgWhite : COLORS_THEME.bgDark,
  };
  const color = darkMode ? COLORS_THEME.textWhite : COLORS_THEME.textDark;

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

  const buildSuggWords = async () => {
    // suggestions words are one by cutting one random char and one by adding random char in random place
    let arr = [];
    wordToArray = word.split('');
    wordToArrayForRemove = word.split('');
    randomItem = wordToArray[Math.floor(Math.random() * wordToArray.length)];
    randomIndex = Math.floor(Math.random() * wordToArray.length);
    secRandomIndex = Math.floor(Math.random() * wordToArray.length);

    wordToArray.splice(randomIndex, 0, randomItem);
    wordToArrayForRemove.splice(secRandomIndex, 1);
    // console.log('randomIndex =>', randomIndex);
    // console.log('randomItem =>', randomItem);
    // console.log('secRandomIndex =>', secRandomIndex);
    // console.log('wordToArray =>', wordToArray);
    // console.log('wordToArrayForRemove =>', wordToArrayForRemove);
    arr.push(wordToArray.join(''), wordToArrayForRemove.join(''), word);
    let shuffledArray = await shuffle(arr);
    setSuggWords(shuffledArray);
  };
  const selectItem = item => {
    console.log('selectItem => ', selectedItem);
    setSelectedItem(item);
  };
  useEffect(() => {
    buildSuggWords();
  }, []);

  const checkResponse = () => {
    if (word === selectedItem) {
      try {
        realm.write(() => {
          passedWord.score = passedWord.score + 1;
          passedWord.viewNbr = passedWord.viewNbr + 1;
          if (passedWord.prog < 20) {
            passedWord.prog = passedWord.prog + 1;
          }
        });
      } catch (err) {
        console.error(
          'Failed to update prog and score and viewNbr of this word',
          err.message,
        );
      }
      Alert.alert('Correct Answer');
    } else {
      try {
        realm.write(() => {
          passedWord.score = passedWord.score - 1;
          passedWord.viewNbr = passedWord.viewNbr + 1;
        });
      } catch (err) {
        console.error(
          'Failed to update prog and score and viewNbr of this word',
          err.message,
        );
      }
      Alert.alert('Wrong Answer -- Correct answer is ', word);
      if (loopType != 3 && loopType != 4) {
        updateLoopRoad();
      }
    }
    setSelectedItem(null);
    setIsChecked(true);
  };

  const updateLoopRoad = () => {
    // update redux Loop Road
    loopRoad.push(loopRoad[loopStep]);
    dispatch({
      type: loopReduxTypes.UPDATE_LOOP_ROAD,
      payload: loopRoad,
    });
    // update the right road if its default custom or review
    const newRoad = [];
    loopRoad.forEach(item => {
      const myJSON_Object = JSON.stringify(item);
      newRoad.push(myJSON_Object);
    });

    if (loopType === 0) {
      // it means default
      realm.write(() => {
        loop[0].defaultWordsBagRoad = newRoad;
      });
    } else if (loopType === 1) {
      // it means custom
      realm.write(() => {
        loop[0].customWordsBagRoad = newRoad;
      });
    } else if (loopType === 2) {
      // it means review
      realm.write(() => {
        loop[0].reviewWordsBagRoad = newRoad;
      });
    }
  };

  const loopExit = async () => {
    // reset loopRedux Step
    // reset loopRedux Road
    // reset loopRedux isReady
    dispatch({
      type: loopReduxTypes.RESET_LOOP,
    });
    if (loopType === 0) {
      // update default wordsBag road in the real DB
      realm.write(() => {
        loop[0].stepOfDefaultWordsBag = 0;
      });
    } else if (loopType === 1) {
      realm.write(() => {
        loop[0].stepOfCustomWordsBag = 0;
      });
    } else if (loopType === 2) {
      realm.write(() => {
        loop[0].stepOfReviewWordsBag = 0;
        loop[0].reviewWordsBagRoad = [];
      });
      dispatch({
        type: loopReduxTypes.RESET_REVIEW_BAG_ARRAY,
      });
    }
  };

  const goToNext = () => {
    console.log('goToNext start');
    setIsChecked(false);
    if (loopStep < loopRoad.length - 1) {
      dispatch({
        type: loopReduxTypes.SET_LOOP_STEP,
        payload: loopStep + 1,
      });
      if (loopType === 0) {
        // update default wordsBag step in the realm DB
        realm.write(() => {
          loop[0].stepOfDefaultWordsBag = loop[0].stepOfDefaultWordsBag + 1;
        });
      } else if (loopType === 1) {
        // update custom wordsBag step in the realm DB
        realm.write(() => {
          loop[0].stepOfCustomWordsBag = loop[0].stepOfCustomWordsBag + 1;
        });
      } else if (loopType === 2) {
        // update review wordsBag step in the realm DB
        realm.write(() => {
          loop[0].stepOfReviewWordsBag = loop[0].stepOfReviewWordsBag + 1;
        });
      }
    } else {
      // if custom or default words bag we need to update the isDefaultDiscover variable by add 1
      // console.log('loopStep =>', loopStep);
      if (loopType === 0 && isDefaultDiscover < 3) {
        // add 1 to isDefaultDiscover in the realm DB
        realm.write(() => {
          loop[0].isDefaultDiscover = loop[0].isDefaultDiscover + 1;
        });
      } else if (loopType === 1 && isCustomDiscover < 3) {
        realm.write(() => {
          loop[0].isCustomDiscover = loop[0].isCustomDiscover + 1;
        });
      }
      loopExit().then(navigation.navigate('Home'));
    }
  };

  return (
    <View style={[styles.wrapper, containerBg]}>
      <Image source={ShadowEffect} style={styles.shadowImageBg} />
      <Image source={ShadowEffect} style={styles.shadowImageBg2} />
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
            <Text style={styles.questionText}>Choose what mean</Text>
          </View>
        </View>
      )}
      <View
        style={[
          styles.nativeWordBox,
          {backgroundColor: darkMode ? '#00000040' : '#ffffff50'},
        ]}>
        <View style={styles.nativeWordBoxContent}>
          <Text style={[styles.nativeWordTxt, {color: color}]}>
            {loopRoad[loopStep].wordObj.wordNativeLang}
          </Text>
          <Image source={Arabic} style={styles.nativeFlag} />
        </View>
      </View>
      <View style={styles.cardsResponseContainer}>
        {suggWords.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.suggCard,
                {
                  backgroundColor:
                    selectedItem === item ? '#FF4C00' : '#1D1E3750',
                },
              ]}
              onPress={() => {
                selectItem(item);
              }}>
              <Text style={styles.suggCardText}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.blurParrent}>
          {!isChecked ? (
            <TouchableOpacity
              style={[styles.btnGo, backgroundColor]}
              onPress={() => checkResponse()}>
              <Text style={styles.checkBtnTxt}>check</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.btnGo, backgroundColor]}
              onPress={() => goToNext()}>
              <Text style={styles.checkBtnTxt}>Next</Text>
            </TouchableOpacity>
          )}
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

export default FindIt;

const styles = StyleSheet.create({
  suggCardText: {
    fontFamily: FONTS.enFontFamilyBold,
    color: '#fff',
    fontSize: 20,
  },
  suggCard: {
    width: '80%',
    height: 70,
    backgroundColor: '#1D1E3750',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FF4C0030',
    borderWidth: 5,
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
  cardsResponseContainer: {
    width: '100%',
    // marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 6,
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
    opacity: 0.3,
    position: 'absolute',
    top: SIZES.height / 2 - 200,
    left: -200,
    // backgroundColor: 'red',
  },
  shadowImageBg2: {
    width: 300,
    height: 400,
    opacity: 0.25,
    position: 'absolute',
    top: -200,
    right: -150,
    // backgroundColor: 'red',
  },
});
