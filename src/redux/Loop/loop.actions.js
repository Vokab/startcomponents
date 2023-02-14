import loopTypes from './loop.types';

export const loopFunct = () => async dispatch => {
  console.log('loopFunct start');
};

const constructDef = async defaultWordsBag => {
  const screens = [0, 1];
  const roadArray = [];

  defaultWordsBag.forEach(item => {
    console.log('this item =>', item);
    screens.forEach(screenItem => {
      let newObj = {};
      console.log('this screenItem =>', screenItem);
      newObj.wordObj = item;
      newObj.screen = screenItem;
      roadArray.push(newObj);
    });
    console.log('roadArray =>', roadArray);
  });
  return roadArray;
};
function sleep(ms) {
  console.log('sleep start');
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const constructDefaultBagRoad =
  (defaultWordsBag, stepOfDefaultWordsBag) => async dispatch => {
    console.log('constructDefaultBagRoad start');
    const ar = await constructDef(defaultWordsBag);
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
    });
    await sleep(3000);
    console.log('sleep end');
    dispatch({
      type: loopTypes.UPDATE_LOOP_STATE,
    });
  };

export const goNextRedux = loopStep => async dispatch => {
  console.log('start goNextRedux');
  dispatch({
    type: loopTypes.SET_LOOP_STEP,
    payload: loopStep + 1,
  });
};
export const resetLoopStepRedux = loopStep => async dispatch => {
  console.log('start resetLoopStepRedux');
  dispatch({
    type: loopTypes.SET_LOOP_STEP,
    payload: 0,
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
