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
  const TITLE = 'WikiWise';
  const CONTACT = 'support@wikiwise.com'

  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-container">
          <Switch>
            <Route path="/" exact render={(props) =>
              <HomePage title={TITLE}/>
            } />
            <Route path="/about" exact render={(props) => 
              <AboutPage title={TITLE} contact={CONTACT} />
            } />
            <Route path="/contact" exact render={(props) =>
              <ContactPage title={TITLE} contact={CONTACT} />
            } />
            <Route path="/disclaimer" component={DisclaimerPage} />
            <Route path="/contribute" component={ContributePage} />
            <Route path="/donate" component={DonatePage} />
            <Route path="/terms" component={TOSPage} />
            <Route path="/privacy" component={PrivacyPage} />

            <Route path="/create-account" exact render={(props) => 
              <CreateAccountPage {...props} endpoint={ENDPOINT} />
            } />
            
            <Route path="/login" exact render={(props) =>
              <LoginPage {...props} endpoint={ENDPOINT} />
            } />
            
            <Route path="/create-portal" exact render={(props) =>
              <EditPortalPage {...props} endpoint={ENDPOINT} />
            } />

            <Route path="/portals" exact render={(props) => 
              <PortalsPage {...props} endpoint={ENDPOINT} />
            } />

            <Route path="/:portalid/article/create" render={(props) =>
              <EditArticlePage {...props} endpoint={ENDPOINT} />
            } />

            <Route path="/:portalid/article/:articleid/talk" exact render={(props) => 
              <TalkPage {...props} endpoint={ENDPOINT} />
            } />

            <Route path="/:portalid/article/:articleid/edit" exact render={(props) => 
              <EditArticlePage {...props} endpoint={ENDPOINT} />
            } />

            <Route path="/:portalid/article/:articleid" exact render={(props) => 
              <ArticlePage {...props} endpoint={ENDPOINT} />
            } />
            
            <Route path="/:portalid/edit" exact render={(props) => 
              <EditPortalPage {...props} endpoint={ENDPOINT} />
            } />
            
            <Route path="/:portalid" exact render={(props) => 
              <PortalHomePage {...props} endpoint={ENDPOINT} />
            } />
            
            <Route path="/search/:query" exact render={(props) =>
              <SearchResultsPage {...props} endpoint={ENDPOINT} />
            } />

            <Route path="/user/:username" exact render={(props) =>
              <UserProfilePage {...props} endpoint={ENDPOINT} />
            } />
            
            <Route path="/user/create" render={(props) => 
              <EditUserPage {...props} endpoint={ENDPOINT} />}
            />
            
            <Route path="/user/:username/edit" render={(props) =>
              <EditUserPage {...props} endpoint={ENDPOINT} />}
            />
            
            <Route component={NotFoundPage} />
          </Switch>
          <Footer title={TITLE}/>
        </div>
      </div>
    </Router>
  );
}

export default App;