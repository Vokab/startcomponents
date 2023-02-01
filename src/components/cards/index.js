import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {COLORS_THEME, FONTS} from '../../constants/theme';
import {SIZES} from '../../constants/theme';
import Arabic from '../../../assets/sa.png';
import English from '../../../assets/united-states.png';
import ShadowEffect from '../../../assets/shadowImg.png';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {wrapper} from '../../besmart/firstAlgo';

const Cards = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [text, onChangeText] = React.useState('');
  const [word, setWord] = useState('oussamaabdallahinccccccc');
  const [wordCards, setWordCards] = useState([]);
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
      const data = await wrapper('oussama');
      wrapper('oussamaaaaa').then(res => {
        setWordCards(res);
      });
    };
    getData().then(() => {
      console.log(
        'wordCardswordCardswordCardswordCardswordCardswordCardswordCardswordCardswordCardswordCardswordCardswordCardswordCardswordCardswordCardswordCards',
        wordCards,
      );
    });
  }, []);

  //   useEffect(() => {
  //     const keyboardDidShowListener = Keyboard.addListener(
  //       'keyboardDidShow',
  //       () => {
  //         setKeyboardVisible(true);
  //       },
  //     );
  //     const keyboardDidHideListener = Keyboard.addListener(
  //       'keyboardDidHide',
  //       () => {
  //         setKeyboardVisible(false);
  //       },
  //     );

  //     return () => {
  //       keyboardDidHideListener.remove();
  //       keyboardDidShowListener.remove();
  //     };
  //   }, []);

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
      <View style={styles.cardsResponseContainer}>
        <View style={styles.cardsResponse}></View>
      </View>

      <View style={styles.cardsContainer}>
        {wordCards.map((myCard, index) => {
          console.log('this index is =>', index);
          return (
            <TouchableOpacity key={index} style={[styles.blurParrentCard]}>
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
        })}
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.blurParrent}>
          {/* <Image
              source={ShadowEffect}
              style={styles.blurEffectImg}
              blurRadius={50}
              resizeMode="stretch"
            /> */}
          <TouchableOpacity
            style={[styles.btnGo, backgroundColor]}
            onPress={() => checkWord()}>
            {/* <Fontisto
                name="check"
                size={30}
                color={darkMode ? COLORS_THEME.bgDark : COLORS_THEME.bgWhite}
              /> */}
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

export default Cards;

const styles = StyleSheet.create({
  cardsResponse: {
    backgroundColor: 'rgba(29,30,55,.40)',
    width: '90%',
    height: 70,
    borderWidth: 2,
    borderColor: '#FF4C00',
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
    // position: 'absolute',
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
