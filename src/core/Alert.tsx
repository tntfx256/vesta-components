import React, { ComponentType } from "react";
import { withTheme } from "theming";
import { IBaseComponentProps } from "../BaseComponent";

interface IAlertProps extends IBaseComponentProps {
    type?: string;
}

export const Alert: ComponentType<IAlertProps> = withTheme((props: IAlertProps) => {

    return (
        <p className={`alert alert-${props.type}`}>
            {props.children}
        </p>
    );
});
