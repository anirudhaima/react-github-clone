import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function BasicPagination(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    let { count, per_page } = props;

    count = Math.ceil(count / per_page);

    const handleChange = (event, value) => {
        props.setPage(value)
        setPage(value);
    };

    useEffect(() => {
        setPage(props.page)
    });

    return (
        <div className={classes.root}>
            <Pagination count={count} page={page} onChange={handleChange} color="primary" />
        </div>
    );
}