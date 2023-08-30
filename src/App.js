import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import SearchResultsPage from './pages/SearchResultsPage';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/article/:id" component={ArticlePage} />
        <Route path="/search/:query" component={SearchResultsPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;