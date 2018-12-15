import React, { PureComponent } from "react";
import { IBaseComponentProps } from "../BaseComponent";

interface IAlertProps extends IBaseComponentProps {
    type?: string;
}

interface IEmptyState { }

export class Alert extends PureComponent<IAlertProps, IEmptyState> {

    public render() {
        const { type, children } = this.props;

        return (
            <p className={`alert alert-${type}`}>
                {children}
            </p>
        );
    }
}
