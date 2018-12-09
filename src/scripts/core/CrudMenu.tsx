import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { IBaseComponentProps } from "../BaseComponent";
import { Icon } from "./Icon";

export interface ICrudMenuProps extends IBaseComponentProps {
    path: string;
    hasAddAccess?: boolean;
}

export class CrudMenu extends PureComponent<ICrudMenuProps, null> {

    public render() {
        let key = 1;
        const { hasAddAccess, path } = this.props;
        const links = [<li key={key++}><Link to={`/${path}`}><Icon name="list" /></Link></li>];
        if (hasAddAccess) {
            links.push(<li key={key}><Link to={`/${path}/add`}><Icon name="add" /></Link></li>);
        }
        return (
            <div className="crud-menu-component">
                <ul>{links}</ul>
            </div>
        );
    }
}
