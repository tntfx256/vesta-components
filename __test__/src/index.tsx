import { Culture } from "@vesta/culture";
import { UsDate, UsLocale } from "@vesta/culture-us";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

Culture.register(UsLocale, {}, UsDate);

ReactDOM.render(<App />, document.getElementById("root"));
