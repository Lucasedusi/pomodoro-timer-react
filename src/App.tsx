import { ThemeProvider } from "styled-components";

import { defautTheme } from "./styles/themes/default";

export function App() {
	return (
		<ThemeProvider theme={defautTheme}>
			<h1>Hello</h1>
		</ThemeProvider>
	);
}
