import React,{useEffect,useContext} from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import { withRouter } from 'react-router-dom';
import TabPanel from '../components/TabPanel'
import Repos from './Repos';
import Followers from './Followers'
import Followings from './Followings'
import AppContext from '../context/AppContext';
import UserContext from '../context/UserContext';
const tabName = {
  0: 'repo', 1: 'followers', 2: 'following'
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    marginTop:88
  },
}));
const StyledBadge = withStyles(theme => ({
  badge: {
    right: -23,
    top: 11,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

function RightPanel(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const context = useContext(UserContext);
  let { username } = context.user;

  let { public_repos, followers, following } = props.data
  const handleChange = (event, newValue) => {
    setValue(newValue);
    let path = newValue > 0 ? `${props.location.pathname}?tab=${tabName[newValue]}` :
      `${props.location.pathname}`;
    props.history.push(path);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };
  useEffect(() => {
    setValue(0);
  },[username]);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab icon={<StyledBadge badgeContent={public_repos>0?public_repos:'0'} max={999} color="secondary">Repositories</StyledBadge>} {...a11yProps(0)} />
          <Tab icon={<StyledBadge badgeContent={followers>0?followers:'0'} max={999} color="secondary">Followers</StyledBadge>} {...a11yProps(1)} />
          <Tab icon={<StyledBadge badgeContent={following>0?following:'0'} max={999} color="secondary">Following</StyledBadge>}{...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Repos public_repos={public_repos} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Followers followers={followers}/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <Followings following={following}/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default withRouter(RightPanel);