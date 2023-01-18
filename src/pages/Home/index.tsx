import { Play } from "phosphor-react";
import {
	CountDownContainer,
	FormContainer,
	HomeContainer,
	Separator,
	StartCountDownButton,
} from "./styles";

export function Home() {
	return (
		<HomeContainer>
			<form action="">
				<FormContainer>
					<label htmlFor="taks">Vou trabalhar em</label>
					<input id="task" />

					<label htmlFor="minutesAmount">Durante</label>
					<input type="number" id="minutesAmount" />

					<span>minutos.</span>
				</FormContainer>

				<CountDownContainer>
					<span>0</span>
					<span>0</span>
					<Separator>:</Separator>
					<span>0</span>
					<span>0</span>
				</CountDownContainer>

				<StartCountDownButton type="submit">
					<Play size={24} />
					START
				</StartCountDownButton>
			</form>
		</HomeContainer>
	);
}
