import React, { ComponentType, MouseEvent } from "react";
import { IBaseComponentProps } from "../BaseComponent";

interface IconProps extends IBaseComponentProps {
    className?: string;
    name: string;
    size?: string;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export const Icon: ComponentType<IconProps> = ((props: IconProps) => {

    if (!props.name) { return null; }

    const classNames = [];
    if (props.className) {
        classNames.push(props.className);
    }
    if (props.size) {
        classNames.push(props.size);
    }

    return (Icon as any).useClassName ?
        <span className={`icon icon-${props.name} ${classNames.join(" ")}`} onClick={props.onClick} /> :
        <span className={`icon ${classNames.join(" ")}`} onClick={props.onClick}>{props.name}</span>;

});

(Icon as any).useClassName = true;
