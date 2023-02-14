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
  constructDefaultBagRoad,
  resetLoopState,
  resetLoopStepRedux,
} from '../redux/Loop/loop.actions';
import {FONTS} from '../constants';
import Discover from '../components/loopComponents/discover';
import Cards from '../components/loopComponents/cards';

const mapState = ({user, words, loop}) => ({
  isReady: loop.isReady,
  loopStep: loop.loopStep,
  loopRoad: loop.loopRoad,

  defaultWordsBag: user.defaultWordsBag,
  customWordsBag: user.customWordsBag,
  reviewWordsBag: user.reviewWordsBag,

  defaultWordsBagRoad: loop.defaultWordsBagRoad,
  customWordsBagRoad: loop.customWordsBagRoad,
  reviewWordsBagRoad: loop.reviewWordsBagRoad,

  stepOfDefaultWordsBag: user.stepOfDefaultWordsBag,
  stepOfCustomWordsBag: user.stepOfCustomWordsBag,
  stepOfReviewWordsBag: user.stepOfReviewWordsBag,
});

const Loop = ({route, navigation}) => {
  const {idType} = route.params;
  const {
    isReady,
    loopStep,
    loopRoad,

    defaultWordsBag,
    customWordsBag,
    reviewWordsBag,
    defaultWordsBagRoad,
    customWordsBagRoad,
    reviewWordsBagRoad,
    stepOfDefaultWordsBag,
    stepOfCustomWordsBag,
    stepOfReviewWordsBag,
  } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('idType =>', idType);
    // console.log('defaultWordsBag =>', defaultWordsBag);
    // console.log('stepOfDefaultWordsBag =>', stepOfDefaultWordsBag);
    if (idType === 0 && stepOfDefaultWordsBag === 0) {
      dispatch(constructDefaultBagRoad(defaultWordsBag, stepOfDefaultWordsBag));
      //   console.log(
      //     'defaultWordsBagRoad =>',
      //     defaultWordsBagRoad[loopStep].screen,
      //     'loopStep =>',
      //     loopStep,
      //   );
    } else if (idType === 1 && stepOfCustomWordsBag === 0) {
      // We need to construct the custom words bag road
    } else if (idType === 2 && stepOfReviewWordsBag === 0) {
      // We need to construct the Review words bag road
    } else if (idType === 3) {
      // We need to build the daily test road
    } else if (idType === 4) {
      // We need to build the weekly test road
    }
  }, []);

  useEffect(() => {
    console.log('loopStep =>', loopStep);
  }, [loopStep]);

  const clearDefaultRoad = () => {
    console.log('clearDefaultRoad start');
    dispatch(clearDefaultRoadRedux());
  };
  const resetStateOfLoop = () => {
    console.log('clearDefaultRoad start');
    dispatch(resetLoopState());
  };
  //   useEffect(() => {
  //     if (loopStep === loopRoad.length) {
  //       navigation.navigate('Home');
  //     }
  //   }, [loopStep]);
  const resetLoopStep = async () => {
    console.log('resetLoopStep start');
    dispatch(resetLoopStepRedux());
  };

  return (
    <View style={styles.container}>
      {isReady ? (
        <View>
          {/* {loopStep <= defaultWordsBagRoad.length ? {renderSwitch()} : null} */}
          {(() => {
            if (loopStep < loopRoad.length) {
              console.log('loopStep =>', loopStep);
              switch (loopRoad[loopStep].screen) {
                case 0:
                  return (
                    <View style={{width: '100%', height: '100%'}}>
                      {/* <Text>Hello There {loopRoad[loopStep].screen}</Text> */}
                      <Discover />
                    </View>
                  );
                case 1:
                  return (
                    <View style={{width: '100%', height: '100%'}}>
                      {/* <Text>Hello There {loopRoad[loopStep].screen}</Text> */}
                      <Cards />
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

          {/* <Text>Yes We Are Good To Go</Text>
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => {
              resetStateOfLoop();
            }}>
            <Text style={styles.clearBtnTxt}>CLEAR</Text>
          </TouchableOpacity> */}
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

export default Loop;

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
