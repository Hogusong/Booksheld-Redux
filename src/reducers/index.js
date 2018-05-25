import { combineReducers } from 'redux';
import BookReducer from './books';

const rootReducer = combineReducers({
  books: BookReducer
})

export default rootReducer;
