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
  return {
    book: state.activeBook
  }
}

export default connect(stateToProps)(BookDetail);
