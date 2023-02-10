import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS_THEME} from '../constants';
import DayCard from '../components/dailyCardsComponents/dayCard';
import TodayCard from '../components/dailyCardsComponents/todayCard';
import HomeHeader from '../components/homeHeader';
import {useDispatch, useSelector} from 'react-redux';
import {collection, query, where, getDocs, limit} from 'firebase/firestore';
import {db} from '../firebase/utils';
import {todayWork} from '../redux/User/user.actions';

const mapState = ({user}) => ({
  userId: user.userId,
  userNativeLang: user.userNativeLang,
  userLearnedLang: user.userLearnedLang,
  currentWeek: user.currentWeek,
  currentDay: user.currentDay,
  stepOfDefaultWordsBag: user.stepOfDefaultWordsBag,
  defaultWordsBag: user.defaultWordsBag,
});
const Home = () => {
  const {
    userId,
    userNativeLang,
    userLearnedLang,
    currentWeek,
    currentDay,
    stepOfDefaultWordsBag,
    defaultWordsBag,
  } = useSelector(mapState);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const getWordsOfThisDay = async () => {
    const q = query(
      collection(db, 'words'),
      where('defaultDay', '==', currentDay),
      limit(3),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
  };
  const renderDayCard = () => {
    const myItems = [];
    for (let i = 0; i < 7; i++) {
      if (i === currentDay - 1) {
        myItems.push(
          <View key={i} style={styles.todayCardStyle}>
            <TodayCard defaultWordsBag={defaultWordsBag} />
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
  // useEffect(() => {
  //   getWordsOfThisDay();
  // }, []);

  useEffect(() => {
    renderDayCard();
  }, [currentDay]);
  // Clean Code
  useEffect(() => {
    console.log('todayWork wordsBag =>', defaultWordsBag);
    if (defaultWordsBag.length === 0) {
      dispatch(
        todayWork(currentDay, defaultWordsBag, userNativeLang, userLearnedLang),
      );
    } else {
      console.log('we already have something');
    }
  }, []);

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
