import userTypes from './user.types';
import {collection, query, where, getDocs, limit} from 'firebase/firestore';
import {db} from '../../firebase/utils';
import RNFetchBlob from 'rn-fetch-blob';

export const addUserData = () => ({
  type: userTypes.USER_DATA_ADDED,
});

export const clearUserData = () => ({
  type: userTypes.REDUX_DATA_CLEARED,
});

const getWordsOfThisDay = async currentDay => {
  const ar = [];
  const q = query(
    collection(db, 'words'),
    where('defaultDay', '==', currentDay),
    limit(12),
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data().english.audio);
    ar.push(doc.data());
  });
  return ar;
};
export const todayWork =
  (currentDay, defaultWordsBag, userNativeLang, userLearnedLang) =>
  async dispatch => {
    const destinationPath = RNFetchBlob.fs.dirs.DocumentDir + '/' + 'MyApp';
    const newData = [];

    console.log('We dont have any word in the default words bag');
    dispatch({
      type: userTypes.CLEAR_TODAY_WORDSBAG,
    });
    const words = await getWordsOfThisDay(currentDay);
    words.forEach((item, index) => {
      newData.push({
        id: item.id,
        wordNativeLang: item['arabic'].word,
        wordLearnedLang: item['english'].word,
        wordLevel: item.level,
        audioPath: destinationPath + '/' + item.id + '.mp3',
        wordImage: item.image,
      });
    });
    dispatch({
      type: userTypes.ADD_TODAY_WORDSBAG,
      payload: newData,
    });
  };
