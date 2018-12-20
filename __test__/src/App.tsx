import { createTheme } from "@vesta/theme";
import React, { FC } from "react";
import { HashRouter, NavLink, Route } from "react-router-dom";
import { ThemeProvider } from "theming";
import { ActionsheetDemo } from "./demo/ActionsheetDemo";
import { AlertDemo } from "./demo/AlertDemo";
import { ButtonDemo } from "./demo/ButtonDemo";
import { FormDemo } from "./demo/FormDemo";

interface IAppProps { }

export const App: FC<IAppProps> = (props: IAppProps) => {

  const theme = createTheme({});
  const components = ["actionsheet", "alert", "button", "form"];
  const menuItems = components.map((c, i) => <li key={i}><NavLink to={c}>{c}</NavLink></li>);

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>

        <div>
          <ul>
            {menuItems}
          </ul>
          <div>
            <Route path="/actionsheet" component={ActionsheetDemo} />
            <Route path="/alert" component={AlertDemo} />
            <Route path="/button" component={ButtonDemo} />
            <Route path="/form" component={FormDemo} />
          </div>
        </div>

      </HashRouter>
    </ThemeProvider>
  );

};
