import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS_THEME} from '../../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FONTS} from '../../../constants';

const ReviewHeader = () => {
  const reviewExplinationModal = () => {
    console.log('reviewExplinationModal start');
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}></View>
      <View style={[styles.reviewHeaderBox, styles.headerBox]}>
        <Text style={styles.reviewHeader}>Review</Text>
      </View>
      <View style={[styles.headerIcon, styles.headerBox]}>
        <TouchableOpacity
          onPress={() => {
            reviewExplinationModal();
          }}>
          <AntDesign name="exclamationcircleo" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewHeader;

const styles = StyleSheet.create({
  headerBox: {
    width: '33.3333333%',
  },
  headerIcon: {alignItems: 'flex-end'},
  reviewHeaderBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewHeader: {
    color: '#fff',
    fontFamily: FONTS.enFontFamilyBold,
    fontSize: 24,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
});
