import { createTheme } from "@vesta/theme";
import React, { FC } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "theming";
import { ButtonDemo } from "./demo/ButtonDemo";
import { Demo } from "./demo/Demo";

interface IAppProps { }

export const App: FC<IAppProps> = (props: IAppProps) => {

  const theme = createTheme({});
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>

        <Demo>
          <Switch>
            <Route link="button" component={ButtonDemo} />
          </Switch>
        </Demo>

      </HashRouter>
    </ThemeProvider>
  );

};
