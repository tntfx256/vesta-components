import React, { ComponentType, MouseEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { IBaseComponentProps } from "../BaseComponent";
import { Icon } from "./Icon";

export interface IMenuItem {
    abstract?: boolean;
    children?: IMenuItem[];
    disabled?: boolean;
    hidden?: boolean;
    icon?: string;
    id?: string;
    link?: string;
    title: string;
}

interface IMenuProps extends IBaseComponentProps {
    horizontal?: boolean;
    items: IMenuItem[];
    name?: string;
    onItemSelect?: (id?: string) => void;
}

interface IEmptyState { }

export const Menu: ComponentType<IMenuProps> = ((props: IMenuProps) => {

    let keyCounter = 1;

    const [update, setUpdate] = useState(true);
    const menuItems = renderMenuItems(props.items, "");
    const className = `menu ${name ? `${name}-menu` : ""} ${props.horizontal ? "menu-hr" : "menu-vr"}`;

    return (
        <nav className={className}>
            <ul>{menuItems}</ul>
        </nav>
    );

    function renderMenuItems(routeItems: IMenuItem[], prefix: string) {
        // const { onClick } = props;
        let links = [];
        const routeCount = routeItems.length;
        for (let i = 0, il = routeCount; i < il; ++i) {
            const item: IMenuItem = routeItems[i];
            if (!item.abstract && !item.hidden) {
                const basePath = prefix ? `/${prefix}` : "";

                const classNames = ["menu-item", item.disabled ? "disabled" : ""];
                const itemComponent = item.link ?
                    (<NavLink to={`${basePath}/${item.link}`} activeClassName="active">
                        <span><Icon name={item.icon} /> {item.title}</span>
                    </NavLink>) :
                    <a data-id={item.id}>{item.icon || null} {item.title}</a>;
                links.push(
                    <li data-id={item.id} key={keyCounter++} className={classNames.join(" ")}
                        onClick={onItemClick}>
                        {itemComponent}
                    </li>);
            }
            if (item.children) {
                links = links.concat(renderMenuItems(item.children, item.link));
            }
        }
        return links;
    }

    function onItemClick(e: MouseEvent<HTMLElement>) {
        e.preventDefault();
        e.stopPropagation();
        const id = e.currentTarget.getAttribute("data-id");
        const { onItemSelect } = props;
        if (onItemSelect) {
            onItemSelect(id);
        }
        setUpdate(!update);
    }
});

Menu.defaultProps = {
    horizontal: false,
};
