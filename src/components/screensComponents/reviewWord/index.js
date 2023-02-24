import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';

const mapState = ({user, words}) => ({
  userId: user.userId,
  userNativeLang: user.userNativeLang,
  userLearnedLang: user.userLearnedLang,
  userLevel: user.userLevel,
  currentWeek: user.currentWeek,
  currentDay: user.currentDay,
  stepOfDefaultWordsBag: user.stepOfDefaultWordsBag,
  defaultWordsBag: user.defaultWordsBag,
  allWords: words.words,
  wordsLoading: words.wordsLoading,
  audioLoading: words.audioLoading,
  daysBags: user.daysBags,
  currentWeek: user.currentWeek,
  currentDay: user.currentDay,
});

const ReviewWordComp = props => {
  const {
    userId,
    userNativeLang,
    userLearnedLang,
    userLevel,
    currentWeek,
    currentDay,
    daysBags,
    stepOfDefaultWordsBag,
    defaultWordsBag,
    allWords,
    wordsLoading,
    audioLoading,
  } = useSelector(mapState);
  const dispatch = useDispatch();
  const {word, wordItem} = props;
  useEffect(() => {
    // console.log('allWords =>', allWords[wordItem.id].wordLearnedLang);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.wordStyle}>
        {allWords[wordItem.id]?.wordLearnedLang}
      </Text>
      <View style={[styles.progressBarParent]}>
        <View
          style={[
            styles.progressBarChild,
            {width: `${(wordItem.prog + 2 * 100) / 20}%`},
          ]}></View>
      </View>
      <TouchableOpacity style={styles.btnStyle}>
        <Ionicons name="ios-add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ReviewWordComp;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#FF4C00',
    width: 50,
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordStyle: {
    fontFamily: FONTS.enFontFamilyMedium,
    fontSize: 16,
    color: '#fff',
  },
  container: {
    backgroundColor: '#1D1E37',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,.10)',
    width: '49%',
    height: 140,
    borderRadius: 20,
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 6,
    // marginHorizontal: '1%',
  },
  progressBarParent: {
    position: 'relative',
    width: '80%',
    height: 6,
    backgroundColor: '#FFFFFF', // Changed To DarkLight Code
    borderRadius: 6,
  },
  progressBarChild: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '20%',
    height: 6,
    backgroundColor: '#FF4C00',
    borderRadius: 6,
  },
});
