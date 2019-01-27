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
      BooksAPI.search(query).then(searchedBooks => {
        // Search returns results
        if (searchedBooks.length > 0) {
          // Filter out searchedBooks that don't have thumbnail and then look for copies of books in the original books prop. If a match exists, take the shelf property of the book from main menu. Else set property to "none"
          searchedBooks = searchedBooks
            .filter(searchedBook => searchedBook.imageLinks)
            .map(searchedBook => {
              for (let book of this.props.books) {
                if (book.id === searchedBook.id) {
                  searchedBook.shelf = book.shelf;
                  return searchedBook;
                } else {
                  searchedBook.shelf = "none";
                }
              }
              return searchedBook;
            });
          this.setState({ showingBooks: searchedBooks });
        } else {
          this.setState({ showingBooks: [] });
        }
      });
    } else {
      this.setState({ showingBooks: [] });
    }
  };
  state = {
    query: "",
    books: []
  };

  // this is updating my query state
  updateQuery = query => {
    this.setState({
      query
    });
    BooksAPI.search(query).then(book => {
      this.setState({
        books
      });
    });
  };

  // BooksAPI.update(book, shelf)
  //   .then( ...)

  render() {
    const { query } = this.state;
    const { onSortingBook, title, book } = this.props;

    {
      /*
      const showingResults =
      query === ""
        ? query
        : query.filter(c =>
            c.title.toLowerCase().includes(query.toLowerCase())
          );
    */
    }

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
            {this.books.map(book => (
              <Book key={book.id} book={book} onSortingBook={onSortingBook} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;

// {
//   showingResults.map(book => (
//     <li>
//       <div
//         className="book-cover"
//         style={{
//           width: 128,
//           height: 193,
//           backgroundImage: `url("${
//             book.imageLinks ? book.imageLinks.thumbnail : ""
//           }")`
//         }}
//       />
//       <div className="book-title">{book.title}</div>
//       <div className="book-authors">{book.authors}</div>
//     </li>
//   ));
// }
