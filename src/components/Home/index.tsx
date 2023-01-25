import { HandPalm, Play } from "phosphor-react";
import * as zod from 'zod';
import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns';
import { CountDown } from "./CountDown";
import { NewCycleForm } from "./NewCycleForm";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptDate: new Date() }
        }
        else {
          return cycle
        }
      }),
    )
  }

  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const id = String(new Date().getTime());

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }

  //   setCycles((state) => [...state, newCycle]);
  //   setActiveCycleId(id);
  //   setAmountSecondsPassed(0);
  // }

  function handleInterruptCycle() {
    setActiveCycleId(null);


  }

  // const task = watch('task');
  // const isSubmitDisable = !task;

  return (
    <HomeContainer>
      <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/action="">
        <CyclesContext.Provider 
          value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}}
        >

        {/* <NewCycleForm /> */}
        <CountDown />
        </CyclesContext.Provider>

        {activeCycle ? (

          <StopCountDownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton /*disabled={isSubmitDisable}*/ type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}