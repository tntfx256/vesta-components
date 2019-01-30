import React, { ComponentType, MouseEvent } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { withTheme } from "theming";
import { IComponentProps } from "../BaseComponent";
import { Burger } from "./Burger";

// export enum NavbarMainButtonType { Burger = 1, Back, Close }

interface INavbarParams { }

export interface INavbarProps extends IComponentProps, RouteComponentProps<INavbarParams> {
    className?: string;
    backLink?: string;
    title?: string;
    onBack?: (e: MouseEvent<HTMLElement>) => void;
    onClose?: (e: MouseEvent<HTMLElement>) => void;
    onBurgerClick?: (e: MouseEvent<HTMLElement>) => void;
}

const NavBar: ComponentType<INavbarProps> = withTheme((props: INavbarProps) => {

    let btnClassName = "";
    if (props.onClose) {
        btnClassName = "close-btn";
    }
    if (props.backLink || props.onBack) {
        btnClassName = "back-btn";
    }

    return (
        <div className={`navbar ${props.className}`}>
            <Burger className={`nav-btn ${btnClassName}`} onClick={onClick} />
            <p className="navbar-title">{props.title || ""}</p>
            <div className="navbar-btn-group">
                {props.children}
            </div>
        </div>
    );

    function onClick(e: MouseEvent<HTMLElement>) {
        if (e) {
            e.stopPropagation();
        }
        if (props.onClose) {
            return props.onClose(e);
        }
        if (props.onBack) {
            return props.onBack(e);
        }
        if (props.backLink) {
            return props.history.replace(props.backLink);
            }
        if (props.onBurgerClick) {
            props.onBurgerClick(e);
        }
    }
});

export const Navbar = withRouter(NavBar as ComponentType<INavbarProps>);
