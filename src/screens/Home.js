import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import {COLORS_THEME} from '../constants';
import DayCard from '../components/dailyCardsComponents/dayCard';
import TodayCard from '../components/dailyCardsComponents/todayCard';
import HomeHeader from '../components/homeHeader';
import {RealmContext} from '../realm/models';
import {User} from '../realm/models/User';
import {Loop} from '../realm/models/Loop';
import {Word} from '../realm/models/Word';

const {useQuery, useRealm} = RealmContext;

const Home = () => {
  const realm = useRealm();
  const user = useQuery(User);
  const loop = useQuery(Loop);
  const words = useQuery(Word).sorted('_id');

  const [items, setItems] = useState([]);
  const renderDayCard = () => {
    const myItems = [];
    for (let i = 0; i < 7; i++) {
      if (i === user[0].currentDay - 1) {
        myItems.push(
          <View key={i} style={styles.todayCardStyle}>
            <TodayCard />
          </View>,
        );
      } else {
        myItems.push(
          <View key={i} style={styles.dayCardStyle}>
            <DayCard />
          </View>,
        );
      }
    }
    setItems(myItems);
  };

  const addDefaultWordsBag = () => {
    let arr = [];
    const first3Words = words.slice(0, 3);
    // console.log('first3Words =>', first3Words);
    first3Words.forEach(elem => {
      // console.log('element =>', elem._id);
      arr.push(elem._id);
    });
    realm.write(() => {
      loop[0].defaultWordsBag = first3Words;
    });
  };
  useEffect(() => {
    // console.log('todayWork wordsBag =>', defaultWordsBag);
    if (loop[0].defaultWordsBag.length === 0) {
      // console.log('we dont have YET', loop[0].defaultWordsBag);
      addDefaultWordsBag();
      // dispatch(todayWork(allWords, currentWord));
    } else {
      // console.log('we already have something', loop[0].defaultWordsBag);
    }
  }, [loop]);
  useEffect(() => {
    renderDayCard();
  }, []);

  // useEffect(() => {
  //   console.log('allWords =>>>>>>>>>>>>: ', allWords);
  // }, [allWords]);
  return (
    <ScrollView style={styles.container}>
      <HomeHeader />
      {items}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  todayCardStyle: {
    // height: '100%',
    width: '100%',
    // marginHorizontal: '5%',
  },
  dayCardStyle: {
    height: 180,
    width: '100%',
    // marginHorizontal: '5%',
    marginVertical: 20,
  },
  container: {
    backgroundColor: COLORS_THEME.bgDark,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
