import React, { MouseEvent } from "react";
import { IBaseComponentProps } from "../BaseComponent";

export interface IconProps extends IBaseComponentProps {
    name: string;
    size?: string;
    onClick?: (e: MouseEvent) => void;
}

export function Icon(props: IconProps) {

    let className = "icon";
    className += props.size ? ` size-${props.size}` : "";
    className += props.className ? ` ${props.className}` : ""

    return Icon.useClassName ?
        <span className={`${className} icon-${props.name}`} onClick={props.onClick} /> :
        <span className={className} onClick={props.onClick}>{props.name}</span>;
}

Icon.useClassName = true;

