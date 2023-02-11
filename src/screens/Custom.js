import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS_THEME, FONTS} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  addUserData,
  clearTodayWordsBag,
  clearUserData,
} from '../redux/User/user.actions';
import {addAllUserWords, clearAllWords} from '../redux/Words/words.actions';

const mapState = ({user, words}) => ({
  userId: user.userId,
  userNativeLang: user.userNativeLang,
  userLearnedLang: user.userLearnedLang,
  currentWeek: user.currentWeek,
  currentDay: user.currentDay,
  stepOfDefaultWordsBag: user.stepOfDefaultWordsBag,
  defaultWordsBag: user.defaultWordsBag,
  allWords: words.words,
  wordsLoading: words.wordsLoading,
});

const Custom = () => {
  const {
    userId,
    userNativeLang,
    userLearnedLang,
    currentWeek,
    currentDay,
    stepOfDefaultWordsBag,
    defaultWordsBag,
    allWords,
    wordsLoading,
  } = useSelector(mapState);

  const dispatch = useDispatch();

  const addWordsToRedux = () => {
    dispatch(addAllUserWords());
    console.log('addDataToRedux');
  };

  const addDataToRedux = () => {
    dispatch(addUserData());
    console.log('addUserData');
  };
  const clearRedux = () => {
    dispatch(clearUserData());
    console.log('clearRedux');
  };
  const clearWords = () => {
    dispatch(clearAllWords());
    console.log('clearRedux');
  };

  const clearTodayWords = () => {
    dispatch(clearTodayWordsBag());
    console.log('clearTodayWords');
  };

  return (
    <View style={styles.container}>
      {wordsLoading ? (
        <ActivityIndicator
          color={COLORS_THEME.bgDark}
          style={{marginVertical: 11}}
          size={'large'}
        />
      ) : null}
      <TouchableOpacity style={styles.addBtn} onPress={addWordsToRedux}>
        <Text style={styles.addBtnTxt}>Add Words to Redux</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addBtn} onPress={addDataToRedux}>
        <Text style={styles.addBtnTxt}>Add Data to Redux</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearBtn} onPress={clearRedux}>
        <Text style={styles.clearBtnTxt}>Clear Redux</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearBtn} onPress={clearWords}>
        <Text style={styles.clearBtnTxt}>Clear Words From Redux</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.clearBtn} onPress={clearTodayWords}>
        <Text style={styles.clearBtnTxt}>Clear Today Words Bag</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Custom;

const styles = StyleSheet.create({
  clearBtnTxt: {
    color: '#d7d1d1',
    fontSize: 20,
    fontFamily: FONTS.enFontFamilyBold,
  },
  clearBtn: {
    minWidth: 250,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#7fb113',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 20,
  },
  addBtn: {
    // width: 200,
    minWidth: 250,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  addBtnTxt: {
    color: '#000',
    fontSize: 20,
    fontFamily: FONTS.enFontFamilyBold,
  },
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
