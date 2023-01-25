import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { differenceInSeconds } from "date-fns";

import {
	CountDownContainer,
	FormContainer,
	HomeContainer,
	MinutesAmountInput,
	Separator,
	StartCountDownButton,
	StopCountDownButton,
	TaskInput,
} from "./styles";
import { useEffect, useState } from "react";

const newCicleFormValidateSchema = zod.object({
	task: zod.string().min(1, "Informe uma Taks"),
	minutesAmount: zod.number().min(1).max(60),
});

interface NewCicleFormData {
	task: string;
	minutesAmount: number;
}

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
}

export function Home() {
	const [cycles, setCycle] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCyrcleid] = useState<string | null>(null);
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

	const { register, handleSubmit, watch, reset } = useForm<NewCicleFormData>({
		resolver: zodResolver(newCicleFormValidateSchema),
		defaultValues: {
			task: "",
			minutesAmount: 0,
		},
	});

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

	useEffect(() => {
		let interval: number;

		if (activeCycle) {
			interval = setInterval(() => {
				const secondsDifference = differenceInSeconds(
					new Date(),
					activeCycle.startDate
				);

				if (secondsDifference >= totalSeconds) {
					setCycle((state) =>
						state.map((cycle) => {
							if (cycle.id === activeCycleId) {
								return { ...cycle, finishedDate: new Date() };
							} else {
								return cycle;
							}
						})
					);

					setAmountSecondsPassed(totalSeconds);

					clearInterval(interval);
				} else {
					setAmountSecondsPassed(secondsDifference);
				}
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [activeCycle, totalSeconds, activeCycleId]);

	function handleNewCreateCicle(data: NewCicleFormData) {
		const newCycle: Cycle = {
			id: String(new Date().getTime()),
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};

		setCycle((state) => [...state, newCycle]);
		setActiveCyrcleid(newCycle.id);
		setAmountSecondsPassed(0);

		reset();
	}

	function handleInterruptCycle() {
		setCycle((state) =>
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

	const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

	const minutesAmount = Math.floor(currentSeconds / 60);
	const secondAmount = currentSeconds % 60;

	const minutes = String(minutesAmount).padStart(2, "0");
	const seconds = String(secondAmount).padStart(2, "0");

	useEffect(() => {
		if (activeCycle) {
			document.title = `${minutes}:${seconds}`;
		}
	}, [minutes, seconds, activeCycle]);

	const task = watch("task");
	const isButtonDisabled = !task;

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleNewCreateCicle)} action="">
				<FormContainer>
					<label htmlFor="taks">Vou trabalhar em</label>
					<TaskInput
						id="task"
						list="task-suggestions"
						placeholder="Dê um nome para o seu projeto"
						disabled={!!activeCycle}
						{...register("task")}
					/>

					<datalist id="task-suggestions">
						<option value="Projeto 01"></option>
						<option value="Projeto 02"></option>
						<option value="Projeto 03"></option>
						<option value="Teste"></option>
					</datalist>

					<label htmlFor="minutesAmount">Durante</label>
					<MinutesAmountInput
						type="number"
						id="minutesAmount"
						placeholder="00"
						step={5}
						min={1}
						max={60}
						disabled={!!activeCycle}
						{...register("minutesAmount", { valueAsNumber: true })}
					/>

					<span>minutos.</span>
				</FormContainer>

				<CountDownContainer>
					<span>{minutes[0]}</span>
					<span>{minutes[1]}</span>
					<Separator>:</Separator>
					<span>{seconds[0]}</span>
					<span>{seconds[1]}</span>
				</CountDownContainer>

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
