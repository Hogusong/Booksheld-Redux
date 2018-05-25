import { combineReducers } from 'redux';
import BookReducer from './books';
import ActiveBookReducer from './active-book';

const rootReducer = combineReducers({
  books: BookReducer,
  activeBook: ActiveBookReducer,
})

export default rootReducer;
