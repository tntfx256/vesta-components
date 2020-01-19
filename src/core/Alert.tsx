import React, { ComponentType } from "react";
import { IComponentProps } from "../BaseComponent";
import { MessageType } from "../MessageType";

export interface IAlertProps extends IComponentProps {
    type?: MessageType;
}

export const Alert: ComponentType<IAlertProps> = (props: IAlertProps) => {

    return (
        <p className={`alert alert-${MessageType[props.type as number]}`}>
            {props.children}
        </p>
    );
}

Alert.defaultProps = {
    type: MessageType.Info,
};
