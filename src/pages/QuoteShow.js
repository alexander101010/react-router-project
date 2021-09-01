import { useEffect } from 'react';
import { Route, useParams, Link, useRouteMatch } from 'react-router-dom';

import { getSingleQuote } from '../lib/api';
import useHttp from '../hooks/use-http';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

const QuoteShow = () => {
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  const match = useRouteMatch();
  const params = useParams();
  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='centered focused'>
        <p>{error}</p>
      </div>
    );
  }

  if (status === 'completed' && !loadedQuote.text) {
    return (
      <div className='centered'>
        <p>No quote found </p>
      </div>
    );
  }

  return (
    <section>
      <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
      {/* <Route path={`/quotes/${params.quoteId}/`} exact> */}
      <Route path={match.path} exact>
        <div className='centered'>
          <Link className='btn--flat' to={`${match.url}/comments`}>
            View Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </section>
  );
};

export default QuoteShow;
