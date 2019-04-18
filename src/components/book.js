import React from "react";
import * as BooksAPI from "./../lib/BooksAPI";

class Book extends React.Component {
  state = {
    avaliableShelfs: ["currentlyReading", "wantToRead"]
  };

  moveToOtherShelf = (event, book) => {
    const shelf = event.currentTarget.value;
    //onSortingBook
    BooksAPI.update(book, shelf)
      .then(result => {
        this.props.onSortingBook();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { book } = this.props;
    const { avaliableShelfs } = this.state;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${
                  book.imageLinks ? book.imageLinks.thumbnail : ""
                }")`
              }}
            />
            <div className="book-shelf-changer">
              <select
                onChange={event => this.moveToOtherShelf(event, book)}
                value={book.shelf}
              >
                <option value="move">Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>

          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    );
  }
}

export default Book;
