import React, { ComponentType } from "react";
import { Link } from "react-router-dom";
import { IBaseComponentProps } from "../BaseComponent";
import { Icon } from "./Icon";

interface ICrudMenuProps extends IBaseComponentProps {
    path: string;
    hasInsertAccess?: boolean;
}

export const CrudMenu: ComponentType<ICrudMenuProps> = ((props: ICrudMenuProps) => {

    let key = 1;
    const links = [<li key={key++}><Link to={`/${props.path}`}><Icon name="list" /></Link></li>];
    if (props.hasInsertAccess) {
        links.push(<li key={key}><Link to={`/${props.path}/add`}><Icon name="add" /></Link></li>);
    }
    return (
        <div className="crud-menu-component">
            <ul>{links}</ul>
        </div>
    );
});