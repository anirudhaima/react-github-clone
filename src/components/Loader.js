import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from '../context/AppContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));

const Loader = () => {
  const classes = useStyles();
  return (
    <AppContext.Consumer>

      {context =>
       context.loading && <div className={classes.root}>
          <LinearProgress variant="query" color="secondary" />
        </div>
      }

    </AppContext.Consumer>
  );
}

export default Loader;
