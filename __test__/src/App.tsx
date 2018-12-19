import { createTheme } from "@vesta/theme";
import React, { FC } from "react";
import { HashRouter, Route } from "react-router-dom";
import { ThemeProvider } from "theming";
import { ActionsheetDemo } from "./demo/ActionsheetDemo";
import { AlertDemo } from "./demo/AlertDemo";
import { ButtonDemo } from "./demo/ButtonDemo";
import { Demo } from "./demo/Demo";

interface IAppProps { }

export const App: FC<IAppProps> = (props: IAppProps) => {

  const theme = createTheme({});
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>

        <Demo>

          <Route path="/actionsheet" component={ActionsheetDemo} />
          <Route path="/alert" component={AlertDemo} />
          <Route path="/button" component={ButtonDemo} />

        </Demo>

      </HashRouter>
    </ThemeProvider>
  );

};
