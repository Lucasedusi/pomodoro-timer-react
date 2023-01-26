import { HandPalm, Play } from "phosphor-react";

import {
	HomeContainer,
	StartCountDownButton,
	StopCountDownButton,
} from "./styles";

import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { FormProvider, useForm } from "react-hook-form";
import { CyclesContext } from "../../context/CyclesContext";

const newCicleFormValidateSchema = zod.object({
	task: zod.string().min(5, "Informe uma Taks"),
	minutesAmount: zod.number().min(1).max(60),
});

interface NewCicleFormData {
	task: string;
	minutesAmount: number;
}

export function Home() {
	const { activeCycle, createNewCycle, interruptCurrentCycle } =
		useContext(CyclesContext);

	const newCycleForm = useForm<NewCicleFormData>({
		resolver: zodResolver(newCicleFormValidateSchema),
		defaultValues: {
			task: "",
			minutesAmount: 0,
		},
	});

	const { handleSubmit, watch, reset } = newCycleForm;

	const task = watch("task");
	const isButtonDisabled = !task;

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(createNewCycle)} action="">
				<FormProvider {...newCycleForm}>
					<NewCycleForm />
				</FormProvider>
				<CountDown />

				{activeCycle ? (
					<StopCountDownButton onClick={interruptCurrentCycle}>
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
