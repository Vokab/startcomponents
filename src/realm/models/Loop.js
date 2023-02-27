import {Realm} from '@realm/react';

export class Road extends Realm.Object {
  // constructor(realm, description, userId) {
  //   super(realm, {description, userId: userId || '_SYNC_DISABLED_'});
  // }

  // To use a class as a Realm object type in JS, define the object schema on the static property "schema".
  static schema = {
    name: 'Road',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      screen: 'int',
      wordObj: 'Word',
    },
  };
}

export class Loop extends Realm.Object {
  // constructor(realm, description, userId) {
  //   super(realm, {description, userId: userId || '_SYNC_DISABLED_'});
  // }

  // To use a class as a Realm object type in JS, define the object schema on the static property "schema".
  static schema = {
    name: 'Loop',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      defaultWordsBag: 'Word[]',
      customWordsBag: 'Word[]',
      reviewWordsBag: 'Word[]',
      defaultWordsBagRoad: 'string[]',
      customWordsBagRoad: 'Word[]',
      reviewWordsBagRoad: 'Word[]',
      stepOfDefaultWordsBag: 'int',
      stepOfCustomWordsBag: 'int',
      stepOfReviewWordsBag: 'int',
      isDefaultDiscover: 'int',
      isCustomDiscover: 'int',
    },
  };
}
