import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, Separator, StartCountDownButton } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <input id="task" />

          <label htmlFor="">Durante</label>
          <input type="number" id="minutesAmount" />

          <span>minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        
        <StartCountDownButton type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}