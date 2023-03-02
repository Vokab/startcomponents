import {Realm} from '@realm/react';

export class DaysBags extends Realm.Object {
  static schema = {
    name: 'DaysBags',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      day: 'int',
      week: 'int',
      step: 'int',
      words: 'string',
    },
  };
}
