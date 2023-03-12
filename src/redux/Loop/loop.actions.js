import loopTypes from './loop.types';
import userTypes from '../User/user.types';

import {TaskV4} from '../../realm/models/Task';
import {Word} from '../../realm/models/Word';
import {User} from '../../realm/models/User';
import {Loop, Road} from '../../realm/models/Loop';

export const loopFunct = () => async dispatch => {
  console.log('loopFunct start');
};

export const constructDef = async (defaultWordsBag, isDefaultDiscover) => {
  let screens = [];
  if (isDefaultDiscover === 0) {
    screens = [1, 2, 3, 4];
  } else {
    screens = [3, 4];
  }
  const roadArray = [];

  defaultWordsBag.forEach(item => {
    screens.forEach(screenItem => {
      let newObj = {};
      newObj.wordObj = item;
      newObj.screen = screenItem;
      newObj.string;
      const myJSON_Object = JSON.stringify(newObj);
      roadArray.push(myJSON_Object);
    });
  });

  return roadArray;
};

export const constructReview = async reviewWordsBag => {
  let screens = [3, 4];
  const roadArray = [];
  reviewWordsBag.forEach(item => {
    screens.forEach(screenItem => {
      let newObj = {};
      newObj.wordObj = item;
      newObj.screen = screenItem;
      newObj.string;
      const myJSON_Object = JSON.stringify(newObj);
      roadArray.push(myJSON_Object);
    });
  });

  return roadArray;
};

export const constructReadyReview = async reviewWordsBag => {
  let screens = [1, 3];
  const roadArray = [];
  reviewWordsBag.forEach(item => {
    screens.forEach(screenItem => {
      let newObj = {};
      newObj.wordObj = item;
      newObj.screen = screenItem;
      newObj.string;
      roadArray.push(newObj);
    });
  });

  return roadArray;
};

function sleep(ms) {
  console.log('sleep start');
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const constructDefaultBagRoad =
  (defaultWordsBag, stepOfDefaultWordsBag, isDefaultDiscover) =>
  async dispatch => {
    console.log('constructDefaultBagRoad start', isDefaultDiscover); // 0
    const ar = await constructDef(defaultWordsBag, isDefaultDiscover);
    dispatch({
      type: loopTypes.UPDATE_DEFAULT_ROAD,
      payload: ar,
    });
    dispatch({
      type: loopTypes.SET_LOOP_STEP,
      payload: stepOfDefaultWordsBag,
    });
    dispatch({
      type: loopTypes.SET_LOOP_ROAD,
      payload: ar,
      thisLoopId: 0,
    });
    await sleep(3000);
    // console.log('sleep end');
    dispatch({
      type: loopTypes.UPDATE_LOOP_STATE,
    });
  };

export const continueDefaultBagRoad =
  (defaultWordsBag, stepOfDefaultWordsBag, defaultWordsBagRoad) =>
  async dispatch => {
    dispatch({
      type: loopTypes.SET_LOOP_ROAD,
      payload: defaultWordsBagRoad,
      thisLoopId: 0,
    });
    dispatch({
      type: loopTypes.SET_LOOP_STEP,
      payload: stepOfDefaultWordsBag,
    });
  };

export const goNextRedux = loopStep => async dispatch => {
  console.log('start goNextRedux');
  dispatch({
    type: loopTypes.SET_LOOP_STEP,
    payload: loopStep + 1,
  });
  dispatch({
    type: userTypes.UPDATE_STEP_OF_DEFAULT_WORDS_BAG,
  });
};

export const finishLoop = loopId => async dispatch => {
  console.log('start finishLoop');
  if (loopId === 0) {
    dispatch({
      type: userTypes.UPDATE_IS_DEFAULT_DISCOVER,
    });
  } else if (loopId === 1) {
    dispatch({
      type: userTypes.UPDATE_IS_CUSTOM_DISCOVER,
    });
  }
};

export const resetLoopStepRedux = loopStep => async dispatch => {
  console.log('start resetLoopStepRedux');
  dispatch({
    type: loopTypes.SET_LOOP_STEP,
    payload: 0,
  });
  dispatch({
    type: loopTypes.RESET_LOOP_ROAD,
  });
  dispatch({
    type: userTypes.RESET_DEFAULT_STEP,
  });
};

export const clearDefaultRoadRedux = () => async dispatch => {
  dispatch({
    type: loopTypes.CLEAR_DEFAULT_ROAD,
  });
};

export const resetLoopState = () => async dispatch => {
  dispatch({
    type: loopTypes.RESET_LOOP_STATE,
  });
};

export const updateLoopRoad =
  (loopRoad, loopStep, loopId) => async dispatch => {
    // console.log('loopRoad from updateLoopRoad =>', loopRoad);
    // console.log(
    //   'we need to add this word and this screen to the end of the loop =>', this if we are not in test
    //   loopRoad[loopStep],
    // );

    loopRoad.push(loopRoad[loopStep]);
    dispatch({
      type: loopTypes.UPDATE_LOOP_ROAD,
      payload: loopRoad,
    });
    if (loopId === 0) {
      // default words bag
      // console.log('we will update the default road now');
      dispatch({
        type: loopTypes.UPDATE_DEFAULT_ROAD,
        payload: loopRoad,
      });
    } else if (loopId === 1) {
      // custom words bag
      // console.log('we will update the custom road now');
      dispatch({
        type: loopTypes.UPDATE_CUSTOM_ROAD,
        payload: loopRoad,
      });
    } else if (loopId === 2) {
      // review words bag
      dispatch({
        type: loopTypes.UPDATE_REVIEW_ROAD,
        payload: loopRoad,
      });
    }
  };
