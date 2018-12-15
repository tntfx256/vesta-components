import React, { ComponentType } from "react";
import { IBaseComponentProps } from "./BaseComponent";

interface IButtonProps extends IBaseComponentProps {
    type?: "button" | "submit";
    variant?: "outline";
    color?: "primary" | "secondary" | "default";
    disabled?: boolean;
}

export const Button: ComponentType<IButtonProps> = (props: IButtonProps) => {

    const classNames = [];
    if (props.variant) {
        classNames.push(`btn-${props.variant}`);
    }
    if (props.color) {
        classNames.push(`btn-${props.color}`);
    }

    return (
        <button type={props.type || null} disabled={props.disabled} className={`btn ${classNames.join(" ")}`}>
            {props.children}
        </button>
    );
};
