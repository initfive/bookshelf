import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./../lib/BooksAPI";
import Book from "./../components/book";

class Search extends Component {
  state = {
    query: "",
    showingBooks: []
  };

  updateQuery = query => {
    this.setState({ query: query }, () => {
      this.searchBooks(this.state.query.trim());
    });
  };

  // Receives a query string and perform and API search
  searchBooks = query => {
    // Query exists
    if (query) {
      BooksAPI.search(query).then(books => {
        this.setState({ showingBooks: books });
      });
    } else {
      this.setState({ showingBooks: [] });
    }
  };

  render() {
    const { query } = this.state;
    const { onSortingBook } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" />
          <div className="search-books-input-wrapper">
            {/*
            NOTES: {JSON.stringify(this.state.query)}
          */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.showingBooks.map(book => (
              <Book book={book} key={book.id} onSortingBook={onSortingBook} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
