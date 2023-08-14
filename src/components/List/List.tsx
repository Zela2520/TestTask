import React from 'react';
import styles from './List.module.scss';

interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

const List = <T,>({ items, renderItem }: ListProps<T>) => {
    return (
        <div className={`style-reset flex col ${styles.tasks}`}>
            {items.map((item) => renderItem(item))}
        </div>
    );
};

export default List;
