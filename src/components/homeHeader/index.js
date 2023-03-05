import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FONTS, IMAGES} from '../../constants';
import {useSelector} from 'react-redux';
import {RealmContext} from '../../realm/models';
import {User} from '../../realm/models/User';

const {useQuery, useRealm} = RealmContext;

const HomeHeader = () => {
  const realm = useRealm();

  const user = useQuery(User);
  useEffect(() => {
    // console.log('usersList from HomeHeader =>', user);
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.learnedLang}>
        {user[0].userLearnedLang ? (
          <Image source={IMAGES.ger} style={styles.falgStyle} />
        ) : (
          <Text style={styles.learnedLangTxt}>99</Text>
        )}
      </View>
      <View style={styles.week}>
        <Text style={styles.weekTxt}>
          Week {user[0].currentWeek ? user[0].currentWeek : 'WW'}
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
  falgStyle: {
    width: 25,
    height: 25,
  },
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
    // marginBottom: 100,
  },
});
