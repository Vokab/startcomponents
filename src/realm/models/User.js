import {Realm} from '@realm/react';

export class User extends Realm.Object {
  // constructor(realm, description, userId) {
  //   super(realm, {description, userId: userId || '_SYNC_DISABLED_'});
  // }

  // To use a class as a Realm object type in JS, define the object schema on the static property "schema".
  static schema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      userNativeLang: 'int',
      userLearnedLang: 'int',
      userLevel: 'int',
      startDate: 'date',
      passedWordsIds: 'string[]',
      deletedWordsIds: 'string[]',
      currentWeek: 'int',
      currentDay: 'int',
      isPremium: 'bool',
    },
  };
}
