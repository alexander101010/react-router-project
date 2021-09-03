import React, { Suspense } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import Quotes from './pages/Quotes';
// import QuoteShow from './pages/QuoteShow';
// import AddQuote from './pages/AddQuote';
// import NotFound from './pages/NotFound';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const AddQuote = React.lazy(() => import('./pages/AddQuote'));
const QuoteShow = React.lazy(() => import('./pages/QuoteShow'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className='centered'>
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path='/' exact>
            <Redirect to='/quotes' />
          </Route>
          <Route path='/react-router-project' exact>
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
      </Suspense>
    </Layout>
  );
}

export default App;
