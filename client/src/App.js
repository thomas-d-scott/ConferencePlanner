import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/nav';
import Homepage from './pages/homepage';
import TalksPage from './pages/talkspage';
import SessionsPage from './pages/sessions';
import SchedulePage from './pages/schedulepage';
import AdminPage from './pages/adminpage';
import Footer from './components/footer';

/**
 * This is the overall app component which allows for it to be a SPA using switch and router
 */
function App() {
  return (
    <Router>

    <div className="App">

      <Nav/>

      <Switch>

        <Route path="/" exact component={Homepage} />
        <Route path="/talkspage" component={TalksPage} />
        <Route path="/sessionspage" component={SessionsPage} />
        <Route path="/schedulepage" component={SchedulePage} />
        <Route path='/adminpage' component={AdminPage}/>

      </Switch>

      <Footer />

    </div>

    </Router>
  );
}

export default App;
