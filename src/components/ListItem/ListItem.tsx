import { ReactElement } from 'react';

export interface ListItem {
    id?: number;
    className: string;
    content: ReactElement;
    href: string;
}
