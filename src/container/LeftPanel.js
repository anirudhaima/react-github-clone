import React, { useContext } from 'react';
import SimpleCard from '../components/SimpleCard';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from '../context/AppContext';
import UserContext from '../context/UserContext';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginTop:88,
        marginLeft:20
    },
    media: {
        height: 300,
    },
});

const LeftPanel = (props) => {
    const context = useContext(UserContext);
    const classes = useStyles();
    let { avatar_url ,name,username,bio,company} = context.user

    return (
        <>
            {/* <SimpleCard avatar_url={avatar_url} /> */}
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={avatar_url}
                        title={name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                            {username}
                        </Typography>
                        <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                            {bio}
                        </Typography>
                        <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                            {company}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
}

export default LeftPanel;
