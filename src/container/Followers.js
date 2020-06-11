import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import ListDividers from '../components/ListDividers';
import AppContext from '../context/AppContext';
import UserContext from '../context/UserContext';
import BasicPagination from '../components/BasicPagination'
import { Redirect } from 'react-router-dom';

const userContextData = (data) => {
    return {
        name: data.login,
        avatar_url: data.avatar_url,
        username: data.login
    }
}
const Followers = (props) => {

    const [followersList, setFollowersList] = useState([]);
    const [page, setPage] = useState(1);
    const [fetched, setFetched] = useState(false);
    const [per_page, setPerPage] = useState(10);
    const [redirectTo, setRedirect] = useState(null);
    const context = useContext(UserContext);
    const appContext = useContext(AppContext);
    let { username } = context.user;
    let { followers } = props;
    let prevCountRef = useRef();
    useEffect(() => {
        if (username) {
            prevCountRef.current = username;
            getFollowersList()
        }

    }, [username, page]);

    const prevUsername = prevCountRef.current;


    const getFollowersList = async () => {

        appContext.setLoaded(true);
        if (typeof prevUsername != 'undefined' && prevUsername != username) {
            setPage(1)
        }
        axios({
            method: 'get',
            url: `https://api.github.com/users/${username}/followers?page=${page}&per_page=${per_page}`,
            headers: { 'Authorization': `Token ${process.env.REACT_APP_TOKEN}`}
        })
            .then(({ data }) => {
                let newData = data.map((item) => {
                    return {
                        primary: item.login,
                        // secondary: item.full_name,
                        avatar:item.avatar_url,
                        link:`/user/${item.login}`
                    }
                })
                setFollowersList(newData);
                setFetched(true)
                appContext.setLoaded(false);
                //context.setUser(userContextData(data));

            }).catch((error) => {
                alert('user not found');
                setFollowersList([]);
                appContext.setLoaded(false);
            });

    }
    //context.setLoaded(true);



    return (
        <React.Fragment>
            {redirectTo && <Redirect to={{pathname: redirectTo}}/>}
            {fetched && <ListDividers items={followersList} onRedirectTo={setRedirect} />}
            {fetched && followers > per_page && < BasicPagination count={followers} page={page} per_page={per_page} setPage={setPage} />}
        </React.Fragment>
    );
}

export default Followers;
