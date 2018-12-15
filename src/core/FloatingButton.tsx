import React, { MouseEventHandler, PureComponent } from "react";
import { IBaseComponentProps } from "../BaseComponent";

interface IFloatingButtonProps extends IBaseComponentProps {
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface IEmptyState { }

export class FloatingButton extends PureComponent<IFloatingButtonProps, IEmptyState> {

    public render() {
        const { className, onClick, children } = this.props;

        return (
            <div className={`floating-btn ${className}`}>
                <button type="button" onClick={onClick}>{children}</button>
            </div>
        );
    }
}
