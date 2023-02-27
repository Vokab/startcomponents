import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearDefaultRoadRedux,
  constructDef,
  constructDefaultBagRoad,
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

const {useQuery, useObject, useRealm} = RealmContext;
const mapState = ({user, loopRedux, loop}) => ({
  isReady: loopRedux.isReady,
  loopStep: loopRedux.loopStep,
  loopRoad: loopRedux.loopRoad,
  loopId: loopRedux.loopRoad,

  stepOfCustomWordsBag: user.stepOfCustomWordsBag,
});

const LoopManager = ({route, navigation}) => {
  const realm = useRealm();
  const user = useQuery(User);
  const loop = useQuery(Loop);
  const words = useQuery(Word);

  let defaultWordsBag = loop[0].defaultWordsBag;
  let defaultWordsBagRoad = loop[0].defaultWordsBagRoad;
  let stepOfDefaultWordsBag = loop[0].stepOfDefaultWordsBag;
  let isDefaultDiscover = loop[0].isDefaultDiscover;

  const {idType} = route.params;
  const {isReady, loopStep, loopRoad, loopId, stepOfCustomWordsBag} =
    useSelector(mapState);
  const dispatch = useDispatch();

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
    dispatch({
      type: loopReduxTypes.UPDATE_LOOP_STATE,
    });
  };
  useEffect(() => {
    if (idType === 0) {
      if (stepOfDefaultWordsBag === 0) {
        // we started now and we dont see those words before
        // here we need to add this words bag to the daysBags array
        // if (isDefaultDiscover === 0) {
        //   dispatch(
        //     addThisBagToDaysBags(
        //       daysBags,
        //       defaultWordsBag,
        //       currentDay,
        //       currentWeek,
        //     ),
        //   );
        // }
        //--------------------------------------------
        // dispatch(
        //   constructDefaultBagRoad(
        //     defaultWordsBag,
        //     stepOfDefaultWordsBag,
        //     isDefaultDiscover,
        //   ),
        // );
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
        // dispatch(
        //   continueDefaultBagRoad(
        //     defaultWordsBag,
        //     stepOfDefaultWordsBag,
        //     defaultWordsBagRoad,
        //   ),
        // );
        const arr = [];
        defaultWordsBagRoad.forEach(item => {
          arr.push(JSON.parse(item));
        });
        console.log('default Words Bag Road as Objects', arr);
        buildLoopRoad(arr, stepOfDefaultWordsBag);
      }
    } else if (idType === 1 && stepOfCustomWordsBag === 0) {
      // We need to construct the custom words bag road
    }
    //  else if (idType === 2) {
    //   if (stepOfReviewWordsBag === 0) {
    //     // We need to construct the Review words bag road
    //   } else {
    //     // we continue what we already started in review bag
    //   }
    // } else if (idType === 3) {
    //   // We need to build the daily test road
    // } else if (idType === 4) {
    //   // We need to build the weekly test road
    // }
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
  const deleteOldRoad = async () => {
    realm.write(() => {
      // Delete all instances of Cat from the realm.

      loop[0].defaultWordsBagRoad = [];
    });
  };

  // useEffect(() => {
  //   const arr = [];
  //   console.log('default Words Bag Road as Strings =>', defaultWordsBagRoad);
  //   // const myObjFromJson = JSON.parse(defaultWordsBagRoad);
  //   defaultWordsBagRoad.forEach(item => {
  //     arr.push(JSON.parse(item));
  //   });
  //   console.log('default Words Bag Road as Objects', arr);

  //   if (defaultWordsBagRoad.length === 0) {
  //     updateDefaultRoad();
  //   }
  //   // if (defaultWordsBagRoad.length != 0) {
  //   //   console.log('yes we will deltete it now');
  //   //   deleteOldRoad();
  //   // }
  // }, [defaultWordsBagRoad]);

  const clearDefaultRoad = () => {
    console.log('clearDefaultRoad start');
  };

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

          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => {
              clearDefaultRoad();
            }}>
            <Text style={styles.clearBtnTxt}>CLEAR</Text>
          </TouchableOpacity>
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
