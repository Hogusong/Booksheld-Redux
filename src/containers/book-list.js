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
    return (
      <ul className="book-list">
        { this.bookList() }
      </ul>
    );
  }
}

// to connect the global 'state' into 'this.props' here
function stateToProps(state) {
  return {
    books: state.books,
    activeBook: state.activeBook
  }
}
function dispatchToProps(dispatch) {
  return bindActionCreators({ selectBook: selectBook }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(BookList);
