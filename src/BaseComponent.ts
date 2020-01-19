import { ITheme } from "@vesta/theme";
import { ReactNode } from "react";

export interface IComponentProps {
    theme?: ITheme;
    children?: ReactNode;
    classes?: any;
    className?: string;
}

export interface IWithTransition {
    enter?: number;
    leave?: number;
}
