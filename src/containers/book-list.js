import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookList extends Component {
  render() {
    if (!this.props.books) return <div>Bookshelf is empty now.</div>
    const bookshelf = this.props.books.map(book =>
      <li>{book.title}</li>
    )
    return (
      <ul className="book-list">
        { bookshelf }
      </ul>
    );
  }
}

// to connect the global 'state' into 'this.props' here
function stateToProps(state) {
  return {
    books: state.books
  }
}
export default connect(stateToProps)(BookList);
