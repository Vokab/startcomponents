import {createRealmContext} from '@realm/react';
import {Loop, Road} from './Loop';
import {TaskV3, TaskV4} from './Task';
import {User} from './User';
import {Word} from './Word';

export const RealmContext = createRealmContext({
  schema: [TaskV4, Word, User, Loop, Road],
  schemaVersion: 17,
});
// TaskRealmContextV2
export const schemas = [TaskV3.schema, TaskV4.schema];
export const schemaVersion = 7;
export const runMigration = () => {
  const realm = new Realm({
    schema: schemas,
    schemaVersion: schemaVersion,
    migration: (oldRealm, newRealm) => {},
  });

  realm.close();
};
