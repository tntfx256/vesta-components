import React, { FC } from "react";
import { Grid, IBaseComponentProps, IMenuItem, Menu } from "../components";

interface IDemoProps extends IBaseComponentProps { }

export const Demo: FC<IDemoProps> = (props: IDemoProps) => {

    const components = ["actionsheet", "alert", "button"];
    const menuItems: IMenuItem[] = components.map((c, i) => ({ id: c, title: c, link: c }));

    return (
        <Grid>
            <Grid>
                <Menu items={menuItems} horizontal={false} onItemSelect={onMenuItemSelect} />
            </Grid>
            <Grid>
                {props.children}
            </Grid>
        </Grid>
    );

    function onMenuItemSelect(id: string) {
        // tslint:disable-next-line:no-console
        console.log(id);
    }
};
