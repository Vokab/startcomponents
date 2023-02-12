import wordsTypes from './words.types';
import {collection, query, where, getDocs, orderBy} from 'firebase/firestore';
import {db} from '../../firebase/utils';
import RNFetchBlob from 'rn-fetch-blob';

export const addAllUserWords = () => async dispatch => {
  dispatch({
    type: wordsTypes.WORDS_LOADING,
    payload: true,
  });
  try {
    const destinationPath = RNFetchBlob.fs.dirs.DocumentDir + '/' + 'MyApp';
    const newData = [];
    console.log('start addAllUserWords');
    const words = await getAllTheWords();
    words.forEach((item, index) => {
      newData.push({
        id: item.id,
        wordNativeLang: item['arabic'].word,
        wordLearnedLang: item['english'].word,
        wordLevel: item.level,
        audioPath: destinationPath + '/' + item.id + '.mp3',
        wordImage: item.image,
        defaultDay: item.defaultDay,
        defaultWeek: item.defaultWeek,
        passed: false,
        deleted: false,
      });
    });
    dispatch({
      type: wordsTypes.ADD_ALL_WORDS,
      payload: newData,
    });
  } catch (error) {
    console.log('error addAllUserWords', error);
  }
  dispatch({
    type: wordsTypes.WORDS_LOADING,
    payload: false,
  });
};

export const clearAllWords = () => async dispatch => {
  dispatch({
    type: wordsTypes.CLEAR_ALL_WORDS,
  });
};
export const modifAllWords = updatedWords => async dispatch => {
  dispatch({
    type: wordsTypes.CLEAR_ALL_WORDS,
    payload: updatedWords,
  });
};

const getAllTheWords = async () => {
  const ar = [];
  const q = query(collection(db, 'words'), orderBy('id'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data().english.audio);
    ar.push(doc.data());
  });
  return ar;
};
export const setWordsLoading = () => async dispatch => {
  dispatch({
    type: wordsTypes.WORDS_LOADING,
    payload: true,
  });
};
