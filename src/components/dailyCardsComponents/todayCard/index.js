import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import {COLORS_THEME, FONTS, SIZES} from '../../../constants';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {RealmContext} from '../../../realm/models';
import {User} from '../../../realm/models/User';
import {Loop} from '../../../realm/models/Loop';
import {Word} from '../../../realm/models/Word';
import Steps from '../../screensComponents/steps';

const {useQuery, useObject, useRealm} = RealmContext;

const TodayCard = props => {
  const realm = useRealm();
  const user = useQuery(User);
  const loop = useQuery(Loop);
  const words = useQuery(Word);
  const ourWords = useMemo(() => words.sorted('_id'), [words]);
  const navigation = useNavigation();
  const [isLess, setIsLess] = useState(true);
  const [visible, setVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLoadSugg, setIsLoadSugg] = useState(false);

  const [indexInDef, setIndexInDef] = useState(null);

  const [itemWillChange, setItemWillChange] = useState(null);
  const [itemWillDeleted, setItemWillDeleted] = useState(null);

  const [selected, setSelected] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const loadMoreWords = () => {};
  useEffect(() => {}, []);

  const changeWordModal = async (item, index) => {
    console.log('Start changeWord', item);
    const ids = await getIdsOfWordsBag();
    const idsQuery = ids.map(id => `_id != "${id}"`).join(' AND ');
    setItemWillChange(index);
    const newOnes = words.filtered(
      `(${idsQuery}) AND deleted != true AND passed != true`,
    );
    setSuggestions(newOnes);
    setVisible(true);
  };

  const getIdsOfWordsBag = async () => {
    const array = [];
    loop[0].defaultWordsBag.forEach(item => {
      array.push(item._id);
    });
    // console.log('array =>',array)
    return array;
  };
  const disappearWordModal = (item, index) => {
    console.log('Start disappearWord', item);
    setDeleteModalVisible(true);
    setItemWillDeleted(index);
  };
  const confirmDisappear = async () => {
    console.log('Start confirmDisappear');
    let itemWillMarkedDeleted = words.filtered(
      `"${loop[0].defaultWordsBag[itemWillDeleted]._id}" == _id `,
    );
    const ids = await getIdsOfWordsBag();
    const idsQuery = ids.map(id => `_id != "${id}"`).join(' AND ');
    const newOnes = words.filtered(
      `(${idsQuery}) AND deleted != true AND passed != true`,
    );
    try {
      realm.write(() => {
        itemWillMarkedDeleted[0].deleted = true;
        loop[0].defaultWordsBag[itemWillDeleted] = newOnes[0];
      });
    } catch (error) {
      console.log('error in marked it deleted =>', error);
    }
    setItemWillDeleted(null);
    setDeleteModalVisible(false);
  };
  const confirmChange = async () => {
    let itemWillCh = loop[0].defaultWordsBag[itemWillChange];
    console.log('itemWillCh =>', itemWillCh);
    try {
      realm.write(() => {
        loop[0].defaultWordsBag[itemWillChange] = selected;
      });
    } catch (error) {
      console.log('error in marked it deleted =>', error);
    }
    setItemWillChange(null);
    setSelected(null);
    setVisible(false);
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
      {<Steps stepOfWhat={0} />}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            goToLoop();
          }}>
          <Text style={styles.buttonTxtStyle}>
            {/* {0 === 0 ? (0 < 3 ? 'Start' + 1 : 'Review' + 1) : 'Continue' + 1} */}
            {loop[0].stepOfDefaultWordsBag === 0
              ? loop[0].isDefaultDiscover < 3
                ? 'Start' + loop[0].isDefaultDiscover
                : 'Review' + loop[0].isDefaultDiscover
              : 'Continue' + loop[0].isDefaultDiscover}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listOfWords}>
        {loop[0].defaultWordsBag.map((item, index) => {
          // console.log('item from list', item.myId);
          return (
            <View key={index} style={styles.wordBox}>
              <Text style={styles.wordTxt}>{item.wordLearnedLang}</Text>
              <View style={styles.btnBox}>
                <TouchableOpacity
                  style={styles.changeBtn}
                  onPress={() => {
                    changeWordModal(item, index);
                  }}>
                  <FontAwesome name={'refresh'} size={20} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.disappearBtn}
                  onPress={() => {
                    disappearWordModal(item, index);
                  }}>
                  <Feather name={'eye-off'} size={20} color={'#fff'} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
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
                        setSelected(item);
                      }}
                      key={index}
                      style={[
                        styles.wordSuggBox,
                        item?._id === selected?._id
                          ? {backgroundColor: 'red'}
                          : null,
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
            {loop[0].defaultWordsBag.length === 0 ? (
              <View style={styles.loaderWrapperDelete}>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
            ) : (
              <View style={styles.deleteView}>
                <Text>Are you sure you already know the word :</Text>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 20,
                    fontFamily: FONTS.enFontFamilyBold,
                  }}>
                  {loop[0].defaultWordsBag[itemWillDeleted]?.wordLearnedLang}
                </Text>
              </View>
            )}

            <View style={styles.btnsWrapper}>
              <TouchableOpacity
                disabled={loop[0].defaultWordsBag.length === 0}
                style={[
                  styles.confirmBtnStyle,
                  {opacity: loop[0].defaultWordsBag.length === 0 ? 0.5 : 1},
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
