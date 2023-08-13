import React from 'react';
import styled from 'styled-components';

// TODO: что еще нужно передать в универсальный компонент кнопки
interface ButtonProps {
    className: string;
    containerClassName?: string;
    content?: string;
    someStyles?: string;
}

const StyledButton = styled.button`
    background-color: transparent;
    border: 1px solid var(--primary);
    border-radius: var(--border-radius);
    color: var(--primary);
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        box-shadow: 20px 0 70px var(--primary);
    }
`;

export const Button: React.FC<ButtonProps> = ({ className, content }) => {
    return (
        <>
            <StyledButton className={className}>{content}</StyledButton>
        </>
    );
};
