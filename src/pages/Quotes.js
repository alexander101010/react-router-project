import { useEffect } from 'react';

import QuoteList from '../components/quotes/QuoteList';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';

const Quotes = (props) => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className='centered focused'>{error}</div>;
  }

  if ((status === 'completed' && !loadedQuotes) || loadedQuotes.length === 0) {
    return (
      <div className='centered'>
        <NoQuotesFound />
      </div>
    );
  }

  return (
    <section>
      <QuoteList quotes={loadedQuotes} />
    </section>
  );
};

export default Quotes;
