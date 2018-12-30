import { ITheme } from "@vesta/theme";
import { History } from "history";
import { ReactNode } from "react";
import { match } from "react-router";

export interface IComponentProps {
    theme?: ITheme;
    children?: ReactNode;
    classes?: any;
    className?: string;
}

export interface IRouteComponentProps<T> extends IComponentProps {
    history: History;
    location: Location;
    match: match<T>;
}

export interface IWithTransition {
    enter?: number;
    leave?: number;
}
