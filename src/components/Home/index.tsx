import { HandPalm, Play } from "phosphor-react";
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useContext } from "react";
import { CountDown } from "./CountDown";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { FormProvider,useForm } from "react-hook-form";
import { NewCycleForm } from "./NewCycleForm";
import { CyclesContext } from "../../contexts/CyclesContext";


const newCycleFormValidationSchema = zod.object({   //  defino que o zod recebe um object com suas definicoes de validacao
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // esse processo tambem funcionaria com uma interface 

export function Home() {

  const {activeCycle, createNewCycle, interruptCurrentCycle} = useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema), // recebo a validacao do form
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });

  const { handleSubmit, watch, reset} = newCycleForm;

  const task = watch('task');
  const isSubmitDisable = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}action="">
      <FormProvider {...newCycleForm}> 
        <NewCycleForm />
      </FormProvider>
      <CountDown />

        {activeCycle ? (

          <StopCountDownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}

