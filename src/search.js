import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./book";

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
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.

            NOTES: {JSON.stringify(this.state.query)}
            is nice way to check our state
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
