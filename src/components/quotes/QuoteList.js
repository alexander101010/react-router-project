import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import { sortQuotes } from '../../js/helpers';
import classes from './QuoteList.module.css';

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get('sort') === 'asc'; // get is built into URLSearchParams and 'sort' is the key in the query string

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    /*
    history.push('/quotes?sort=' + (isSortingAscending ? 'desc' : 'asc'));
    history.push(
      `${location.pathname}?sort=${isSortingAscending ? 'desc' : 'asc'}`
    );
    */

    // You can give Link or History an object instead of string to improve readability if your url is complex and dynamic
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? 'desc' : 'asc'}`,
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
