import { Play } from "phosphor-react";
import {
	CountDownContainer,
	FormContainer,
	HomeContainer,
	Separator,
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
					yar<span>0</span>
					<span>0</span>
					<Separator>:</Separator>
					<span>0</span>
					<span>0</span>
				</CountDownContainer>

				<button type="submit">
					<Play size={24} />
					START
				</button>
			</form>
		</HomeContainer>
	);
}