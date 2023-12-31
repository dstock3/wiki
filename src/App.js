import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/static/HomePage';
import ArticlePage from './pages/dynamic/ArticlePage';
import SearchResultsPage from './pages/dynamic/SearchResultsPage';
import TalkPage from './pages/dynamic/TalkPage';
import AboutPage from './pages/static/AboutPage';
import ContactPage from './pages/static/ContactPage';
import DisclaimerPage from './pages/static/DisclaimerPage';
import ContributePage from './pages/static/ContributePage';
import DonatePage from './pages/static/DonatePage';
import TOSPage from './pages/static/TOSPage';
import PrivacyPage from './pages/static/PrivacyPage';
import CreateAccountPage from './pages/dynamic/CreateAccountPage';
import PortalHomePage from './pages/dynamic/PortalHomePage';
import LoginPage from './pages/dynamic/LoginPage';
import EditArticlePage from './pages/dynamic/EditArticlePage';
import UserProfilePage from './pages/dynamic/UserProfilePage';
import NotFoundPage from './pages/static/NotFoundPage';
import EditUserPage from './pages/dynamic/EditUserPage';
import EditPortalPage from './pages/dynamic/EditPortalPage';
import PortalsPage from './pages/dynamic/PortalsPage';
import EditSectionPage from './pages/dynamic/EditSectionPage';
import CreateTopicPage from './pages/dynamic/CreateTopicPage';
import AdminDashboard from './pages/dynamic/AdminDashboard';
import './App.css';

function App() {
  const ENDPOINT= 'http://localhost:5000';
  const TITLE = 'WikiWise';
  const CONTACT = 'support@wikiwise.com'

  const [csrfToken, setCsrfToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <Router>
      <div className="app">
        <Header endpoint={ENDPOINT} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername} />
        <div className="app-container">
          <Switch>
            <Route path="/" exact render={(props) =>
              <HomePage title={TITLE}/>
            } />
            
            <Route path="/about" exact render={(props) => 
              <AboutPage title={TITLE} contact={CONTACT} />
            } />
            
            <Route path="/contact" exact render={(props) =>
              <ContactPage endpoint={ENDPOINT} title={TITLE} contact={CONTACT} />
            } />
            
            <Route path="/disclaimer" exact render={(props) =>
              <DisclaimerPage title={TITLE} contact={CONTACT} />
            } />
            
            <Route path="/contribute" exact render={(props) =>
              <ContributePage title={TITLE} />
            } />
            
            <Route path="/donate" exact render={(props) => 
              <DonatePage title={TITLE}/>
            } />
            
            <Route path="/terms" exact render={(props) =>
              <TOSPage title={TITLE} contact={CONTACT}/>
            } />

            <Route path="/privacy" exact render={(props) =>
              <PrivacyPage title={TITLE} contact={CONTACT} />
            } />

            <Route path="/create-account" exact render={(props) => 
              <CreateAccountPage title={TITLE} endpoint={ENDPOINT} />
            } />
            
            <Route path="/login" exact render={(props) =>
              <LoginPage title={TITLE} endpoint={ENDPOINT} setCsrfToken={setCsrfToken} setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername} />
            } />

            <Route path="/create-portal" exact render={(props) =>
              <EditPortalPage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />

            <Route path="/portals" exact render={(props) => 
              <PortalsPage {...props} title={TITLE} endpoint={ENDPOINT} />
            } />
            
            <Route path="/search/:query" exact render={(props) =>
              <SearchResultsPage {...props} title={TITLE} endpoint={ENDPOINT} />
            } />

            <Route path="/:portalid/article/create" render={(props) =>
              <EditArticlePage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />

            <Route path="/:portalid/article/:articleid/talk" exact render={(props) => 
              <TalkPage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />

            <Route path="/:portalid/article/:articleid/talk/create" exact render={(props) => 
              <CreateTopicPage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />

            <Route path="/:portalid/article/:articleid/talk/:topicid/edit" exact render={(props) => 
              <CreateTopicPage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />

            <Route path="/:portalid/article/:articleid/edit" exact render={(props) => 
              <EditArticlePage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />

            <Route path="/:portalid/article/:articleid/:sectionid/edit" exact render={(props) => 
              <EditSectionPage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />

            <Route path="/:portalid/article/:articleid" exact render={(props) => 
              <ArticlePage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />
            
            <Route path="/:portalid/edit" exact render={(props) => 
              <EditPortalPage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />
            
            <Route path="/user/create" render={(props) => 
              <EditUserPage {...props} title={TITLE} endpoint={ENDPOINT} />}
            />
            
            <Route path="/user/:username" exact render={(props) =>
              <UserProfilePage {...props} title={TITLE} endpoint={ENDPOINT} />
            } />
            
            <Route path="/user/:username/edit" render={(props) =>
              <EditUserPage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />}
            />
            
            <Route path="/admin" exact render={(props) =>
              <AdminDashboard {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} contact={CONTACT} />
            } />

            <Route path="/:portalid" exact render={(props) => 
              <PortalHomePage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />
            
            <Route render={(props) => <NotFoundPage title={TITLE} />} />
          </Switch>
          <Footer title={TITLE}/>
        </div>
      </div>
    </Router>
  );
}

export default App;