import styled, {css} from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary'| 'danger'| 'success';

interface IButtonContainerProps{
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: 'purple',
  secondary:'orange',
  danger: 'red',
  success:'green',
}

export const ButtonContainer = styled.button<IButtonContainerProps>`
  width: 100px;
  height: 40px;
  margin: 10px;
  background: ${props => props.theme['green-500'] };
  color: ${props=> props.theme.white};
  /* ${props =>{
    return css`
      background-color: ${buttonVariants[props.variant]}
    `
  }} */
`