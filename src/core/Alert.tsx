import React, { ComponentType } from "react";
import { withTheme } from "theming";
import { IBaseComponentProps } from "../BaseComponent";
import { MessageType } from "../enum";

interface IAlertProps extends IBaseComponentProps {
    type?: MessageType;
}

export const Alert: ComponentType<IAlertProps> = withTheme((props: IAlertProps) => {

    return (
        <p className={`alert alert-${MessageType[props.type as number]}`}>
            {props.children}
        </p>
    );
});

Alert.defaultProps = {
    type: MessageType.Info,
};
