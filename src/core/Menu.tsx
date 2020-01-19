import React, { ComponentType, MouseEvent, ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import { IComponentProps } from "../BaseComponent";
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

export interface IMenuProps extends IComponentProps {
    horizontal?: boolean;
    items: IMenuItem[];
    name?: string;
    onItemSelect?: (id: string) => void;
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
        const links: ReactNode[] = [];
        for (let i = 0, il = routeItems.length; i < il; ++i) {
            const item: IMenuItem = routeItems[i];
            let childItems = [];
            if (item.children) {
                childItems = renderMenuItems(item.children, item.link || "");
            }
            if (!item.hidden) {
                const basePath = prefix ? `/${prefix}` : "";

                const classNames = ["menu-item", item.disabled ? "disabled" : ""];
                const itemComponent = item.link ?
                    (<NavLink to={`${basePath}/${item.link}`} activeClassName="active">
                        <span><Icon name={item.icon as string} /> {item.title}</span>
                    </NavLink>) :
                    <a data-id={item.id}><span><Icon name={item.icon as string} /> {item.title}</span></a>;

                if (item.children) {
                    classNames.push("has-children menu-hidden");
                }

                links.push(
                    <li data-id={item.id} key={keyCounter++} className={classNames.join(" ")}
                        onClick={onItemClick}>
                        {itemComponent}
                        {childItems.length ? <ul>{childItems}</ul> : null}
                    </li>);
            }

        }
        return links;
    }

    function onItemClick(e: MouseEvent<HTMLElement>) {
        e.preventDefault();
        e.stopPropagation();
        const element = e.currentTarget;
        if (element.classList.contains("has-children")) {
            return element.classList.toggle("menu-hidden");
        }
        const id = e.currentTarget.getAttribute("data-id");
        const { onItemSelect } = props;
        if (onItemSelect) {
            onItemSelect(id as string);
        }
        setUpdate(!update);
    }
});

Menu.defaultProps = {
    horizontal: false,
};
