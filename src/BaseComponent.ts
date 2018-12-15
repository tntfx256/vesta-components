import { ITheme } from "@vesta/theme";
import { ReactNode } from "react";

export interface IBaseComponentProps {
    theme?: ITheme;
    children?: ReactNode;
    classes?: any;
    className?: string;
}

// export interface IBaseComponentWithRouteProps<T> extends IBaseComponentProps {
//     history: History;
//     location: Location;
//     match: match<T>;
// }

export interface IWithTransition {
    enter?: number;
    leave?: null;
}