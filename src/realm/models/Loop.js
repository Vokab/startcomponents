import {Realm} from '@realm/react';

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
      defaultWordsBagRoad: 'Word[]',
      customWordsBagRoad: 'Word[]',
      reviewWordsBagRoad: 'Word[]',
    },
  };
}
