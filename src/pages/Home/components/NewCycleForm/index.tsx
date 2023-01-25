import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

const newCicleFormValidateSchema = zod.object({
	task: zod.string().min(1, "Informe uma Taks"),
	minutesAmount: zod.number().min(1).max(60),
});

interface NewCicleFormData {
	task: string;
	minutesAmount: number;
}

export function NewCycleForm() {
	const { register, handleSubmit, watch, reset } = useForm<NewCicleFormData>({
		resolver: zodResolver(newCicleFormValidateSchema),
		defaultValues: {
			task: "",
			minutesAmount: 0,
		},
	});

	return (
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
	);
}
