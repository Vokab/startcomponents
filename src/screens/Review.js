import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {collection, query, where, getDocs, limit} from 'firebase/firestore';
import {db} from '../firebase/utils';
import {useSelector} from 'react-redux';
import Sound from 'react-native-sound';

const {height, width} = Dimensions.get('window');

const mapState = ({user}) => ({
  userId: user.userId,
  userLearnedLang: user.userLearnedLang,
  currentWeek: user.currentWeek,
  currentDay: user.currentDay,
  stepOfDefaultWordsBag: user.stepOfDefaultWordsBag,
});

const Review = () => {
  const {
    userId,
    userLearnedLang,
    currentWeek,
    currentDay,
    stepOfDefaultWordsBag,
  } = useSelector(mapState);

  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);

  const getWordsOfThisDay = async () => {
    const ar = [];
    const q = query(
      collection(db, 'words'),
      where('defaultDay', '==', currentDay),
      limit(3),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data().english.audio);
      let obj = {
        itemId: doc.data().id,
        url: doc.data().english.audio,
      };
      ar.push(obj);
    });
    setUrls(ar);
  };

  const downloadAudioOfLearnedLanguage = async () => {
    console.log('Start Download Audio Of Learned Language');
    const destinationPath = RNFetchBlob.fs.dirs.DocumentDir + '/' + 'vokab';
    urls.forEach(item => {
      const fileName = item.itemId;
      // const fileExtention = url.split('.').pop();
      const fileExtention = 'mp3';
      const fileFullName = fileName + '.' + fileExtention;
      console.log('fileName', fileName);
      console.log('fileExtention', fileExtention);
      console.log('fileFullName', fileFullName);
      RNFetchBlob.config({
        path: destinationPath + '/' + fileFullName,
        fileCache: true,
      })
        .fetch('GET', item.url)
        .then(res => {
          console.log('The file saved to ', res.path());
        });
    });
    // handleGetFileList();
  };
  const downloadData = async () => {
    await getWordsOfThisDay();
    await downloadAudioOfLearnedLanguage();
    console.log('Download Successful');
  };
  const playThisFile = item => {
    console.log('start playThisFile', item);
    var audio = new Sound(item.path, null, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log(
        'duration in seconds: ' +
          audio.getDuration() +
          'number of channels: ' +
          audio.getNumberOfChannels(),
      );
      audio.play();
    });
  };
  useEffect(() => {
    // downloadData();
  }, []);

  async function handleGetFileList() {
    const path = RNFetchBlob.fs.dirs.DocumentDir + '/' + 'vokab';

    await RNFetchBlob.fs
      .isDir(path)
      .then(isDir => {
        console.log('isDir', isDir);
        if (isDir == true) {
          RNFetchBlob.fs
            .lstat(path)
            .then(filesList => {
              console.log('filesList', filesList);
              setFiles(filesList);
            })
            .catch(e => {
              console.log('Unable to get files list', e);
            });
        }
      })
      .catch(e => {
        console.log('Error isDir', e);
      });
  }

  function handleDownloadFile() {
    console.log('Hiii');
    const destinationPath = RNFetchBlob.fs.dirs.DocumentDir + '/' + 'vokab';
    const url =
      'https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg';
    const fileName = Date.now();
    const fileExtention = url.split('.').pop();
    const fileFullName = fileName + '.' + fileExtention;
    console.log('fileName', fileName);
    console.log('fileExtention', fileExtention);
    console.log('fileFullName', fileFullName);
    RNFetchBlob.config({
      path: destinationPath + '/' + fileFullName,
      fileCache: true,
    })
      .fetch('GET', url)
      .then(res => {
        console.log('The file saved to ', res.path());
        handleGetFileList();
      });
  }

  function handleDeleteFiles() {
    const path = RNFetchBlob.fs.dirs.DocumentDir + '/' + 'vokab';
    console.log('path =>', path);
    RNFetchBlob.fs
      .unlink(path)
      .then(() => {
        setFiles([]);
      })
      .catch(err => {});
  }

  const sortArray = () => {
    const passedWords = [
      {wordId: 0, score: 100, viewNbr: 1},
      {wordId: 1, score: 100, viewNbr: 1},
      {wordId: 2, score: 98, viewNbr: 1},
      {wordId: 3, score: 99, viewNbr: 1},
      {wordId: 4, score: 100, viewNbr: 1},
      {wordId: 5, score: 100, viewNbr: 1},
    ];
    console.log('passedWords before sorting =>', passedWords);
    passedWords.sort(function (a, b) {
      return a.score - b.score || a.viewNbr - b.viewNbr;
    });
    console.log('passedWords After sorting ++ =>', passedWords);
  };
  function renderItem({item, index}) {
    return (
      <Image
        source={{uri: 'file://' + item.path}}
        style={{
          height: 150,
          width: width / 4,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'black',
          margin: 10,
        }}
        resizeMode="cover"
      />
    );
  }
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{flex: 4, alignItems: 'center', justifyContent: 'space-around'}}>
        <TouchableOpacity
          onPress={sortArray}
          style={{
            height: 45,
            width: 150,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Sort Array</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleGetFileList}
          style={{
            height: 45,
            width: 150,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Get the files</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDownloadFile}
          style={{
            height: 45,
            width: 150,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Download the files</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDeleteFiles}
          style={{
            height: 45,
            width: 150,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Delete all files</Text>
        </TouchableOpacity>

        {/* <View style={{ height: '100%', width: 10 }} /> */}
      </View>
      {/* <ScrollView style={{flex: 6}}>
        {files?.map((item, index) => {
        renderItem(item)
        })}
      </ScrollView> */}

      <View style={{flex: 6}}>
        <FlatList
          data={files}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderItem}
          numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
};

export default Review;

const styles = StyleSheet.create({
  audioItem: {
    width: 211,
    height: 30,
    backgroundColor: 'red',
    marginVertical: 10,
  },
});
