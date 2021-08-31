import { Route, Switch, Redirect } from 'react-router-dom';

import Quotes from './pages/Quotes';
import QuoteShow from './pages/QuoteShow';
import AddQuote from './pages/AddQuote';
import NotFound from './pages/NotFound';

import Layout from './components/layout/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/quotes' />
        </Route>
        <Route path='/quotes' exact>
          <Quotes />
        </Route>
        <Route path='/quotes/:quoteId'>
          <QuoteShow />
        </Route>
        <Route path='/new-quote'>
          <AddQuote />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
