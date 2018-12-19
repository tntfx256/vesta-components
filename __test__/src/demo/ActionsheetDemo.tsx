import React, { FC, useState } from "react";
import { Actionsheet, Button, IAction } from "../components";

interface IActionsheetDemoProps { }

export const ActionsheetDemo: FC<IActionsheetDemoProps> = (props: IActionsheetDemoProps) => {

    const [show, setVisible] = useState(false);
    const items: IAction[] = [
        { title: "Login", icon: "home" },
        { title: "Register", icon: "home" },
        { title: "Cancel", icon: "remove" },
    ];

    return (
        <div>
            <Button onClick={openActionsheet} color="primary" variant="contained">Toggle</Button>
            <Actionsheet actions={items} onClick={onClick} show={show} />
        </div>
    );

    function onClick(item: IAction) {
        // tslint:disable-next-line:no-console
        console.log(item);
        setVisible(false);
    }

    function openActionsheet() {
        setVisible(true);
    }
};
