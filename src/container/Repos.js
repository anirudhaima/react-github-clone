import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import ListDividers from '../components/ListDividers';
import AppContext from '../context/AppContext';
import UserContext from '../context/UserContext';
import BasicPagination from '../components/BasicPagination'

const userContextData = (data) => {
    return {
        name: data.login,
        avatar_url: data.avatar_url,
        username: data.login
    }
}
const Repos = (props) => {

    const [repos, setRepo] = useState([]);
    const [page, setPage] = useState(1);
    const [fetched, setFetched] = useState(false);
    const [per_page, setPerPage] = useState(10);
    const context = useContext(UserContext);
    const appContext = useContext(AppContext);

    let { username } = context.user;
    let { public_repos } = props;
    let prevCountRef = useRef();
    useEffect(() => {
        if (username) {
            prevCountRef.current = username;
            getRepos()
        }

    }, [username, page]);

    const prevUsername = prevCountRef.current;


    const getRepos = async () => {

        if (typeof prevUsername != 'undefined' && prevUsername != username) {
            setPage(1)
        }
        appContext.setLoaded(true);
        axios({
            method: 'get',
            url: `https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}`,
            headers: { 'Authorization': "Token cebc43234dc7e89490959c283d6035aa098a3682"}
        })
            .then(({ data }) => {
                let newData = data.map((item) => {
                    return {
                        primary: item.name,
                        secondary: item.full_name
                    }
                })
                setRepo(newData);
                setFetched(true)
                // context.setLoaded(false);
                appContext.setLoaded(false);
                //context.setUser(userContextData(data));

            }).catch((error) => {
                alert('user not found');
                setRepo([]);
                appContext.setLoaded(false);
                //context.setLoaded(false);
            });

    }
    //context.setLoaded(true);

    return (
        <React.Fragment>
            {fetched && <ListDividers items={repos} />}
            {fetched && public_repos > per_page && < BasicPagination count={public_repos} page={page} per_page={per_page} setPage={setPage} />}
        </React.Fragment>
    );
}

export default Repos;
