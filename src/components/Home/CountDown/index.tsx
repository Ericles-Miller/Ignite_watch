import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "..";


export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed 
  } = useContext(CyclesContext); // chamo o context que foi criado 
  
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {

    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference =  differenceInSeconds(new Date(), activeCycle.startDate);
        
        if(secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()           
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        }
        else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval);
    }
  }, [activeCycle,totalSeconds, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60); // arredonda o valor para baixo
  const secondsAmount = currentSeconds % 60; // resto da divisao 

  const minutes = String(minutesAmount).padStart(2, '0'); // faco com que a string tenha 2 posicoes
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle])


  return(
    <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator> 
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}