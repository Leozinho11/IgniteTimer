import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton} from "./styles";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Zod, * as zod from 'zod';
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm/Index";
import { Countdown } from "./components/Countdown/Index";
import { CyclesContext } from "../../contexts/CyclesContexts";


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: Zod.number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser no máximo de 60 minutos')
})

type NewCicleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){
    
    const { activeCycle, createNewCicle, interruptCurrentCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCicleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const {handleSubmit, watch, reset} = newCycleForm

    function handleCreateNewCicle(data: NewCicleFormData) {
        createNewCicle(data)
        reset()
    }

    const task = watch('task')
    const isSubmitDisabled = !task;


    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCicle)} action="">
               
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />

            { activeCycle ? (
                <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                <HandPalm size={24} />
                Interromper
                </StopCountdownButton>
            ) : (
                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                <Play size={24} />
                Começar
                </StartCountdownButton>
            )
            }

        </form>
        </HomeContainer>
    )
}