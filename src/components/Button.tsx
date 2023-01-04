import { ButtonContainer, ButtonVariant } from './Button.styles';

interface ButtonPros {
    variant?:ButtonVariant;

}

export function Button({variant = 'primary' }: ButtonPros) {
    return <ButtonContainer variant={variant}> Enviar </ButtonContainer>
}