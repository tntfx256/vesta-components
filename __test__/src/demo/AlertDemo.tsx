import React, { FC } from "react";
import { Alert, Grid, MessageType } from "../components";

interface IAlertDemoProps { }

export const AlertDemo: FC<IAlertDemoProps> = (props: IAlertDemoProps) => {

    return (
        <div>
            <Alert>Withoutn Type</Alert>
            <Alert type={MessageType.Success}>Success Alert Type</Alert>
            <Alert type={MessageType.Info}>Information Alert Type</Alert>
            <Alert type={MessageType.Warning}>Warning Alert Type</Alert>
            <Alert type={MessageType.Error}>Error Alert Type</Alert>
        </div>
    );
};
