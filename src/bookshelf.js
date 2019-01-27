import React from "react";
import Book from "./book";

class Bookshelf extends React.Component {
  render() {
    const { onSortingBook, title, books } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <Book key={book.id} book={book} onSortingBook={onSortingBook} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
