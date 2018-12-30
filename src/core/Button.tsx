import React, { ComponentType, MouseEvent } from "react";
import { IComponentProps } from "../BaseComponent";

interface IButtonProps extends IComponentProps {
    disabled?: boolean;
    type?: "button" | "submit";
    variant?: "contained" | "outlined";
    color?: "primary" | "secondary" | "default";
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export const Button: ComponentType<IButtonProps> = (props: IButtonProps) => {

    const classNames = [];
    if (props.variant) {
        classNames.push(`btn-${props.variant}`);
    }
    if (props.color) {
        classNames.push(`btn-${props.color || "default"}`);
    }

    return (
        <button type={props.type || ""} disabled={props.disabled} className={`btn ${classNames.join(" ")}`}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
};
