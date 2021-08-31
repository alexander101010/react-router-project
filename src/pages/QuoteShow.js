import { Route, useParams } from 'react-router-dom';

import { DUMMY_QUOTES } from '../store/dummy-quotes';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const QuoteShow = () => {
  const params = useParams();

  const currentQuote = DUMMY_QUOTES.find(
    (quote) => quote.id === params.quoteId
  );

  if (!currentQuote) {
    return <p>Sorry, no quote found.</p>;
  }

  return (
    <section>
      <HighlightedQuote author={currentQuote.author} text={currentQuote.text} />
      <Route path='/quotes/:quoteId/comments'>
        <Comments />
      </Route>
    </section>
  );
};

export default QuoteShow;
