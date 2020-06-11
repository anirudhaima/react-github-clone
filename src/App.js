import React, { useState, useContext } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
//component

import Header from './container/Header';
import Home from './container/Home';
//context
import AppData from './context/AppData';
import AppContext from './context/AppContext';
import UserData from './context/UserData';
import UserContext from './context/UserContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));

export default function App() {
  const classes = useStyles();

  const setLoaded = (loading) => {
    setAppData({ ...appContextData, loading })
  }
  const setUser = (user) => {
    setUserData({ ...userContextData, user })
  }
  const [userContextData, setUserData] = useState({ ...UserData, setUser });
  const [appContextData, setAppData] = useState({ ...AppData, setLoaded });

  return (
    <AppContext.Provider value={appContextData} >
      <UserContext.Provider value={userContextData} >
        <div className={classes.root}>
          <Header />
         
          <Switch>
            <Route path='/user/:username' component={Home}></Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </AppContext.Provider >
  );
}
