import React, { FC, MouseEvent } from "react";
import { Button, Grid } from "../components";

interface IButtonDemoProps { }

export const ButtonDemo: FC<IButtonDemoProps> = (props: IButtonDemoProps) => {

    return (
        <Grid justify="space-evenly">
            <Button onClick={onClick}>Normal</Button>
            <Button onClick={onClick} color="default">Default</Button>
            <Button onClick={onClick} color="primary">Primary</Button>
            <Button onClick={onClick} color="secondary">Primary</Button>
            <Button onClick={onClick} variant="outlined">Outline</Button>
        </Grid>
    );

    function onClick(e: MouseEvent<HTMLElement>) {
        // tslint:disable-next-line:no-console
        console.log(e.currentTarget);
    }
};
