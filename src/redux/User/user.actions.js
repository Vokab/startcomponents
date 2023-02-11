import userTypes from './user.types';
import {collection, query, where, getDocs, limit} from 'firebase/firestore';
import {db} from '../../firebase/utils';
import RNFetchBlob from 'rn-fetch-blob';

const passedIds = [0, 2, 3, 5, 6];
export const addUserData = () => ({
  type: userTypes.USER_DATA_ADDED,
});

export const clearUserData = () => ({
  type: userTypes.REDUX_DATA_CLEARED,
});

export const clearTodayWordsBag = () => ({
  type: userTypes.CLEAR_TODAY_WORDSBAG,
});
export const modDefWoBag =
  (defWordsBag, indexDef, selected) => async dispatch => {
    console.log('modDefWoBag start');
    let oldWordsBag = defWordsBag;
    // defWordsBag.forEach((element,index) => {
    //   if (element.myId === indexDef){
    //     oldWordsBag[index] = selected
    //   }
    // });
    oldWordsBag[indexDef] = selected;
    // for (let i = 0; i < defWordsBag.length; i++) {
    //   if (defWordsBag[i].myId === indexDef) {
    //     oldWordsBag[i] = selected;
    //   }
    //   break;
    // }
    console.log('new words bag as well', oldWordsBag);
    dispatch({
      type: userTypes.MODIFY_DEFAULT_WORDS_BAG,
      payload: oldWordsBag,
    });
  };

export const todayWork = (allWords, currentWord) => async dispatch => {
  let counter = 0;
  const newData = [];
  const arrOfIds = [];
  console.log('We dont have any word in the default words bag', currentWord);
  console.log('allWords from user action', allWords);
  dispatch({
    type: userTypes.CLEAR_TODAY_WORDSBAG,
  });
  for (let i = 0; i < allWords.length; i++) {
    // if (!passedIds.includes(allWords[i].id)) {
    if (!allWords[i].passed) {
      newData.push({
        myId: allWords[i].id,
        wordNativeLang: allWords[i].wordNativeLang,
        wordLearnedLang: allWords[i].wordLearnedLang,
        wordLevel: allWords[i].wordLevel,
        audioPath: allWords[i].audioPath,
        wordImage: allWords[i].wordImage,
      });
      arrOfIds.push(allWords[i].id);
      counter = counter + 1;
      if (counter > 4) {
        break;
      }
    }
  }
  console.log('newData =>', newData);
  dispatch({
    type: userTypes.ADD_TODAY_WORDSBAG,
    payload: newData,
    ourIds: arrOfIds,
  });
  dispatch({
    type: userTypes.UPDATE_CURRENT_WORD,
    payload: counter,
  });
};
