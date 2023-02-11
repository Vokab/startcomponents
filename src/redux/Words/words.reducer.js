import wordsTypes from './words.types';

const INITIAL_STATE = {
  words: [],
  wordsLoading: false,
};

const wordsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case wordsTypes.ADD_ALL_WORDS:
      return {
        ...state,
        words: action.payload,
      };
    case wordsTypes.CLEAR_ALL_WORDS:
      return {
        ...state,
        words: [],
      };
    case wordsTypes.WORDS_LOADING:
      return {
        ...state,
        wordsLoading: action.payload,
      };

    default:
      return state;
  }
};
export default wordsReducer;
