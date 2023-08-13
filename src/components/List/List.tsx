import React from 'react';
import { ListItem } from '@/components/ListItem/ListItem';

interface Props {
    items: ListItem[];
    renderItem: (item: ListItem) => React.ReactNode;
    listClassName?: string;
    itemClassName?: string;
}

const List: React.FC<Props> = ({
    items,
    renderItem,
    listClassName,
    itemClassName,
}) => {
    return (
        <ul className={`flex ${listClassName}`}>
            {items.map((item, index) => (
                <li key={index} className={`style-reset ${itemClassName}`}>
                    {renderItem(item)}
                </li>
            ))}
        </ul>
    );
};

export default List;
