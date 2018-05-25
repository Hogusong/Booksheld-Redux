My first project to learn Redux : 

- open iTerminal from the main folder where you want to create a new project folder.
- run ‘create-react-app <project name>’ in the main  folder.
- A folder, <project name>, will be created and be ready to work.
- move into the project folder	→    here ‘bookshelf’
- run 'npm install --save redux react-redux’ into the project folder from iTerminal
- open project ‘bookshelf’ with Visual Studio or Atom.
- make new folders:  ‘actions, components, containers, reducers’ in ‘src’
- open ‘public/index.html’ and change ‘title’: 	‘React App’	→ 	‘My Bookshelf’
- combine 'App.css' and 'index.css' to 'index.css' : one CSS file 
- modify ‘src/index.js’
      import React from 'react';
      import ReactDOM from 'react-dom';
      import { Provider } from 'react-redux';
      import { createStore, applyMiddleware } from 'redux';
      import App from './components/App';
      import './index.css';
      import reducers from './reducers';		// search ‘index.js’ from 
      import registerServiceWorker from './registerServiceWorker';
      const createStoreWithMiddleware = applyMiddleware()(createStore);
      ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
          <App />
        </Provider>
        , document.getElementById('root')	);
      registerServiceWorker();
- move ‘App.js’ to ‘src/components’ folder from ‘src’ and modify it.
      import React, { Component } from 'react';
      import BookList from '../containers/book-list';
      import BookDetail from '../containers/book-detail';
      class App extends Component {
        render() {
          return (
              <div className=”container”>
                <BookList />
                <BookDetail />
              </div>
          );
        }
      }
      export default App;
- create ‘books.js’ in the ‘reducers’ folder to handle the book data as it is
- create ‘index.js’ in the ‘reducers’ folder to handle the Global state
      import { combineReducers } from 'redux';
      import BookReducer from './books';
      const rootReducer = combineReducers({
        books: BookReducer
      })
      export default rootReducer;
- create ‘book-list.js’ and ‘book-detail.js’ in the ‘containers’ folder
      import React, { Component } from 'react';
      export default class BookList extends Component {
        render() {
          return <div>Book List</div>
        }
      }
        - - - - - - - - - - -
      import React, { Component } from 'react';
      export default class BookDetail extends Component {
        render() {
          return <div>Book Detail</div>
        }
      }
- run ‘npm start’ in iTerminal from the project folder to see how it works.
- modity ‘book-list.js’ to list the data of ‘books.js’ up
      import React, { Component } from 'react';
      import { connect } from 'react-redux';
      class BookList extends Component {
        render() {
          if (!this.props.books) return <div>Bookshelf is empty now.</div>
          const bookshelf = this.props.books.map(book =>
              <li>{book.title}</li>
          )
          return (	<ul className="book-list">{ bookshelf }</ul> );
        }
      }
      // to connect the global 'state' into 'this.props' here
      function stateToProps(state) {
        return {   	books: state.books 	}
      }
      export default connect(stateToProps)(BookList);
- run ‘npm start’ in iTerminal from the project folder to see how it works.
- update ‘index.css' to make nice view of the browser
    for book-list 
- create ‘book-actions.js’ inside ‘actions’ folder to keep the global functions( now only one function )
      // selectBook is an ActionCreator, it needs to return an action,
      export function selectBook(book) {
        return {	type: 'BOOK_SELECTED',  payload: book  }
      }
- create ‘active-book’ inside folder ‘reducers’ to pass the selected book to ‘book-detail.js’
      export default function(state = null, action) {
        switch(action.type) {
          case 'BOOK_SELECTED':
              return action.payload;
          default:
              return state;
        }
      }
- add  “import ActiveBookReducer from './active-book'”  to ‘reducers/index.js’
- add  “activeBook: ActiveBookReducer” to ‘rootReducer’ in ‘reducers/index.js’
      import { combineReducers } from 'redux';
      import BookReducer from './books';
      import ActiveBookReducer from './active-book';
      const rootReducer = combineReducers({
        books: BookReducer,
        activeBook: ActiveBookReducer,
      })
      export default rootReducer;
- register the action ‘selectBook’ into ‘book-list.js’ and add it to each book list 
      import React, { Component } from 'react';
      import { connect } from 'react-redux';
      import { selectBook } from '../actions/book-actions';
      import { bindActionCreators } from 'redux';
      class BookList extends Component {
        bookList() {
          if (!this.props.books) return <div>Bookshelf is empty now.</div>
          const bookshelf = this.props.books.map(book =>
              <li key={book.title}
      id={(!this.props.activeBook || book.title !== this.props.activeBook.title) ? '' : 'selected'}
                onClick={() => this.props.selectBook(book)}>{book.title}</li>
          );
          return bookshelf;
        }
        render() {
          return (	<ul className="book-list">{ this.bookList() } </ul> );
        }
      }
      // to connect the global 'state' into 'this.props' here
      function stateToProps(state) {
        return {   books: state.books,   activeBook: state.activeBook }
      }
      function dispatchToProps(dispatch) {
        return bindActionCreators({ selectBook: selectBook }, dispatch);
      }
      export default connect(stateToProps, dispatchToProps)(BookList);
- modfy ‘book-detail.js’ to display the detail of the selected book.
      import React, { Component } from 'react';
      import { connect } from 'react-redux'
      class BookDetail extends Component {
        render() {
          if (!this.props.book) {
              return <div>Select any book to see the detail</div>;
          }
          return (
              <div className="detail">
                <h5>Detail of the book</h5>
                <p>Title: {this.props.book.title}</p>
                <p>Author: {this.props.book.author}</p>
                <p>Pages: {this.props.book.pages}</p>
              </div>
          );
        }
      }
      function stateToProps(state) {
        return {   book: state.activeBook }
      }
      export default connect(stateToProps)(BookDetail);




