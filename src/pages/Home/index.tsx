import { HandPalm, Play } from "phosphor-react";

import { differenceInSeconds } from "date-fns";

import {
	HomeContainer,
	StartCountDownButton,
	StopCountDownButton,
} from "./styles";

import { createContext, useEffect, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";

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
	markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCyrcleid] = useState<string | null>(null);

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

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

	// function handleNewCreateCicle(data: NewCicleFormData) {
	// 	const newCycle: Cycle = {
	// 		id: String(new Date().getTime()),
	// 		task: data.task,
	// 		minutesAmount: data.minutesAmount,
	// 		startDate: new Date(),
	// 	};

	// 	setCycles((state) => [...state, newCycle]);
	// 	setActiveCyrcleid(newCycle.id);
	// 	setAmountSecondsPassed(0);

	// 	reset();
	// }

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

	// const task = watch("task");
	// const isButtonDisabled = !task;

	return (
		<HomeContainer>
			<form /*onSubmit={handleSubmit(handleNewCreateCicle)}*/ action="">
				<CyclesContext.Provider
					value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}
				>
					{/* <NewCycleForm /> */}
					<CountDown />
				</CyclesContext.Provider>

				{activeCycle ? (
					<StopCountDownButton onClick={handleInterruptCycle}>
						<HandPalm size={24} />
						INTERROMPER
					</StopCountDownButton>
				) : (
					<StartCountDownButton /*disabled={isButtonDisabled}*/ type="submit">
						<Play size={24} />
						START
					</StartCountDownButton>
				)}
			</form>
		</HomeContainer>
	);
}
