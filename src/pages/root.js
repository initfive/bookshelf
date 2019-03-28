import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as BooksAPI from "./../lib/BooksAPI";

import Shelf from "./../components/shelf";

class Root extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.setAllBooksInState();
  }

  sortBooks = (event, book) => {
    // const { books } = this.state;
    //
    // // value the user selected
    // const { value } = event.target;
    //
    // // gets the book we want to update
    // const bookToUpdate = books.filter(b => b.id === book.id)[0];
    //
    // // updates the shelf property with the selected value
    // bookToUpdate.shelf = value;
    //
    // // gets the old book array, and omit the old book value
    // const booksArray = books.filter(b => b.id !== book.id);
    //
    // // push the updated book into the "new" books array, and update state
    // booksArray.push(bookToUpdate);
    //
    // // updates the state with new books array
    // this.setState({ books: booksArray });
  };

  setAllBooksInState = () => {
    BooksAPI.getAll().then(books => {
      this.setState({
        books
      });
    });
  };

  render() {
    const { books } = this.state;

    const currentlyReading = books.filter(
      book => book.shelf === "currentlyReading"
    );
    const wantToRead = books.filter(book => book.shelf === "wantToRead");
    const read = books.filter(book => book.shelf === "read");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>Bookshelf</h1>
        </div>
        <div className="list-books-content">
          <Shelf
            title="Currently Reading"
            books={currentlyReading}
            onSortingBook={this.setAllBooksInState}
          />
          <Shelf
            title="Want to Read"
            books={wantToRead}
            onSortingBook={this.setAllBooksInState}
          />
          <Shelf
            title="Read"
            books={read}
            onSortingBook={this.setAllBooksInState}
          />
        </div>
        <Link className="open-search" to="/search" />
      </div>
    );
  }
}

export default Root;
