import { HandPalm, Play } from "phosphor-react";

import {
	HomeContainer,
	StartCountDownButton,
	StopCountDownButton,
} from "./styles";

import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { FormProvider, useForm } from "react-hook-form";

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
}

interface CyclesContextType {
	activeCycle: Cycle | undefined;
	activeCycleId: string | null;
	amountSecondsPassed: number;
	markCurrentCycleAsFinished: () => void;
	setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

const newCicleFormValidateSchema = zod.object({
	task: zod.string().min(5, "Informe uma Taks"),
	minutesAmount: zod.number().min(1).max(60),
});

interface NewCicleFormData {
	task: string;
	minutesAmount: number;
}

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCyrcleid] = useState<string | null>(null);
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

	const newCycleForm = useForm<NewCicleFormData>({
		resolver: zodResolver(newCicleFormValidateSchema),
		defaultValues: {
			task: "",
			minutesAmount: 0,
		},
	});

	const { handleSubmit, watch, reset } = newCycleForm;

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	function setSecondsPassed(seconds: number) {
		setAmountSecondsPassed(seconds);
	}

	function markCurrentCycleAsFinished() {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, finishedDate: new Date() };
				} else {
					return cycle;
				}
			})
		);
	}

	function handleNewCreateCicle(data: NewCicleFormData) {
		const newCycle: Cycle = {
			id: String(new Date().getTime()),
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};

		setCycles((state) => [...state, newCycle]);
		setActiveCyrcleid(newCycle.id);
		setAmountSecondsPassed(0);

		reset();
	}

	function handleInterruptCycle() {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, interruptedDate: new Date() };
				} else {
					return cycle;
				}
			})
		);

		setActiveCyrcleid(null);
	}

	const task = watch("task");
	const isButtonDisabled = !task;

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleNewCreateCicle)} action="">
				<CyclesContext.Provider
					value={{
						activeCycle,
						activeCycleId,
						amountSecondsPassed,
						markCurrentCycleAsFinished,
						setSecondsPassed,
					}}
				>
					<FormProvider {...newCycleForm}>
						<NewCycleForm />
					</FormProvider>
					<CountDown />
				</CyclesContext.Provider>

				{activeCycle ? (
					<StopCountDownButton onClick={handleInterruptCycle}>
						<HandPalm size={24} />
						INTERROMPER
					</StopCountDownButton>
				) : (
					<StartCountDownButton disabled={isButtonDisabled} type="submit">
						<Play size={24} />
						START
					</StartCountDownButton>
				)}
			</form>
		</HomeContainer>
	);
}
