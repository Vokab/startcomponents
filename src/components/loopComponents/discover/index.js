import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import ShadowEffect from '../../../../assets/shadowImg.png';
import Suceess from '../../../../assets/suceess.png';
import Arabic from '../../../../assets/sa.png';
import English from '../../../../assets/united-states.png';
import Icon from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS_THEME} from '../../../constants/theme';
import {SIZES} from '../../../constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {
  goNextRedux,
  resetLoopStepRedux,
} from '../../../redux/Loop/loop.actions';

const mapState = ({user, words, loop}) => ({
  loopStep: loop.loopStep,
  loopRoad: loop.loopRoad,
});

const Discover = () => {
  const {loopStep, loopRoad} = useSelector(mapState);
  const dispatch = useDispatch();
  var wordSpellVariable = '';
  const [darkMode, setDarkMode] = useState(true);
  const [wordSpell, setWordSpell] = useState('');
  const [word, setWord] = useState(loopRoad[loopStep].wordObj.wordLearnedLang);
  loopRoad[loopStep].wordObj.wordLearnedLang;
  const wordVar = loopRoad[loopStep].wordObj.wordLearnedLang;
  const displayChar = () => {
    if (wordSpellVariable.length === wordVar.length) {
      // console.log('yess');
      setWordSpell('');
      wordSpellVariable = '';
    } else {
      // console.log('Else', wordSpellVariable.length);
      wordSpellVariable = wordSpellVariable + wordVar[wordSpellVariable.length];
    }
    setWordSpell(wordSpellVariable);
    // console.log('hi mela', wordSpellVariable, 'wordSpell =>', wordSpell);
  };

  useEffect(() => {
    const interval = setInterval(displayChar, 800);
    return () => clearInterval(interval);
  }, []);

  const containerBg = {
    backgroundColor: darkMode ? COLORS_THEME.bgDark : COLORS_THEME.bgWhite,
  };
  const backgroundColor = {
    backgroundColor: darkMode ? COLORS_THEME.bgWhite : COLORS_THEME.bgDark,
  };
  const color = darkMode ? COLORS_THEME.textWhite : COLORS_THEME.textDark;
  const resetLoopStep = async () => {
    console.log('resetLoopStep start');
    dispatch(resetLoopStepRedux());
  };

  const gotoNext = () => {
    console.log('gotNext start');
    if (loopStep < loopRoad.length) {
      dispatch(goNextRedux(loopStep));
    } else {
      resetLoopStep().then(navigation.navigate('Home'));
    }
  };

  return (
    // <ScrollView style={styles.conatiner}>
    <View style={[styles.wrapper, containerBg]}>
      <Image source={ShadowEffect} style={styles.shadowImageBg} />
      <View style={styles.header}>
        <TouchableOpacity>
          <AntDesign name="exclamationcircleo" size={18} color={color} />
        </TouchableOpacity>
      </View>
      <View style={styles.wordImgWrapper}>
        <Image
          resizeMethod={'resize'}
          resizeMode="contain"
          source={Suceess}
          style={styles.wordImg}
        />
      </View>

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
      <View style={styles.foreignWordBox}>
        <View style={styles.foreignWordBoxContent}>
          <Image source={English} style={styles.foreignFlag} />
          <Text style={[styles.foreignWordTxt, {color: color}]}>
            {loopRoad[loopStep].wordObj.wordLearnedLang}
          </Text>
        </View>
        <View style={styles.foreignSpellingBox}>
          <Text style={styles.foreignSpellingTxt}>kənˈsensəs</Text>
          <TouchableOpacity>
            <Icon name="speaker" size={40} color="#FF4C00" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.typingAnimBox}>
        <View style={styles.typingAnimSubBox}>
          <Text style={[styles.typingText, {color: color}]}>{wordSpell}</Text>
          <View style={[styles.typingIndicator, backgroundColor]}></View>
        </View>
      </View>
      <View style={styles.btnContainer}>
        {/* <Text style={styles.btnGoTxt}>GO</Text> */}
        <View style={styles.blurParrent}>
          <Image
            source={ShadowEffect}
            style={styles.blurEffectImg}
            blurRadius={50}
          />
          <TouchableOpacity
            style={[styles.btnGo, backgroundColor]}
            onPress={() => {
              gotoNext();
            }}>
            <Fontisto
              name="check"
              size={30}
              color={darkMode ? COLORS_THEME.bgDark : COLORS_THEME.bgWhite}
            />
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

export default Discover;

const styles = StyleSheet.create({
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
    alignItems: 'center',
    // backgroundColor: 'blue',
    // marginTop: 40,
    flex: 2,
    // //***************
    // backgroundColor: 'red',
    // width: '100%',
    ////***************
  },
  blurParrent: {
    position: 'relative',
    // backgroundColor: 'blue',
    width: 70,
    height: 70,
  },
  blurEffectImg: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    // backgroundColor: 'red',
    zIndex: -1,
    opacity: 0.7,
  },
  btnGoTxt: {
    color: '#1D1E37',
    fontSize: 22,
    fontWeight: 'bold',
  },
  btnGo: {
    width: 70,
    height: 70,
    borderRadius: 10,
    // backgroundColor: '#fff',  // Changed To DarkLight Code
    // marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: '#FF4C00',
    // // borderWidth: 5,
    // // borderColor: '#ff4d0025',
    // shadowOffset: {
    //   width: 0,
    //   height: 12,
    // },
    // shadowOpacity: 0.58,
    // shadowRadius: 16.0,

    // elevation: 24,
    // // zIndex: 24,
  },

  typingIndicator: {
    width: 5,
    height: '80%',
    marginLeft: 5,
    // backgroundColor: '#fff', // Changed To DarkLight Code
  },
  typingAnimSubBox: {
    height: '70%',
    width: '80%',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderColor: '#FF4C00',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  typingAnimBox: {
    // marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    width: '100%',
    // //***************
    // backgroundColor: '#00bb0c',
    // width: '100%',
    // //***************
  },
  typingText: {
    color: '#fff',
    fontSize: 30,
    // fontWeight: 'bold',
    fontFamily: 'Nunito-SemiBold',
  },
  foreignSpellingBox: {
    flexDirection: 'row',
    // marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foreignSpellingTxt: {
    color: '#FF4C00',
    fontSize: 30,
    // fontWeight: 'bold',
    marginRight: 10,
    fontFamily: 'Nunito-Bold',
  },
  foreignWordTxt: {
    // color: '#fff',  // Changed To DarkLight Code
    fontSize: 55,
    // fontWeight: 'bold',
    fontFamily: 'Nunito-Bold',
    // Nunito-SemiBold
    // Nunito-Regular
    // Nunito-Medium
    // Nunito-Black
  },
  foreignFlag: {
    width: 20,
    height: 20,
    // backgroundColor: 'red',
    marginRight: 20,
  },
  foreignWordBoxContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginBottom: 10,
  },
  foreignWordBox: {
    width: '100%',
    // marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4.5,
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
  },
  nativeFlag: {
    width: 40,
    height: 40,
    // backgroundColor: 'red',
    marginRight: 10,
    marginLeft: 20,
  },
  nativeWordBox: {
    width: '100%',
    // height: 80,
    flex: 2,
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
  wordImgWrapper: {
    width: '70%',
    // height: 180,
    // //***************
    // backgroundColor: '#00e2f7',
    // width: '100%',
    // //***************
    flex: 4,
    // marginHorizontal: '15%',
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
    flex: 11,
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
