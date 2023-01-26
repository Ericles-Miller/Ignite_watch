import { useFormContext } from "react-hook-form";
import { FormContainer, MinuteAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const {register} = useFormContext()
  
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em </label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome ao seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Project 1" />
        <option value="Project 2" />
        <option value="Project 3" />
        <option value="banana" />
      </datalist>

      <label htmlFor="">Durante</label>
      <MinuteAmountInput
        placeholder="00"
        type="number"
        id="minutesAmount"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos</span>
    </FormContainer>
  )
}