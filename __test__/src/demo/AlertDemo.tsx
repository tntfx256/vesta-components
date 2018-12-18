import React, { FC } from "react";
import { Alert, Grid } from "../components";

interface IAlertDemoProps { }

export const AlertDemo: FC<IAlertDemoProps> = (props: IAlertDemoProps) => {

    return (
        <Grid justify="space-evenly">
            <Alert>Withoutn Type</Alert>
            <Alert>Success Alert Type</Alert>
            <Alert>Information Alert Type</Alert>
            <Alert>Warning Alert Type</Alert>
            <Alert>Error Alert Type</Alert>
        </Grid>
    );
};
