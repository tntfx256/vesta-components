import React, { ComponentType } from "react";
import { IBaseComponentProps } from "../BaseComponent";

interface IconProps extends IBaseComponentProps {
    className?: string;
    name: string;
    onClick?: (e) => void;
    size?: string;
}

export const Icon: ComponentType<IconProps> = ((props: IconProps) => {

    const classNames = [];
    if (props.className) {
        classNames.push(props.className);
    }
    if (props.size) {
        classNames.push(props.size);
    }

    return name ? <span className={`icon ${classNames.join(" ")}`} onClick={props.onClick}>{name}</span> : null;

});
