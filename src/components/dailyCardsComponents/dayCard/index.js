import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONTS} from '../../../constants';

const DayCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardDate}>
        <Text style={styles.cardDateTxt}>9 Wed</Text>
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Day 1</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonTxtStyle}>Take test</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DayCard;

const styles = StyleSheet.create({
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
  buttonWrapper: {flexDirection: 'row'},
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
    marginTop: 20,
  },
  container: {
    backgroundColor: 'rgba(255,76,0,.4)',
    height: '100%',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'space-around',
    borderRadius: 20,
  },
});
