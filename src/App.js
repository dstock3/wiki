import { useState } from 'react';
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
import NotFoundPage from './pages/NotFoundPage';
import EditUserPage from './pages/EditUserPage';
import EditPortalPage from './pages/EditPortalPage';
import './App.css';
import PortalsPage from './pages/PortalsPage';

function App() {
  const ENDPOINT= 'http://localhost:5000';

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
            <Route path="/create-portal" component={EditPortalPage} />
            <Route path="/portals" component={PortalsPage} />
            <Route path="/:portalid/article/create" component={EditArticlePage} />
            <Route path="/:portalid/article/:articleid/talk" component={TalkPage} />
            <Route path="/:portalid/article/:articleid/edit" component={EditArticlePage} />
            <Route path="/:portalid/article/:articleid" exact render={(props) => 
              <ArticlePage {...props} endpoint={ENDPOINT} />
            } />
            <Route path="/:portalid/edit" component={EditPortalPage} />
            <Route path="/:portalid" exact render={(props) => 
              <PortalHomePage {...props} endpoint={ENDPOINT} />
            } />
            <Route path="/search/:query" component={SearchResultsPage} />
            <Route path="/user/:username" exact component={UserProfilePage} />
            <Route path="/user/create" render={(props) => <EditUserPage {...props} />} />
            <Route path="/user/:username/edit" render={(props) => <EditUserPage {...props} />} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;