import { Dispatcher } from "@vesta/core";
import React, { PureComponent } from "react";
import { IBaseComponentProps } from "../BaseComponent";

export interface IToastMessageProps extends IBaseComponentProps {
}

export interface IToastMessageState {
    message: string;
    type: "info" | "warning" | "error";
}

export class ToastMessage extends PureComponent<IToastMessageProps, IToastMessageState> {

    private timer: number = 0;
    private delay = 2000;

    constructor(props: IToastMessageProps) {
        super(props);
        this.state = { message: "", type: "info" };
    }

    public componentDidMount() {
        Dispatcher.getInstance().register<any>("toast", (payload) => {
            this.setState({ message: payload.message, type: payload.type });
            return false;
        });
    }

    public render() {
        const message = this.state.message ? this.getToast() : null;
        if (message) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.setState({ message: "" });
            }, this.delay);
            return <div className="toast-wrapper">{message}</div>;
        }
        return null;
    }

    private getToast() {
        let className = "info";
        className = `toast type-${className}`;
        return <div className={className}>{this.state.message}</div>;
    }
}
