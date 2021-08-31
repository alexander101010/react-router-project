import { useHistory } from 'react-router';
import QuoteForm from '../components/quotes/QuoteForm';

const AddQuote = () => {
  const history = useHistory();
  const addQuoteToArrayHandler = (quoteObj) => {
    console.log(quoteObj);

    // Navigate programitically to All Quotes ****
    // history.push - we can go back with history
    // history.replace - adds new page
    history.push('/quotes');
  };

  return (
    <section>
      <QuoteForm onAddQuote={addQuoteToArrayHandler} isLoading={false} />
    </section>
  );
};

export default AddQuote;
