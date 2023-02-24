import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS_THEME, FONTS, SIZES} from '../../../constants';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {collection, query, where, getDocs, limit} from 'firebase/firestore';
import {db} from '../../../firebase/utils';
import {useDispatch, useSelector} from 'react-redux';
import {
  loadSubList,
  modDefWoBag,
  modDefWoBagChange,
  modDefWoBagDelete,
} from '../../../redux/User/user.actions';
import {useNavigation} from '@react-navigation/native';

const mapState = ({user, words, loop}) => ({
  userId: user.userId,
  userNativeLang: user.userNativeLang,
  userLearnedLang: user.userLearnedLang,
  currentWeek: user.currentWeek,
  currentDay: user.currentDay,
  stepOfDefaultWordsBag: user.stepOfDefaultWordsBag,
  defaultWordsBag: user.defaultWordsBag,
  defaultWordsBagRoad: loop.defaultWordsBagRoad,
  subList: user.subList,
  allWords: words.words,
  isDefaultDiscover: user.isDefaultDiscover,
});

const TodayCard = props => {
  const {
    userId,
    userNativeLang,
    userLearnedLang,
    currentWeek,
    currentDay,
    stepOfDefaultWordsBag,
    defaultWordsBag,
    defaultWordsBagRoad,
    allWords,
    subList,
    isDefaultDiscover,
  } = useSelector(mapState);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [renderWords, setRenderWords] = useState([]);
  const [isLess, setIsLess] = useState(true);
  const [visible, setVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLoadSugg, setIsLoadSugg] = useState(false);
  const [suggWords, setSuggWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indexInDef, setIndexInDef] = useState(null);
  const [indexNew, setIndexNew] = useState(null);
  const [selected, setSelected] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const passedIds = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  useEffect(() => {
    // console.log('defaultWordsBag =>', defaultWordsBag);
    if (defaultWordsBag.length > 0) {
      setRenderWords([defaultWordsBag[0], defaultWordsBag[1]]);
      setLoading(false);
    } else {
      setRenderWords([]);
    }
  }, [defaultWordsBag]);
  const loadMoreWords = () => {
    if (isLess) {
      setRenderWords(defaultWordsBag);
      setIsLess(false);
    } else {
      setRenderWords([defaultWordsBag[0], defaultWordsBag[1]]);
      setIsLess(true);
    }
  };
  useEffect(() => {
    // console.log('defaultWordsBag today card comp =>', renderWords.length);
    loadSugg();
  }, []);
  useEffect(() => {
    if (allWords.length > 0) {
      if (subList.length === 0) {
        getIdsOfWordsBagForDelete()
          .then(res => {
            dispatch(loadSubList(allWords, res));
          })
          .catch(err => {
            console.log('error', err);
          });
      }
    }
  }, [subList]);
  const changeWordModal = async itemIndex => {
    console.log('Start changeWord');
    loadSugg();
    setVisible(true);
    setIndexInDef(itemIndex);
  };
  const getIdsOfWordsBag = async () => {
    const array = [];
    defaultWordsBag.forEach(item => {
      array.push(item.myId);
    });
    subList.forEach(item => {
      array.push(item.myId);
    });
    return array;
  };
  const loadSugg = async () => {
    setIsLoadSugg(true);
    // console.log('Start loadSugg');
    let counter = 0;
    const newData = [];
    const ids = await getIdsOfWordsBag();
    // console.log('our ids =>', ids);
    for (let i = 0; i < allWords.length; i++) {
      // if (!passedIds.includes(allWords[i].id)) {
      //!defaultWordsBag.inclueds(allWords[i])
      // console.log('allWords[i].myId =>', allWords[i].id);
      if (
        !allWords[i].passed &&
        !allWords[i].deleted &&
        !ids.includes(allWords[i].id)
      ) {
        newData.push({
          myId: allWords[i].id,
          wordNativeLang: allWords[i].wordNativeLang,
          wordLearnedLang: allWords[i].wordLearnedLang,
          wordLevel: allWords[i].wordLevel,
          audioPath: allWords[i].audioPath,
          wordImage: allWords[i].wordImage,
          indexInAllWords: i,
        });
        counter = counter + 1;
        if (counter > 3) {
          break;
        }
      }
    }
    // console.log('My Suggestion List is', newData);
    setSuggestions(newData);
    setIsLoadSugg(false);
  };
  const disappearWordModal = itemIndex => {
    console.log('Start disappearWord');
    setDeleteModalVisible(true);
    setIndexInDef(itemIndex);
  };
  const confirmDisappear = async () => {
    console.log('Start confirmDisappear');
    dispatch(modDefWoBagDelete(defaultWordsBag, indexInDef, subList, allWords));
    setDeleteModalVisible(false);
  };
  const confirmChange = async () => {
    console.log('Start confirmChange');
    dispatch(
      modDefWoBagChange(defaultWordsBag, indexInDef, suggestions[selected]),
    );
    setSelected(null);
    setVisible(false);
  };
  const getIdsOfWordsBagForDelete = async () => {
    const array = [];
    defaultWordsBag.forEach(item => {
      array.push(item.myId);
    });
    return array;
  };
  const goToLoop = () => {
    navigation.navigate('Loop', {
      idType: 0,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Day 2</Text>
      </View>
      <View style={styles.stepsWrapper}>
        <Text style={styles.stepTitle}>Discover</Text>
        <Text style={styles.stepTitle}>Practice</Text>
        <Text style={styles.stepTitle}>Master</Text>
      </View>
      <View style={styles.stepsShapeWrapper}>
        <View style={styles.stepsShape}>
          <View
            style={[
              styles.stepCircle,
              {backgroundColor: isDefaultDiscover === 0 ? '#000' : '#fff'},
            ]}></View>
          <View
            style={[
              styles.stepCircle,
              {backgroundColor: isDefaultDiscover === 1 ? '#000' : '#fff'},
            ]}></View>
          <View
            style={[
              styles.stepCircle,
              {backgroundColor: isDefaultDiscover === 2 ? '#000' : '#fff'},
            ]}></View>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            goToLoop();
          }}>
          <Text style={styles.buttonTxtStyle}>
            {stepOfDefaultWordsBag === 0
              ? isDefaultDiscover < 3
                ? 'Start' + isDefaultDiscover
                : 'Review' + isDefaultDiscover
              : 'Continue' + isDefaultDiscover}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listOfWords}>
        {!loading
          ? defaultWordsBag?.map((item, index) => {
              // console.log('item from list', item.myId);
              return (
                <View key={index} style={styles.wordBox}>
                  <Text style={styles.wordTxt}>{item.wordLearnedLang}</Text>
                  <View style={styles.btnBox}>
                    <TouchableOpacity
                      style={styles.changeBtn}
                      onPress={() => {
                        changeWordModal(index);
                      }}>
                      <FontAwesome name={'refresh'} size={20} color={'#000'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.disappearBtn}
                      onPress={() => {
                        disappearWordModal(index);
                      }}>
                      <Feather name={'eye-off'} size={20} color={'#fff'} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          : null}
      </View>
      <View style={styles.showMoreContainer}>
        <TouchableOpacity style={styles.showMore} onPress={loadMoreWords}>
          <Feather
            name={isLess ? 'more-horizontal' : 'arrow-up'}
            size={28}
            color={'#000'}
          />
        </TouchableOpacity>
      </View>
      {/* Change Modal Start */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView
              style={styles.listOfWord}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                width: '100%',
              }}>
              {!isLoadSugg ? (
                suggestions.map((item, index) => {
                  // console.log('item from modal', item.myId);
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        console.log('selected', item);
                        setSelected(index);
                      }}
                      key={index}
                      style={[
                        styles.wordSuggBox,
                        index === selected ? {backgroundColor: 'red'} : null,
                      ]}>
                      <Text style={styles.wordSuggTxt}>
                        {item.wordLearnedLang}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View style={styles.loaderWrapper}>
                  <ActivityIndicator size="large" color="#00ff00" />
                </View>
              )}
            </ScrollView>
            <View style={styles.btnsWrapper}>
              <TouchableOpacity
                disabled={selected === null}
                style={styles.confirmBtnStyle}
                onPress={confirmChange}>
                <Text style={styles.confirmBtnTxtStyle}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtnStyle}>
                <Text style={styles.cancelBtTxtnStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Delete Modal Start */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => {
          setDeleteModalVisible(!deleteModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {subList.length === 0 ? (
              <View style={styles.loaderWrapperDelete}>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
            ) : (
              <View style={styles.deleteView}>
                <Text>Are you sure you already know this word</Text>
              </View>
            )}

            <View style={styles.btnsWrapper}>
              <TouchableOpacity
                disabled={subList.length === 0}
                style={[
                  styles.confirmBtnStyle,
                  {opacity: subList.length === 0 ? 0.5 : 1},
                ]}
                onPress={confirmDisappear}>
                <Text style={styles.confirmBtnTxtStyle}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtnStyle}>
                <Text style={styles.cancelBtTxtnStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
  // return <></>;
};

export default TodayCard;

const styles = StyleSheet.create({
  masterCircle: {},
  practiceCircle: {},
  discoverCircle: {},
  stepsShapeWrapper: {
    paddingHorizontal: 10,
  },
  stepsShape: {
    backgroundColor: 'red',
    // width: '100%',
    height: 10,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff50',
  },
  stepCircle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  deleteView: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderWrapperDelete: {
    width: '100%',
    height: '50%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderWrapper: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordSuggTxt: {
    color: '#000',
    fontSize: 22,
    fontFamily: FONTS.enFontFamilyBold,
  },
  wordSuggBox: {
    // backgroundColor: COLORS_THEME.bgDark,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: COLORS_THEME.bgDark,
  },
  cancelBtTxtnStyle: {
    fontSize: 18,
    fontFamily: FONTS.enFontFamilyBold,
    color: '#000',
  },
  confirmBtnTxtStyle: {
    fontSize: 18,
    fontFamily: FONTS.enFontFamilyBold,
    color: '#fff',
  },
  confirmBtnStyle: {
    backgroundColor: 'green',
    width: '48%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cancelBtnStyle: {
    backgroundColor: 'yellow',
    width: '48%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listOfWord: {
    // backgroundColor: 'blue',
  },
  // Modal Style
  modalView: {
    width: '90%',
    height: 500,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    position: 'absolute',
    top: SIZES.height * 0.2,
    right: 0,
    left: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listOfWords: {
    marginTop: 20,
    width: '100%',
    // backgroundColor: 'red',
  },
  showMore: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  showMoreContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 20,
  },
  wordTxt: {
    color: '#fff',
    fontSize: 22,
    fontFamily: FONTS.enFontFamilyBold,
  },
  wordBox: {
    backgroundColor: '#00000030',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  btnBox: {
    flexDirection: 'row',
  },
  changeBtn: {
    backgroundColor: '#fff',
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  disappearBtn: {
    backgroundColor: '#1D1E37',
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  stepTitle: {
    color: '#fff',
    fontFamily: FONTS.enFontFamilyMedium,
  },
  stepsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonWrapper: {flexDirection: 'row', paddingHorizontal: 10},
  buttonTxtStyle: {
    fontSize: 24,
    fontFamily: FONTS.enFontFamilyBold,
    color: '#1D1E37',
  },
  buttonStyle: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontFamily: FONTS.enFontFamilyBold,
    color: '#fff',
  },
  titleWrapper: {
    width: '100%',
    paddingHorizontal: 10,
  },
  container: {
    backgroundColor: 'rgba(255,76,0,.8)',
    // backgroundColor: '#FF4C0080',
    // height: '100%',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    borderRadius: 20,
  },
});
