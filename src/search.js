import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class Search extends Component {
  state = {
    query: ""
  };

  // this is updating my query state
  updateQuery = query => {
    this.setState({
      query
    });
  };

  render() {
    const { query } = this.state;

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
          */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
            {/*
            NOTES: {JSON.stringify(this.state.query)}
            is nice way to check our state
            */}
          </div>
        </div>
        <div className="search-books-results">
          {JSON.stringify(query)}
          <ol className="books-grid" />
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
