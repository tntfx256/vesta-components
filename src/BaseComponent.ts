import { ReactNode } from "react";

export interface IComponentProps {
  children?: ReactNode;
  classes?: any;
  className?: string;
}

export interface IWithTransition {
  enter?: number;
  leave?: number;
}
