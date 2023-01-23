import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import {
	CountDownContainer,
	FormContainer,
	HomeContainer,
	MinutesAmountInput,
	Separator,
	StartCountDownButton,
	TaskInput,
} from "./styles";
import { useState } from "react";

const newCicleFormValidateSchema = zod.object({
	task: zod.string().min(1, "Informe uma Taks"),
	minutesAmount: zod.number().min(5).max(60),
});

interface NewCicleFormData {
	task: string;
	minutesAmount: number;
}

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
}

export function Home() {
	const [cycles, setCycle] = useState<Cycle[]>([]);
	const [activeCyclesId, setActiveCyrcleid] = useState<string | null>(null);
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

	const { register, handleSubmit, watch, reset } = useForm<NewCicleFormData>({
		resolver: zodResolver(newCicleFormValidateSchema),
		defaultValues: {
			task: "",
			minutesAmount: 0,
		},
	});

	function handleNewCreateCicle(data: NewCicleFormData) {
		const newCycle: Cycle = {
			id: String(new Date().getTime()),
			task: data.task,
			minutesAmount: data.minutesAmount,
		};

		setCycle((state) => [...state, newCycle]);
		setActiveCyrcleid(newCycle.id);

		reset();
	}

	const activeCycle = cycles.find((cycle) => cycle.id === activeCyclesId);

	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
	const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

	const minutesAmount = Math.floor(currentSeconds / 60);
	const secondAmount = currentSeconds % 60;

	const minutes = String(minutesAmount).padStart(2, "0");
	const seconds = String(secondAmount).padStart(2, "0");

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
						min={5}
						max={60}
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

				<StartCountDownButton disabled={isButtonDisabled} type="submit">
					<Play size={24} />
					START
				</StartCountDownButton>
			</form>
		</HomeContainer>
	);
}
