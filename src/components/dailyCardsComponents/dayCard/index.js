import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONTS} from '../../../constants';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DayCard = () => {
  const isThisDayPassed = false;
  return (
    <View style={[styles.container, {height: !isThisDayPassed ? 150 : null}]}>
      {isThisDayPassed ? (
        <View style={styles.titleWrapper}>
          <FontAwesome5
            name={'check-circle'}
            size={40}
            color="rgba(0, 0, 0, 0.9)"
            style={{marginBottom: 20}}
          />
          <Text style={styles.title}>
            Congratulation you finished this day words
          </Text>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                goToLoop();
              }}>
              <Text style={styles.buttonTxtStyle}>Test</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Fontisto name={'locked'} size={40} color="rgba(0, 0, 0, 0.7)" />
      )}

      {/* <View style={styles.cardDate}>
        <Text style={styles.cardDateTxt}>9 Wed</Text>
      </View> */}
      {/* <View style={styles.titleWrapper}>
        <Text style={styles.title}>Day 1</Text>
      </View> */}
      {/* <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonTxtStyle}>Take test</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default DayCard;

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  cardDateTxt: {
    fontSize: 14,
    fontFamily: FONTS.enFontFamilyBold,
    color: '#1D1E37',
  },
  cardDate: {
    position: 'absolute',
    width: 80,
    height: 30,
    backgroundColor: '#fff',
    top: 0,
    left: 0,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // buttonWrapper: {flexDirection: 'row'},
  buttonTxtStyle: {
    fontSize: 22,
    fontFamily: FONTS.enFontFamilyBold,
    color: '#ffffff',
    textAlign: 'center',
  },
  buttonStyle: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#1D1E37',
    marginTop: 20,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.enFontFamilyMedium,
    color: '#1D1E37',
    textAlign: 'center',
  },
  titleWrapper: {
    // width: '100%',
    // marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgb(209, 210, 213)',
    zIndex: 2,
    elevation: 2,
    position: 'relative',
    // height: '100%',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 50,
  },
});
