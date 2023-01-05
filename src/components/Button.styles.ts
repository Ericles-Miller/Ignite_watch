import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface IButtonContainerProps {
  variant: ButtonVariant
}

export const ButtonContainer = styled.button<IButtonContainerProps>`
  width: 100px;
  height: 40px;
  margin: 10px;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
`
