import { ThemeProvider } from "styled-components";

import { defautTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/themes/global";

export function App() {
	return (
		<ThemeProvider theme={defautTheme}>
			<h1>Hello</h1>

			<GlobalStyle />
		</ThemeProvider>
	);
}
