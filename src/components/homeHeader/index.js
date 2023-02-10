import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FONTS} from '../../constants';
import {useSelector} from 'react-redux';

const mapState = ({user}) => ({
  userId: user.userId,
  userLearnedLang: user.userLearnedLang,
  currentWeek: user.currentWeek,
  currentDay: user.currentDay,
  stepOfDefaultWordsBag: user.stepOfDefaultWordsBag,
});

const HomeHeader = () => {
  const {
    userId,
    userLearnedLang,
    currentWeek,
    currentDay,
    stepOfDefaultWordsBag,
  } = useSelector(mapState);

  return (
    <View style={styles.container}>
      <View style={styles.learnedLang}>
        <Text style={styles.learnedLangTxt}>
          {userLearnedLang ? userLearnedLang : '99'}
        </Text>
      </View>
      <View style={styles.week}>
        <Text style={styles.weekTxt}>{currentWeek ? currentWeek : 'WW'}</Text>
      </View>
      <View style={styles.user}>
        <FontAwesome name="user" size={26} color="#fff" />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  learnedLang: {},
  week: {},
  user: {},
  weekTxt: {
    fontFamily: FONTS.enFontFamilyBold,
    fontSize: 22,
    color: '#fff',
  },

  learnedLangTxt: {
    fontFamily: FONTS.enFontFamilyBold,
    fontSize: 22,
    color: '#fff',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
