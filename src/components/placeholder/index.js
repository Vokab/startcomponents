import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {COLORS_THEME, FONTS} from '../../constants/theme';
import {SIZES} from '../../constants/theme';
import Arabic from '../../../assets/sa.png';
import ShadowEffect from '../../../assets/shadowImg.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {wrapper} from '../../besmart/firstAlgo';

const PlaceHolderComp = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [word, setWord] = useState('Success');
  const [wordCards, setWordCards] = useState([]);
  const [respArray, setRespArray] = useState([]);
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
    const getData = async () => {
      const data = await wrapper(word);
      console.log('cards =>', data);
      setWordCards(data);
    };
    getData();
  }, []);
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
    if (word === respoArToString) {
      alert(`Correct Answer ${respoArToString}`);
    } else {
      alert(`Wrong answer : ${respoArToString}, Correct answer is: ${word}`);
    }
  };

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
          <Text style={[styles.nativeWordTxt, {color: color}]}>نجاح</Text>
          <Image source={Arabic} style={styles.nativeFlag} />
        </View>
      </View>
      <View style={styles.cardsResponseContainer}></View>
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

export default PlaceHolderComp;

const styles = StyleSheet.create({
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
    opacity: 0.25,
    position: 'absolute',
    top: SIZES.height / 2 - 200 - 50,
    left: SIZES.width / 2 - 200,
    // backgroundColor: 'red',
  },
});
