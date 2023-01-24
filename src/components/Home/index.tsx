import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinuteAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { ZodParsedType } from "zod/lib";

const newCycleFormValidationSchema = zod.object({   //  defino que o zod recebe um object com suas definicoes de validacao
  task: zod.string().min(1,'Informe a tarefa'),
  minutesAmount: zod.number()
  .min(5,  'O ciclo precisa ser de no mínimo 5 minutos')
  .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // esse processo tambem funcionaria com uma interface 

export function Home() {
  const {register, handleSubmit, watch} = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema), // recebo a validacao do form
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });
    
  function handleCreateNewCycle(data: any) {
    console.log(data);
  }

  const task = watch('task');
  const isSubmitDisable = !task;
  
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome ao seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Project 1"/>
            <option value="Project 2"/>
            <option value="Project 3"/>
            <option value="banana"/>
          </datalist>

          <label htmlFor="">Durante</label>
          <MinuteAmountInput 
            placeholder="00"
            type="number"
            id="minutesAmount"
            step={5}
            min={5}
            //max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
           />

          <span>minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        
        <StartCountDownButton disabled={isSubmitDisable}  type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}