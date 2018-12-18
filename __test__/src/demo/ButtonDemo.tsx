import React, { FC, MouseEvent } from "react";
import { Button, Grid } from "../components";

interface IButtonDemoProps { }

export const ButtonDemo: FC<IButtonDemoProps> = (props: IButtonDemoProps) => {

    return (
        <Grid justify="space-evenly">
            <Button onClick={onClick}>Default</Button>
            <Button onClick={onClick} color="primary">Primary</Button>
            <Button onClick={onClick} color="primary" variant="outlined">Primary Outline</Button>
            <Button onClick={onClick} color="primary" variant="contained">Primary Containes</Button>
        </Grid>
    );

    function onClick(e: MouseEvent<HTMLElement>) {
        // tslint:disable-next-line:no-console
        console.log(e.currentTarget);
    }
};
