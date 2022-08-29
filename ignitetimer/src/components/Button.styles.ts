import styled, {css} from "styled-components";

export type ButtonVariant =  'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps{
    variant: ButtonVariant
}

const buttonvariants = {
    primary: 'purple',
    secondary: 'orange',
    danger: 'red',
    success: 'green'
}

export const ButtonContainer = styled.button <ButtonContainerProps>`
    width: 100px;
    height: 100px;

    background-color: ${props => props.theme["green-300"]};
    color: ${props => props.theme.white};
    margin: 8px;

    /* ${props => {
        return css`
        background-color: ${buttonvariants[props.variant]}
        `
    }} */
`