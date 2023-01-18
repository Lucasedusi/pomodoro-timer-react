import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
	return (
		<HistoryContainer>
			<h1>Meu Histórico</h1>

			<HistoryList>
				<table>
					<thead>
						<tr>
							<th>Tarefa</th>
							<th>Duration</th>
							<th>Início</th>
							<th>Status</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>Minha Tarefa</td>
							<td>20 minutos</td>
							<td>Há 2 meses</td>
							<td>
								<Status statusColor="green">Concluído</Status>
							</td>
						</tr>
						<tr>
							<td>Minha Tarefa</td>
							<td>20 minutos</td>
							<td>Há 2 meses</td>
							<td>
								<Status statusColor="yellon">Em Andamento</Status>
							</td>
						</tr>
						<tr>
							<td>Minha Tarefa</td>
							<td>20 minutos</td>
							<td>Há 2 meses</td>
							<td>
								<Status statusColor="red">Interrompido</Status>
							</td>
						</tr>
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	);
}
