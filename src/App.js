import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AnonRoute, PrivateRoute } from './components';
import AuthProvider from './context/authContext';
import { Theme, themes } from "./context/themeContext";
import { AddEvent, BackButton, EditEvent, EventsContainer, EventDetail, Heavies, Home, Nav, OfferDetail, Offers, Profile, ProfileUpdate, Register } from './views';
import './App.css';

class App extends Component {
  state = { theme: themes.dark }
  changeTheme = () => {
    console.log('changing theme');
    this.setState({ theme: this.state.theme.name === 'dark' ? themes.light : themes.dark });
  };
  render() {
    return (
      <AuthProvider>
        <Theme.Provider value={{theme: this.state.theme, changeTheme: this.changeTheme }}>
          <div className='App'>
            <Switch>
              <AnonRoute exact path='/' component={Home} />
              <AnonRoute exact path='/register' component={Register} />
              <PrivateRoute path='/' component={Layout} />
            </Switch>
          </div>
        </Theme.Provider>
      </AuthProvider>
    );
  }
}

class Layout extends Component {
  render() {
    return (
      <Theme.Consumer>
        {({ theme }) => {
          document.body.setAttribute('class', theme.name);
          return (
            <div className='layout'>
              <BackButton />
              <Route exact path='/events' component={EventsContainer} />
              <Route exact path='/events/:id' component={EventDetail} />
              <Route exact path='/events/:id/edit' component={EditEvent} />
              <Route exact path='/add-event' component={AddEvent} />
              <Route exact path='/heavies' component={Heavies} />
              <Route exact path='/offers' component={Offers} />
              <Route exact path='/offers/:id' component={OfferDetail} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/profile/edit' component={ProfileUpdate} />
              <Nav />
            </div>
          );
        }}
      </Theme.Consumer>
    );
  }
}

export default App;
