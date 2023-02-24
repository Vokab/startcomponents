import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReviewHeader from '../components/screensComponents/header';
import ShadowEffect from '../../assets/shadowImg.png';
import {FONTS, SIZES} from '../constants';
import HintHeader from '../components/screensComponents/hintHeader';
import ReviewWordComp from '../components/screensComponents/reviewWord';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

const mapState = ({user, words}) => ({
  userId: user.userId,
  userNativeLang: user.userNativeLang,
  userLearnedLang: user.userLearnedLang,
  userLevel: user.userLevel,
  currentWeek: user.currentWeek,
  currentDay: user.currentDay,
  stepOfDefaultWordsBag: user.stepOfDefaultWordsBag,
  defaultWordsBag: user.defaultWordsBag,
  allWords: words.words,
  wordsLoading: words.wordsLoading,
  audioLoading: words.audioLoading,
  daysBags: user.daysBags,
  currentWeek: user.currentWeek,
  currentDay: user.currentDay,
});

const Profile = () => {
  const {
    userId,
    userNativeLang,
    userLearnedLang,
    userLevel,
    currentWeek,
    currentDay,
    daysBags,
    stepOfDefaultWordsBag,
    defaultWordsBag,
    allWords,
    wordsLoading,
    audioLoading,
  } = useSelector(mapState);

  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const arr = [];
  const buildBags = () => {
    for (let i = 0; i < daysBags.length; i++) {
      arr.push(
        <View key={i} style={[styles.reviewBagsContainer]}>
          <View style={styles.leftLine}></View>
          <View style={{width: '100%'}}>
            <View style={styles.reviewBagHeader}>
              <View style={styles.bagTitle}>
                <Text style={styles.bagTitleTxt}>Bag {i}</Text>
              </View>
              <View style={styles.bagActions}>
                <View style={styles.btnActionWrapper}>
                  <TouchableOpacity style={styles.reviewBtnStyle}>
                    <Text style={styles.reviewBtnStyleTxt}>Review</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.closeBagStyle}>
                    <MaterialIcons name="expand-more" size={28} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.reviewWordsContainer}>
              <ReviewWordComp word={'candlelight'} />
              <ReviewWordComp word={'eagle'} />
              <ReviewWordComp word={'bell'} />
              <ReviewWordComp word={'victory'} />
              <ReviewWordComp word={'candlelight'} />
              <ReviewWordComp word={'eagle'} />
              <ReviewWordComp word={'bell'} />
              <ReviewWordComp word={'victory'} />
              <ReviewWordComp word={'candlelight'} />
              <ReviewWordComp word={'eagle'} />
              <ReviewWordComp word={'bell'} />
              <ReviewWordComp word={'victory'} />
            </View>
          </View>
        </View>,
      );
    }
    setItems(arr);
  };
  useEffect(() => {
    // console.log('Our review content =>', daysBags[0]);
    buildBags();
  }, []);

  return (
    <View style={styles.screenWrapper}>
      <Image source={ShadowEffect} style={styles.shadowImageBg} />
      <View style={styles.reviewBagContainer}>
        <ReviewHeader />
        {/* <HintHeader text={'Add at least 6 words to start your review bag'} /> */}
        <View style={styles.bagContainer}>
          <View style={styles.bagContent}>
            <HintHeader
              text={'Add at least 6 words to start your review bag'}
            />
            {/* <View style={styles.wordInBagBox}>
              <Text style={styles.wordInBagTxt}>eagle</Text>
              <TouchableOpacity style={styles.removeWord}>
                <Ionicons name="ios-close-circle" size={24} color="#000" />
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.goBtnStyle}>
            <Text style={styles.goBtnStyleTxt}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {/* {items} */}
        {daysBags.map((bag, index) => {
          return (
            <View key={index} style={[styles.reviewBagsContainer]}>
              <View style={styles.leftLine}></View>
              <View style={{width: '100%'}}>
                <View style={styles.reviewBagHeader}>
                  <View style={styles.bagTitle}>
                    <Text style={styles.bagTitleTxt}>Bag {index}</Text>
                  </View>
                  <View style={styles.bagActions}>
                    <View style={styles.btnActionWrapper}>
                      <TouchableOpacity style={styles.reviewBtnStyle}>
                        <Text style={styles.reviewBtnStyleTxt}>Review</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.closeBagStyle}>
                        <MaterialIcons
                          name="expand-more"
                          size={28}
                          color="#fff"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={styles.reviewWordsContainer}>
                  {bag.words.map((item, index) => {
                    return (
                      <ReviewWordComp
                        key={index}
                        wordItem={item}
                        word={'candlelight'}
                      />
                    );
                  })}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  bagContent: {
    flexDirection: 'row',
    padding: 5,
    flexWrap: 'wrap',
  },
  wordInBagTxt: {
    fontSize: 18,
    fontFamily: FONTS.enFontFamilyMedium,
    color: '#1D1E37',
  },
  removeWord: {
    marginLeft: 5,
  },
  wordInBagBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    marginHorizontal: 2,
  },
  leftLine: {
    width: 5,
    backgroundColor: '#fff',
    height: '100%',
  },
  btnActionWrapper: {
    flexDirection: 'row',
  },
  reviewBtnStyleTxt: {
    color: '#fff',
    fontFamily: FONTS.enFontFamilyBold,
    fontSize: 16,
  },
  closeBagStyle: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 6,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewBtnStyle: {
    borderWidth: 2,
    borderColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 6,
  },
  bagActions: {},
  bagTitleTxt: {
    fontFamily: FONTS.enFontFamilyBold,
    color: '#1D1E37',
    fontSize: 18,
  },
  bagTitle: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    width: 100,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  reviewBagHeader: {
    // backgroundColor: 'yellow',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewBagsContainer: {
    // backgroundColor: 'rgba(255,255,255,0.1)',
    // height: 150 + 12 + 50,
    flexDirection: 'row',
    marginBottom: 30,
  },
  reviewWordsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'flex-start',
    width: SIZES.width - 5,
    flexWrap: 'wrap',
    // backgroundColor: 'red',
    // marginLeft: 10,
    paddingHorizontal: 8,
  },
  goBtnStyleTxt: {
    color: '#fff',
    fontSize: 22,
    fontFamily: FONTS.enFontFamilyMedium,
  },
  btnWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBtnStyle: {
    width: '60%',
    backgroundColor: '#FF4C00',
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  bagContainer: {
    width: '94%',
    marginHorizontal: '3%',
    height: 120,
    marginVertical: 15,
    backgroundColor: '#1D1E37',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.5)',
  },
  reviewBagContainer: {
    width: '100%',
    // height: 300,
    backgroundColor: 'rgba(29,30,55,.6)',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingBottom: 20,
    marginBottom: 15,
  },
  shadowImageBg: {
    width: 400,
    height: 500,
    opacity: 0.25,
    position: 'absolute',
    top: 0,
    left: SIZES.width / 2 - 200,
    // backgroundColor: 'red',
  },
  screenWrapper: {
    backgroundColor: '#181920',
    flex: 1,
    width: '100%',
  },
});
