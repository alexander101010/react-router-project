import { useEffect } from 'react';
import { useHistory } from 'react-router';
import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const AddQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === 'completed') {
      history.push('/quotes');
    }
  }, [status, history]);

  const addQuoteHandler = (quoteObj) => {
    sendRequest(quoteObj);

    // Navigate programitically to All Quotes ****
    // history.push - we can go back with history
    // history.replace - adds new page, can't use back button
    // history.push('/quotes');
  };

  return (
    <section>
      <QuoteForm
        onAddQuote={addQuoteHandler}
        isLoading={status === 'pending'}
      />
    </section>
  );
};

export default AddQuote;
