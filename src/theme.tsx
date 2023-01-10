import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Children } from "./design-system";

export default function CustomTheme(props: { children: Children }) {
  let theme = createTheme();
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
