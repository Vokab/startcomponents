import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONTS} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {addUserData, clearUserData} from '../redux/User/user.actions';
const Custom = () => {
  const dispatch = useDispatch();
  const addDataToRedux = () => {
    dispatch(addUserData());
    console.log('addDataToRedux');
  };
  const clearRedux = () => {
    dispatch(clearUserData());
    console.log('clearRedux');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addBtn} onPress={addDataToRedux}>
        <Text style={styles.addBtnTxt}>Add Data to Redux</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearBtn} onPress={clearRedux}>
        <Text style={styles.clearBtnTxt}>Clear Redux</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Custom;

const styles = StyleSheet.create({
  clearBtnTxt: {
    color: '#d7d1d1',
    fontSize: 20,
    fontFamily: FONTS.enFontFamilyBold,
  },
  clearBtn: {
    minWidth: 250,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#7fb113',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  addBtn: {
    // width: 200,
    minWidth: 250,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  addBtnTxt: {
    color: '#000',
    fontSize: 20,
    fontFamily: FONTS.enFontFamilyBold,
  },
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
