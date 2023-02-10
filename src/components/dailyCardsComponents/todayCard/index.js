import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS_THEME, FONTS, SIZES} from '../../../constants';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {collection, query, where, getDocs, limit} from 'firebase/firestore';
import {db} from '../../../firebase/utils';

const TodayCard = props => {
  const {defaultWordsBag} = props;
  const [renderWords, setRenderWords] = useState([]);
  const [isLess, setIsLess] = useState(true);
  const [visible, setVisible] = useState(true);
  const [suggWords, setSuggWords] = useState([]);
  const passedIds = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  useEffect(() => {
    setRenderWords([defaultWordsBag[0], defaultWordsBag[1]]);
  }, []);
  const loadMoreWords = () => {
    if (isLess) {
      setRenderWords(defaultWordsBag);
      setIsLess(false);
    } else {
      setRenderWords([defaultWordsBag[0], defaultWordsBag[1]]);
      setIsLess(true);
    }
  };
  const changeWord = () => {
    console.log('Start changeWord');
  };
  const disappearWord = () => {
    console.log('Start disappearBtn');
  };
  const loadSuggFromFirebase = async () => {
    console.log('Start loadSuggFromFirebase');
    const ar = [];
    const q = query(
      collection(db, 'words'),
      where('id', 'not-in', passedIds),
      limit(12),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data().english.audio);
      ar.push(doc.data());
    });
    setSuggWords(ar);
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
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonTxtStyle}>Start</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listOfWords}>
        {renderWords.map((item, index) => {
          return (
            <View key={index} style={styles.wordBox}>
              <Text style={styles.wordTxt}>{item.wordLearnedLang}</Text>
              <View style={styles.btnBox}>
                <TouchableOpacity
                  style={styles.changeBtn}
                  onPress={() => {
                    changeWord(item);
                  }}>
                  <FontAwesome name={'refresh'} size={20} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.disappearBtn}
                  onPress={() => {
                    disappearWord(item);
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView style={styles.listOfWord}>
              {renderWords.map((item, index) => {
                return (
                  <TouchableOpacity key={index} style={styles.wordSuggBox}>
                    <Text style={styles.wordSuggTxt}>
                      {item.wordLearnedLang}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <View style={styles.btnsWrapper}>
              <TouchableOpacity
                style={styles.confirmBtnStyle}
                onPress={loadSuggFromFirebase}>
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
};

export default TodayCard;

const styles = StyleSheet.create({
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
  listOfWord: {},
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
