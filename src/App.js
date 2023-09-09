import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import SearchResultsPage from './pages/SearchResultsPage';
import TalkPage from './pages/TalkPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DisclaimerPage from './pages/DisclaimerPage';
import ContributePage from './pages/ContributePage';
import DonatePage from './pages/DonatePage';
import TOSPage from './pages/TOSPage';
import PrivacyPage from './pages/PrivacyPage';
import CreateAccountPage from './pages/CreateAccountPage';
import PortalHomePage from './pages/PortalHomePage';
import LoginPage from './pages/LoginPage';
import EditArticlePage from './pages/EditArticlePage';
import UserProfilePage from './pages/UserProfilePage';
import UserTalkPage from './pages/UserTalkPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-container">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/disclaimer" component={DisclaimerPage} />
            <Route path="/contribute" component={ContributePage} />
            <Route path="/donate" component={DonatePage} />
            <Route path="/terms" component={TOSPage} />
            <Route path="/privacy" component={PrivacyPage} />
            <Route path="/create-account" component={CreateAccountPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/:portalid/article/:id/talk" component={TalkPage} />
            <Route path="/:portalid/article/:id/edit" component={EditArticlePage} />
            <Route path="/:portalid/article/:id" component={ArticlePage} />
            <Route path="/:portalid" exact component={PortalHomePage} />
            <Route path="/search/:query" component={SearchResultsPage} />
            <Route path="/user/:username" component={UserProfilePage} />
            <Route path="/user/:username/talk" component={UserTalkPage} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;