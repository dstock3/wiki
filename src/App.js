import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import SearchResultsPage from './pages/SearchResultsPage';
import TalkPage from './pages/TalkPage';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="app-container">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/article/:id/talk" component={TalkPage} />
          <Route path="/article/:id" component={ArticlePage} />
          <Route path="/search/:query" component={SearchResultsPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;