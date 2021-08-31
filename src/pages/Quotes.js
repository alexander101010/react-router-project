import QuoteList from '../components/quotes/QuoteList';

import { DUMMY_QUOTES as quotes } from '../store/dummy-quotes';

const Quotes = (props) => {
  return (
    <section>
      <h1>All Quotes 💬</h1>
      <QuoteList quotes={quotes} />
    </section>
  );
};

export default Quotes;
