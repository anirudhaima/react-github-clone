import React, { useEffect, useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import SimpleCard from '../components/SimpleCard'
import RightPanel from './RightPanel';
import LeftPanel from './LeftPanel';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../context/AppContext';
import UserContext from '../context/UserContext';

const userContextData = (data) => {
    return {
        name: data.name || data.login,
        avatar_url: data.avatar_url,
        username: data.login,
        bio: data.bio,
        company: data.company
    }
}
const Home = () => {
    const [user, setUserData] = useState([]);
    const { username } = useParams()
    const context = useContext(UserContext);
    const appContext = useContext(AppContext);

    useEffect(() => {
        getUser()
    }, [username]);

    const getUser = async () => {
        appContext.setLoaded(true);
        axios({
            method: 'get',
            url: `https://api.github.com/users/${username}`,
            headers: { 'Authorization': `Token ${process.env.REACT_APP_TOKEN}`}
        }).then(({ data }) => {
            setUserData(data);
            appContext.setLoaded(false);
            context.setUser(userContextData(data));
        }).catch((error) => {
            alert('user not found');
            setUserData([]);
             appContext.setLoaded(false);
        });

    }

    return (
        <Grid container >
            <Grid item xs={4}>
                <LeftPanel data={user} />
            </Grid>
            <Grid item xs={8}>
                <RightPanel data={user} />
            </Grid>
        </Grid>
    );
}

export default Home;
