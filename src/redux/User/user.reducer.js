import userTypes from './user.types';

const INITIAL_STATE = {
  userId: null,
  userNativeLang: null,
  userLearnedLang: null,
  userLevel: null,
  startDate: null,
  currentWeek: null,
  currentDay: null,
  currentWord: 0,
  defaultWordsBag: [],
  defaultWordsBagIds: [],
  stepOfDefaultWordsBag: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.MODIFY_DEFAULT_WORDS_BAG:
      const updatedWordsBag = action.payload;
      return {
        ...state,
        defaultWordsBag: [...updatedWordsBag],
      };

    case userTypes.UPDATE_CURRENT_WORD:
      return {
        ...state,
        currentWord: action.payload,
      };
    case userTypes.ADD_TODAY_WORDSBAG:
      return {
        ...state,
        defaultWordsBag: action.payload,
        defaultWordsBagIds: action.arrOfIds,
      };
    case userTypes.CLEAR_TODAY_WORDSBAG:
      return {
        ...state,
        defaultWordsBag: [],
        defaultWordsBagIds: [],
        stepOfDefaultWordsBag: 0,
      };

    // AUTH
    case userTypes.USER_DATA_ADDED:
      return {
        ...state,
        userId: '1255',
        userNativeLang: 5,
        userLearnedLang: 1,
        userLevel: 1,
        startDate: '8-2-2023',
        currentWeek: 1,
        currentDay: 1,
        defaultWordsBag: [],
        defaultWordsBagIds: [],
        stepOfDefaultWordsBag: 0,
        currentWord: 0,
      };
    case userTypes.REDUX_DATA_CLEARED:
      return {
        ...state,
        userId: null,
        userNativeLang: null,
        userLearnedLang: null,
        userLevel: null,
        startDate: null,
        currentWeek: null,
        currentDay: null,
        defaultWordsBag: [],
        defaultWordsBagIds: [],
        stepOfDefaultWordsBag: 0,
        currentWord: 0,
      };

    default:
      return state;
  }
};
export default userReducer;
