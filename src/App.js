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
import EditBlogPage from './pages/dynamic/EditBlogPage';
import './App.css';
import './styles/DarkTheme.css';
import BlogPage from './pages/dynamic/BlogPage';

function App() {
  /* const ENDPOINT = 'http://localhost:5000' */
  const ENDPOINT= 'https://shielded-ridge-83302-a11940a35896.herokuapp.com'; 
  const TITLE = 'WikiWise';
  const CONTACT = 'support@wikiwise.com'

  const [csrfToken, setCsrfToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <Router>
      <div className="app">
        <Header endpoint={ENDPOINT} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername} isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
        <div className="app-container">
          <Switch>
            <Route path="/wiki" exact render={(props) =>
              <HomePage title={TITLE} endpoint={ENDPOINT} />
            } />
            
            <Route path="/wiki/about" exact render={(props) => 
              <AboutPage title={TITLE} contact={CONTACT} />
            } />
            
            <Route path="/wiki/contact" exact render={(props) =>
              <ContactPage endpoint={ENDPOINT} title={TITLE} contact={CONTACT} />
            } />
            
            <Route path="/wiki/disclaimer" exact render={(props) =>
              <DisclaimerPage title={TITLE} contact={CONTACT} />
            } />
            
            <Route path="/wiki/contribute" exact render={(props) =>
              <ContributePage title={TITLE} />
            } />
            
            <Route path="/wiki/donate" exact render={(props) => 
              <DonatePage title={TITLE}/>
            } />
            
            <Route path="/wiki/blog" exact render={(props) =>
              <BlogPage title={TITLE} endpoint={ENDPOINT}/>
            } />
            
            <Route path="/wiki/terms" exact render={(props) =>
              <TOSPage title={TITLE} contact={CONTACT}/>
            } />

            <Route path="/wiki/privacy" exact render={(props) =>
              <PrivacyPage title={TITLE} contact={CONTACT} />
            } />

            <Route path="/wiki/create-account" exact render={(props) => 
              <CreateAccountPage title={TITLE} endpoint={ENDPOINT} />
            } />
            
            <Route path="/wiki/login" exact render={(props) =>
              <LoginPage title={TITLE} endpoint={ENDPOINT} setCsrfToken={setCsrfToken} setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername} />
            } />

            <Route path="/wiki/create-portal" exact render={(props) =>
              <EditPortalPage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} isDarkTheme={isDarkTheme} />
            } />

            <Route path="/wiki/portals" exact render={(props) => 
              <PortalsPage {...props} title={TITLE} endpoint={ENDPOINT} />
            } />
            
            <Route path="/wiki/search/:query" exact render={(props) =>
              <SearchResultsPage {...props} title={TITLE} endpoint={ENDPOINT} />
            } />

            <Route path="/wiki/:portalid/article/create" render={(props) =>
              <EditArticlePage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />

            <Route path="/wiki/:portalid/article/:articleid/talk" exact render={(props) => 
              <TalkPage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />

            <Route path="/wiki/:portalid/article/:articleid/talk/create" exact render={(props) => 
              <CreateTopicPage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />

            <Route path="/wiki/:portalid/article/:articleid/talk/:topicid/edit" exact render={(props) => 
              <CreateTopicPage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />

            <Route path="/wiki/:portalid/article/:articleid/edit" exact render={(props) => 
              <EditArticlePage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />

            <Route path="/wiki/:portalid/article/:articleid/:sectionid/edit" exact render={(props) => 
              <EditSectionPage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />

            <Route path="/wiki/:portalid/article/:articleid" exact render={(props) => 
              <ArticlePage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />
            
            <Route path="/wiki/:portalid/edit" exact render={(props) => 
              <EditPortalPage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />
            
            <Route path="/wiki/user/create" render={(props) => 
              <EditUserPage {...props} title={TITLE} endpoint={ENDPOINT} />}
            />
            
            <Route path="/wiki/user/:username" exact render={(props) =>
              <UserProfilePage {...props} title={TITLE} endpoint={ENDPOINT} />
            } />
            
            <Route path="/wiki/user/:username/edit" render={(props) =>
              <EditUserPage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />}
            />
            
            <Route path="/wiki/admin" exact render={(props) =>
              <AdminDashboard {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} contact={CONTACT} />
            } />

            <Route path="/wiki/create-blog" exact render={(props) =>
              <EditBlogPage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />

            <Route path="/wiki/edit-blog/:blogid" exact render={(props) =>
              <EditBlogPage {...props} title={TITLE} endpoint={ENDPOINT} csrfToken={csrfToken} />
            } />

            <Route path="/wiki/:portalid" exact render={(props) => 
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