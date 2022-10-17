import styled from "styled-components";
import { defautTheme } from "../styles/themes/default";

type ThemeType = typeof defautTheme;

declare module "styled-components" {
	export interface DefautTheme extends ThemeType {}
}
