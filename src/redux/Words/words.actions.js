import wordsTypes from './words.types';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import {db} from '../../firebase/utils';
import RNFetchBlob from 'rn-fetch-blob';

const downloadAudioOfLearnedLanguage = async (urls, dispatch) => {
  console.log('Start Download Audio Of Learned Language');
  const destinationPath = RNFetchBlob.fs.dirs.DocumentDir + '/' + 'vokab';
  let counter = 0;
  urls.forEach(item => {
    const fileName = item.id;
    // const fileExtention = url.split('.').pop();
    const fileExtention = 'mp3';
    const fileFullName = fileName + '.' + fileExtention;

    console.log('file remote url', item.audioPath);
    console.log('fileName', fileName);
    console.log('fileExtention', fileExtention);
    console.log('fileFullName', fileFullName);
    RNFetchBlob.config({
      path: destinationPath + '/' + fileFullName,
      fileCache: true,
    })
      .fetch('GET', item.remoteUrl)
      .then(res => {
        console.log('The file saved to ', res.path());
        counter++;
        if (counter === urls.length) {
          console.log('function Finished');

          dispatch({
            type: wordsTypes.AUDIO_LOADING,
            payload: false,
          });
        }
      });
  });

  // handleGetFileList();
};

export const addAllUserWords =
  (nativeLang, learnedLang, level) => async dispatch => {
    console.log(
      ' getAllTheWords params : nativeLang : ',
      nativeLang,
      'learnedLang : ',
      learnedLang,
      'level : ',
      level,
    );
    const newData = [];
    const allUrlsToDownload = [];
    dispatch({
      type: wordsTypes.WORDS_LOADING,
      payload: true,
    });
    try {
      const destinationPath = RNFetchBlob.fs.dirs.DocumentDir + '/' + 'vokab';

      console.log('start addAllUserWords');
      const words = await getAllTheWords(level);
      words.forEach((item, index) => {
        newData.push({
          id: item.id,
          wordNativeLang: item[nativeLang].word,
          wordLearnedLang: item[learnedLang].word,
          wordLevel: item.level,
          audioPath: destinationPath + '/' + item.id + '.mp3',
          remoteUrl: item[learnedLang].audio,
          wordImage: item.image,
          defaultDay: item.defaultDay,
          defaultWeek: item.defaultWeek,
          passed: false,
          deleted: false,
        });
        allUrlsToDownload.push(item[learnedLang].audio);
      });
      console.log('words =>>>>>>>>>>>>', newData);
      console.log('audiosUrls =>>>>>>>>>>>>', allUrlsToDownload);
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
    dispatch({
      type: wordsTypes.AUDIO_LOADING,
      payload: true,
    });
    console.log('words =>>>>>>>>>>>>', newData);
    try {
      await downloadAudioOfLearnedLanguage(newData, dispatch);
    } catch (error) {
      dispatch({
        type: wordsTypes.AUDIO_LOADING,
        payload: false,
      });
    }
    // dispatch({
    //   type: wordsTypes.AUDIO_LOADING,
    //   payload: false,
    // });
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

const getAllTheWords = async level => {
  console.log(' getAllTheWords params : level : ', level);
  const ar = [];
  const q = query(
    collection(db, 'words'),
    where('level', '==', level),
    orderBy('id'),
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data().english.audio);
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
