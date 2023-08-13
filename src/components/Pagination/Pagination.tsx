import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import styles from './Pagination.module.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

interface Props {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const TodoPagination: React.FC<Props> = ({
    totalPages,
    currentPage,
    onPageChange,
}) => {
    const classes = useStyles();

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        onPageChange(page);
    };

    return (
        <div className={classes.root}>
            <Pagination
                className={styles.pagination}
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="secondary"
            />
        </div>
    );
};

export default TodoPagination;
