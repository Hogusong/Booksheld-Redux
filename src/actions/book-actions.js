export function selectBook(book) {
  // selectBook is an ActionCreator, it needs to return an action,
  return {
    type: 'BOOK_SELECTED',
    payload: book
  }
}
