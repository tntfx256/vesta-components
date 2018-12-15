import React, { PureComponent } from "react";
import { IBaseComponentProps } from "../BaseComponent";

interface IconProps extends IBaseComponentProps {
    className?: string;
    name: string;
    onClick?: (e) => void;
    size?: string;
}

interface IEmptyState { }

export class Icon extends PureComponent<IconProps, IEmptyState> {

    public render() {
        const { name, size, onClick, className = "" } = this.props;
        const sizeClass = size ? `size-${size}` : "";

        return (
            <span className={`icon ${sizeClass} ${className}`} onClick={onClick}>{name}</span>
        );
    }
}
