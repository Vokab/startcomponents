import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RealmContext} from '../../../realm/models';
import {User} from '../../../realm/models/User';
import {Loop} from '../../../realm/models/Loop';
import {Word} from '../../../realm/models/Word';
import {FONTS} from '../../../constants';

const {useQuery, useObject, useRealm} = RealmContext;

const Steps = props => {
  const realm = useRealm();
  const user = useQuery(User);
  const loop = useQuery(Loop);
  const words = useQuery(Word);
  const {stepOfWhat} = props;
  return (
    <View style={styles.stepContainer}>
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
              {
                backgroundColor:
                  stepOfWhat === 0
                    ? loop[0].isDefaultDiscover === 0
                      ? '#000'
                      : '#fff'
                    : loop[0].isCustomDiscover === 0
                    ? '#000'
                    : '#fff',
              },
            ]}></View>
          <View
            style={[
              styles.stepCircle,
              {
                backgroundColor:
                  stepOfWhat === 0
                    ? loop[0].isDefaultDiscover === 1
                      ? '#000'
                      : '#fff'
                    : loop[0].isCustomDiscover === 1
                    ? '#000'
                    : '#fff',
              },
            ]}></View>
          <View
            style={[
              styles.stepCircle,
              {
                backgroundColor:
                  stepOfWhat === 0
                    ? loop[0].isDefaultDiscover === 2
                      ? '#000'
                      : '#fff'
                    : loop[0].isCustomDiscover === 2
                    ? '#000'
                    : '#fff',
              },
            ]}></View>
        </View>
      </View>
    </View>
  );
};

export default Steps;

const styles = StyleSheet.create({
  stepContainer: {
    // paddingHorizontal: 20,
    marginVertical: 20,
  },
  stepsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  stepTitle: {
    color: '#fff',
    fontFamily: FONTS.enFontFamilyMedium,
  },
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
});
