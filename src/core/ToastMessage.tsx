import React, { PureComponent } from "react";
import { IBaseComponentProps } from "../BaseComponent";
import { MessageType } from "../enum";

export interface IToastMessageProps extends IBaseComponentProps {
    message: string;
    type: MessageType;
}

export interface IToastMessageState {
}

export class ToastMessage extends PureComponent<IToastMessageProps, IToastMessageState> {

    private timer;
    private delay = 2000;

    constructor(props: IToastMessageProps) {
        super(props);
    }

    public render() {
        const message = this.props.message ? this.getToast() : null;
        if (message) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.setState({ message: null });
            }, this.delay);
            return <div className="toast-wrapper">{message}</div>;
        }
        return null;
    }

    private getToast() {
        let className = "info";
        switch (this.props.type) {
            case MessageType.Warning:
                className = "warning";
                break;
            case MessageType.Error:
                className = "error";
                break;
            case MessageType.Success:
                className = "success";
                break;
        }
        className = `toast type-${className}`;
        return <div className={className}>{this.props.message}</div>;
    }
}
