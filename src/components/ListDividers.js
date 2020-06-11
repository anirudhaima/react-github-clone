import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListDividers(props) {
  const classes = useStyles();
  let { items, onRedirectTo } = props ? props : [];

  const onClick = (event, link) => {
    event.preventDefault()
    if (onRedirectTo instanceof Function) {
      onRedirectTo(link)
    }
  };
  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {
        items.map((item, index) =>
          <React.Fragment key={index}>

            <ListItem button>
              {item.avatar && <ListItemAvatar>
                <Avatar alt={`${item.primary}`} src={item.avatar} />
              </ListItemAvatar>
              }
              <Link color="inherit" href="#" onClick={(e) => onClick(e, item.link)} >
                <ListItemText primary={`${item.primary}`} secondary={`${item.secondary ? item.secondary : ''}`} />
              </Link>
            </ListItem>

            <Divider />
          </React.Fragment>
        )
      }
    </List>
  );
}
