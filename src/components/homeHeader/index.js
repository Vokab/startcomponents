import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FONTS} from '../../constants';
import {useSelector} from 'react-redux';
import {RealmContext} from '../../realm/models';
import {User} from '../../realm/models/User';

const {useQuery, useRealm} = RealmContext;

const HomeHeader = () => {
  const realm = useRealm();

  const user = useQuery(User);
  useEffect(() => {
    console.log('usersList from HomeHeader =>', user);
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.learnedLang}>
        <Text style={styles.learnedLangTxt}>
          {user[0].userLearnedLang ? user[0].userLearnedLang : '99'}
        </Text>
      </View>
      <View style={styles.week}>
        <Text style={styles.weekTxt}>
          {user[0].currentWeek ? user[0].currentWeek : 'WW'}
        </Text>
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
