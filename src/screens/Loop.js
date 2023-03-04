import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearDefaultRoadRedux,
  constructDef,
  constructDefaultBagRoad,
  constructReadyReview,
  constructReview,
  continueDefaultBagRoad,
  resetLoopState,
  resetLoopStepRedux,
} from '../redux/Loop/loop.actions';
import {FONTS} from '../constants';
import Discover from '../components/loopComponents/discover';
import Cards from '../components/loopComponents/cards';
import loopTypes from '../redux/Loop/loop.types';
import userTypes from '../redux/User/user.types';
import MissedChar from '../components/loopComponents/missedChar';
import FindIt from '../components/loopComponents/findit';
import {addThisBagToDaysBags} from '../redux/User/user.actions';
import {RealmContext} from '../realm/models';
import {User} from '../realm/models/User';
import {Word} from '../realm/models/Word';
import {Loop} from '../realm/models/Loop';
import loopReduxTypes from '../redux/LoopRedux/loopRedux.types';
import {DaysBags} from '../realm/models/DaysBags';
import Realm from 'realm';
import ObjectID from 'bson-objectid';

const {useQuery, useObject, useRealm} = RealmContext;
const mapState = ({loopRedux, loop}) => ({
  isReady: loopRedux.isReady,
  loopStep: loopRedux.loopStep,
  loopRoad: loopRedux.loopRoad,
  loopId: loopRedux.loopRoad,
  reviewBagArray: loopRedux.reviewBagArray,
  customBagArray: loopRedux.customBagArray,
});

const LoopManager = ({route, navigation}) => {
  const realm = useRealm();
  const user = useQuery(User);
  const loop = useQuery(Loop);
  const words = useQuery(Word);
  const daysBags = useQuery(DaysBags);

  let defaultWordsBag = loop[0].defaultWordsBag;
  let defaultWordsBagRoad = loop[0].defaultWordsBagRoad;
  let stepOfDefaultWordsBag = loop[0].stepOfDefaultWordsBag;
  let isDefaultDiscover = loop[0].isDefaultDiscover;

  //
  let reviewWordsBag = loop[0].reviewWordsBag;
  let reviewWordsBagRoad = loop[0].reviewWordsBagRoad;
  let stepOfReviewWordsBag = loop[0].stepOfReviewWordsBag;

  //
  let customWordsBag = loop[0].customWordsBag;
  let customWordsBagRoad = loop[0].customWordsBagRoad;
  let stepOfCustomWordsBag = loop[0].stepOfCustomWordsBag;
  let isCustomDiscover = loop[0].isCustomDiscover;

  let currentDay = user[0].currentDay;
  let currentWeek = user[0].currentDay;
  const {idType, readyReviewBag} = route.params;
  const {isReady, loopStep, loopRoad, reviewBagArray, customBagArray} =
    useSelector(mapState);
  const dispatch = useDispatch();

  function sleep(ms) {
    console.log('sleep start');
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const buildLoopRoad = async (roadArray, step) => {
    dispatch({
      type: loopReduxTypes.SET_LOOP_ROAD,
      payload: roadArray,
      thisLoopId: 0,
    });
    dispatch({
      type: loopReduxTypes.SET_LOOP_STEP,
      payload: step,
    });
    await sleep(3000);
    dispatch({
      type: loopReduxTypes.UPDATE_LOOP_STATE,
    });
  };

  const addThisBagToDaysBagss = bagWord => {
    try {
      let dayBag;
      realm.write(() => {
        dayBag = realm.create('DaysBags', {
          _id: ObjectID(),
          day: currentDay,
          week: currentWeek,
          step: 0,
          words: JSON.stringify(bagWord),
        });
      });
      console.log('new dayBag created:', dayBag);
    } catch (err) {
      console.error('Failed to create the BagDay', err.message);
    }
  };
  const addThisBagWordsToPassedWords = async bagWord => {
    try {
      let passedWord;
      bagWord.forEach(elem => {
        realm.write(() => {
          passedWord = realm.create('PassedWords', {
            _id: elem._id,
            score: 100,
            viewNbr: 0,
            prog: 0,
          });
        });
        console.log('elem._id:', passedWord);
      });
    } catch (err) {
      console.error('Failed to create the PassedWords', err.message);
    }
  };
  useEffect(() => {
    if (idType === 0) {
      if (stepOfDefaultWordsBag === 0) {
        // we started now and we dont see those words before
        //--------------------------------------------
        // here we need to add this words bag to the daysBags array
        if (isDefaultDiscover === 0 && defaultWordsBagRoad.length === 0) {
          console.log(
            'we will add to the daybags and passedwords : ',
            defaultWordsBagRoad,
          );
          addThisBagWordsToPassedWords(defaultWordsBag);
          addThisBagToDaysBagss(defaultWordsBag);
        }
        updateDefaultRoad().then(() => {
          const arr = [];
          console.log(
            'default Words Bag Road as Strings =>',
            defaultWordsBagRoad,
          );
          // const myObjFromJson = JSON.parse(defaultWordsBagRoad);
          defaultWordsBagRoad.forEach(item => {
            arr.push(JSON.parse(item));
          });
          console.log('default Words Bag Road as Objects', arr);
          buildLoopRoad(arr, 0).then(() => {
            console.log('isReady =>', isReady);
            console.log('loopStep =>', loopStep);
            console.log('loopRoad =>', loopRoad);
          });
        });
      } else {
        // we continue what we already started.
        //--------------------------------------------
        const arr = [];
        defaultWordsBagRoad.forEach(item => {
          arr.push(JSON.parse(item));
        });
        console.log('default Words Bag Road as Objects', arr);
        buildLoopRoad(arr, stepOfDefaultWordsBag);
      }
    } else if (idType === 1) {
      // We need to construct the custom words bag road
      if (stepOfCustomWordsBag === 0) {
        // we started now and we dont see those words before
        //--------------------------------------------
        // here we need to add this words bag to the daysBags array

        updateCustomRoad().then(() => {
          const arr = [];
          console.log(
            'custom Words Bag Road as Strings =>',
            customWordsBagRoad,
          );
          // const myObjFromJson = JSON.parse(defaultWordsBagRoad);
          customWordsBagRoad.forEach(item => {
            arr.push(JSON.parse(item));
          });
          console.log('Custom Words Bag Road as Objects', arr);
          buildLoopRoad(arr, 0).then(() => {
            console.log('isReady =>', isReady);
            console.log('loopStep =>', loopStep);
            console.log('loopRoad =>', loopRoad);
          });
        });
      } else {
        // we continue what we already started.
        //--------------------------------------------
        const arr = [];
        customWordsBagRoad.forEach(item => {
          arr.push(JSON.parse(item));
        });
        console.log('Custom Words Bag Road as Objects', arr);
        buildLoopRoad(arr, stepOfCustomWordsBag);
      }
    } else if (idType === 2) {
      if (stepOfReviewWordsBag === 0 && reviewWordsBagRoad.length === 0) {
        // We need to construct the Review words bag road
        updateReviewRoad().then(() => {
          const arr = [];
          console.log(
            'review Words Bag Road as Strings =>',
            reviewWordsBagRoad,
          );
          // const myObjFromJson = JSON.parse(defaultWordsBagRoad);
          reviewWordsBagRoad.forEach(item => {
            arr.push(JSON.parse(item));
          });
          console.log('review Words Bag Road as Objects', arr);
          buildLoopRoad(arr, 0).then(() => {
            console.log('isReady =>', isReady);
            console.log('loopStep =>', loopStep);
            console.log('loopRoad =>', loopRoad);
          });
        });
      } else {
        // we continue what we already started in review bag
        console.log('we continue what we already started in review bag');
        const arr = [];
        reviewWordsBagRoad.forEach(item => {
          arr.push(JSON.parse(item));
        });
        console.log('review Words Bag Road as Objects', arr);
        buildLoopRoad(arr, stepOfReviewWordsBag);
      }
    } else if (idType === 3) {
      // We need to build the daily test road
    } else if (idType === 4) {
      // We need to build the weekly test road
    } else if (idType === 5) {
      // We need to build the review Ready-To-Review bag road
      console.log('We need to build the review Ready-To-Review bag road');
      console.log('ready review Bag Road as string', readyReviewBag);
      // buildLoopRoad(readyReviewBag, stepOfReviewWordsBag);
      constructReadyReview(readyReviewBag).then(res => {
        console.log('review Words Bag Road as Objects', res);
        buildLoopRoad(res, 0).then(() => {});
      });
    }
    return () => {
      alert('are you sure you want to exit');
      dispatch({
        type: loopReduxTypes.RESET_LOOP,
      });
    };
  }, []);

  const updateDefaultRoad = async () => {
    try {
      const road = await constructDef(defaultWordsBag, isDefaultDiscover);
      realm.write(() => {
        loop[0].defaultWordsBagRoad = road;
      });
    } catch (error) {
      console.log('error in updating Default Road =>', error);
    }
  };
  const updateCustomRoad = async () => {
    try {
      console.log(' customBagArray from updateCustomRoad :', customBagArray);

      if (isCustomDiscover === 0 && customWordsBagRoad.length === 0) {
        realm.write(() => {
          loop[0].customWordsBag = customBagArray;
        });
        console.log(
          'we will add to the daybags and passedwords : ',
          customWordsBagRoad,
        );
        addThisBagWordsToPassedWords(customWordsBag);
        addThisBagToDaysBagss(customWordsBag);
      }

      const road = await constructDef(customWordsBag, isCustomDiscover);
      realm.write(() => {
        loop[0].customWordsBagRoad = road;
      });
    } catch (error) {
      console.log('error in updating Custom Road =>', error);
    }
  };

  const updateReviewRoad = async () => {
    try {
      realm.write(() => {
        loop[0].reviewWordsBag = reviewBagArray;
      });
      const road = await constructReview(reviewBagArray);
      realm.write(() => {
        loop[0].reviewWordsBagRoad = road;
      });
    } catch (error) {
      console.log('error in updating Review Road =>', error);
    }
  };

  const deleteOldRoad = async () => {
    realm.write(() => {
      // Delete all instances of Cat from the realm.

      loop[0].defaultWordsBagRoad = [];
    });
  };
  const clearDefaultRoad = () => {
    console.log('clearDefaultRoad start');
  };

  useEffect(() => {
    console.log('isReady now From Loop =>', isReady);
    console.log('customBagArray From Loop', customBagArray);
  }, []);

  return (
    <View style={styles.container}>
      {isReady ? (
        <View>
          {(() => {
            if (loopStep < loopRoad.length) {
              // console.log('loopStep =>', loopStep);
              switch (loopRoad[loopStep].screen) {
                case 0:
                  return (
                    <View style={{width: '100%', height: '100%'}}>
                      {/* <Text>Hello There {loopRoad[loopStep].screen}</Text> */}
                      <Discover loopType={idType} />
                    </View>
                  );
                case 1:
                  return (
                    <View style={{width: '100%', height: '100%'}}>
                      {/* <Text>Hello There {loopRoad[loopStep].screen}</Text> */}
                      <Cards loopType={idType} />
                    </View>
                  );
                case 3:
                  return (
                    <View style={{width: '100%', height: '100%'}}>
                      {/* <Text>Hello There {loopRoad[loopStep].screen}</Text> */}
                      <MissedChar loopType={idType} />
                    </View>
                  );
                case 4:
                  return (
                    <View style={{width: '100%', height: '100%'}}>
                      {/* <Text>Hello There {loopRoad[loopStep].screen}</Text> */}
                      <FindIt loopType={idType} />
                    </View>
                  );
                default:
                  return (
                    <View>
                      <Text>Hello There Default</Text>
                    </View>
                  );
              }
            }
          })()}
        </View>
      ) : (
        <View>
          <Text>Loop</Text>
          <ActivityIndicator size="large" color="#00ff00" />
          {/* 
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => {
              clearDefaultRoad();
            }}>
            <Text style={styles.clearBtnTxt}>CLEAR</Text>
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );
};

export default LoopManager;

const styles = StyleSheet.create({
  clearBtn: {
    backgroundColor: 'red',
    padding: 15,
    marginTop: 20,
  },
  clearBtnTxt: {
    fontFamily: FONTS.enFontFamilyBold,
    fontSize: 18,
    color: '#fff',
  },
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'yellow',
    // width: '100%',
  },
});
