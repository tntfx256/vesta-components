import React, { PureComponent } from "react";
import { IBaseComponentProps } from "../BaseComponent";

interface IAlertProps extends IBaseComponentProps {
    type?: string;
}

interface IAlertState { }

export class Alert extends PureComponent<IAlertProps, IAlertState> {

    public render() {
        const { type, children } = this.props;

        return (
            <p className={`alert alert-${type}`}>
                {children}
            </p>
        );
    }
}
