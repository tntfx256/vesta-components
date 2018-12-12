import { History, Location } from "history";
import { ReactNode } from "react";

export interface IBaseComponentProps {
    children?: ReactNode;
    classes?: any;
    className?: string;
}

export interface IBaseComponentWithRouteProps<T> extends IBaseComponentProps {
    history: History;
    location: Location;
}