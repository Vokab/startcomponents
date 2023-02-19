import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {COLORS_THEME, FONTS} from '../../../constants/theme';
import {SIZES} from '../../../constants/theme';
import Arabic from '../../../../assets/sa.png';
import ShadowEffect from '../../../../assets/shadowImg.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {wrapper} from '../../../besmart/firstAlgo';
import {useDispatch, useSelector} from 'react-redux';
import {
  finishLoop,
  goNextRedux,
  resetLoopStepRedux,
  updateLoopRoad,
} from '../../../redux/Loop/loop.actions';
import {useNavigation} from '@react-navigation/native';

const mapState = ({user, words, loop}) => ({
  loopStep: loop.loopStep,
  loopRoad: loop.loopRoad,
  loopId: loop.loopId,
  isDefaultDiscover: user.isDefaultDiscover,
  isCustomDiscover: user.isCustomDiscover,
});

const Cards = () => {
  const navigation = useNavigation();
  const {loopStep, loopRoad, loopId, isDefaultDiscover, isCustomDiscover} =
    useSelector(mapState);
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [word, setWord] = useState('');
  const [wordCards, setWordCards] = useState([]);
  const [respArray, setRespArray] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const wordVar = loopRoad[loopStep].wordObj.wordLearnedLang;
  const cardsPos = [
    {bottom: '50%', left: '20%'},
    {bottom: '30%', left: '40%'},
    {bottom: '60%', left: '60%'},
    {bottom: '20%', left: '70%'},
    {bottom: '10%', left: '20%'},
    {bottom: '00%', left: '50%'},
    {bottom: '70%', left: '40%'},
    {bottom: '50%', left: '80%'},
    {bottom: '70%', left: '5%'},
    {bottom: '80%', left: '80%'},
  ];
  const containerBg = {
    backgroundColor: darkMode ? COLORS_THEME.bgDark : COLORS_THEME.bgWhite,
  };
  const backgroundColor = {
    backgroundColor: darkMode ? COLORS_THEME.bgWhite : COLORS_THEME.bgDark,
  };
  const color = darkMode ? COLORS_THEME.textWhite : COLORS_THEME.textDark;

  useEffect(() => {
    // let wordVariable = loopRoad[loopStep].wordObj.wordLearnedLang;
    const getData = async () => {
      const data = await wrapper(wordVar);
      console.log('cards =>', data);
      setWordCards(data);
    };
    getData();
  }, [loopStep]);
  const toogleSugResp = myItem => {
    // showOrNot true => sugg card
    // showOrNot false => response card
    console.log('myItem of word =>', myItem);
    console.log('old wordcards =>', wordCards);
    const newAr = [];
    wordCards.forEach(item => {
      if (item.wordId === myItem.wordId) {
        item.showOrNot = !item.showOrNot;
        if (!myItem.showOrNot) {
          addToRespArray(myItem);
          console.log('now we need to add it to respo array');
        } else {
          setRespArray([]);
          setRespArray(
            respArray.filter(itemi => itemi.wordId !== myItem.wordId),
          );
          console.log('now we need to remove it to respo array');
        }
      }
      newAr.push(item);
    });
    console.log('new wordcards =>', newAr);
    // addToRespArray(myItem);
    setWordCards(newAr);
  };

  const addToRespArray = item => {
    const newAr = [];
    setRespArray([...respArray, item]);
  };

  const checkResponse = () => {
    let respoArToString = '';
    respArray.forEach(item => {
      respoArToString = respoArToString + item.word;
    });
    if (wordVar === respoArToString) {
      setRespArray([]);
      alert(`Correct Answer ${respoArToString}`);
    } else {
      alert(`Wrong answer : ${respoArToString}, Correct answer is: ${wordVar}`);
      setRespArray([]);
      if (loopId != 3 && loopId != 4) {
        dispatch(updateLoopRoad(loopRoad, loopStep, loopId));
      }
    }

    setIsChecked(true);
  };

  const resetLoopStep = async () => {
    console.log('resetLoopStep start');
    dispatch(resetLoopStepRedux());
  };

  const goToNext = () => {
    console.log('goToNext start');
    setIsChecked(false);
    if (loopStep < loopRoad.length - 1) {
      dispatch(goNextRedux(loopStep));
    } else {
      // if custom or default words bag we need to update the isDefaultDiscover variable by add 1
      // console.log('loopStep =>', loopStep);
      if (loopId === 0 && isDefaultDiscover < 3) {
        dispatch(finishLoop(loopId));
      } else if (loopId === 1 && isCustomDiscover < 3) {
        dispatch(finishLoop(loopId));
      }
      resetLoopStep().then(navigation.navigate('Home'));
    }
  };

  useEffect(() => {
    console.log(
      'we are in the step number',
      loopRoad[loopStep].wordObj.wordLearnedLang,
      // setWord(loopRoad[loopStep].wordObj.wordLearnedLang),
    );
  }, [loopStep]);

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
            <Text style={styles.questionText}>Build with cards what mean</Text>
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
        <View style={styles.cardsResponse}>
          {respArray.map((myCard, index) => {
            console.log('this index is =>', myCard.showOrNot);

            return (
              <TouchableOpacity
                key={index}
                style={[styles.cardRespStyle]}
                onPress={() => toogleSugResp(myCard)}>
                <Text style={[styles.cardRespTxt]}>{myCard.word}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.cardsContainer}>
        {wordCards.map((myCard, index) => {
          console.log('this index is =>', myCard.showOrNot);
          if (myCard.showOrNot) {
            return (
              <TouchableOpacity
                key={index}
                style={[styles.blurParrentCard, cardsPos[index]]}
                onPress={() => toogleSugResp(myCard)}>
                <Image
                  source={ShadowEffect}
                  style={styles.blurEffectImg}
                  blurRadius={50}
                  resizeMode="stretch"
                />
                <View style={[styles.cardBtn, backgroundColor]}>
                  <Text style={[styles.checkBtnTxt, styles.cardBtnTxt]}>
                    {myCard.word}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
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

export default Cards;

const styles = StyleSheet.create({
  cardRespTxt: {
    fontSize: 18,
    color: '#fff',
    fontFamily: FONTS.enFontFamilyBold,
  },
  cardRespStyle: {
    backgroundColor: '#FFFFFF20',
    height: 40,
    marginHorizontal: 2,
    marginTop: 15,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsResponse: {
    backgroundColor: 'rgba(29,30,55,.40)',
    width: '90%',
    height: 70,
    borderWidth: 2,
    borderColor: '#FF4C00',
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  foreignFlag: {
    width: 20,
    height: 20,
    // backgroundColor: 'red',
    marginRight: 20,
  },
  foreignWordBoxContent: {},
  inputBoxSubBox: {
    width: '100%',
    // justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  input: {
    width: '80%',
    // backgroundColor: 'red',
    color: '#fff',
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: FONTS.enFontFamilyMedium,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
  },
  checkBtnTxt: {
    fontFamily: FONTS.enFontFamilyBold,
    color: '#000',
    fontSize: 24,
  },
  cardBtnTxt: {
    fontFamily: FONTS.enFontFamilyBold,
    color: '#000',
    fontSize: 20,
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
  blurParrentCard: {
    position: 'absolute',
    // backgroundColor: 'blue',

    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurEffectImg: {
    position: 'absolute',
    top: '-40%',
    left: '-40%',
    width: '180%',
    height: '180%',
    // backgroundColor: 'red',
    zIndex: -1,
    opacity: 1,
  },
  btnGoTxt: {
    color: '#1D1E37',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardBtn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    // backgroundColor: '#fff',  // Changed To DarkLight Code
    // marginTop: 20,
    justifyContent: 'center',
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

  cardsContainer: {
    // marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // //***************
    // backgroundColor: '#00bb0c',
    // width: '100%',
    // //***************
  },

  cardsResponseContainer: {
    width: '100%',
    // marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
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

  wordImg: {
    width: '100%',
    height: '100%',
    // //***************
    // backgroundColor: '#00e2f7',
    // width: '100%',
    // //***************
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
  conatiner: {},
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
