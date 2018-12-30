import React, { ComponentType, MouseEvent, useState } from "react";
import { IComponentProps } from "../BaseComponent";
import { MessageType } from "../MessageType";

interface IToastMessageProps extends IComponentProps {
    message: string;
    type?: MessageType;
    duration?: number;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
    onClose?: () => void;
}

export const ToastMessage: ComponentType<IToastMessageProps> = ((props: IToastMessageProps) => {

    let timer;
    const delay = 2000;
    const [, setUpdate] = useState(false);
    const message = props.message ? getToast() : null;
    if (!message) { return null; }
    clearTimeout(timer);
    timer = setTimeout(onClose, delay);
    return <div className="toast-wrapper" onClick={onClick}>{message}</div>;

    function onClose() {
        if (props.onClose) {
            props.onClose();
        } else {
            setUpdate(true);
        }
    }

    function onClick(e: MouseEvent<HTMLElement>) {
        if (props.onClick) {
            props.onClick(e);
        }
    }

    function getToast() {
        let className = "info";
        switch (props.type) {
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
        return <div className={className}>{props.message}</div>;
    }
});

ToastMessage.defaultProps = {
    duration: 4500,
};
