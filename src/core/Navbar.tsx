import React, { ComponentType, MouseEvent } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { withTheme } from "theming";
import { IBaseComponentProps } from "../BaseComponent";
import { Burger } from "./Burger";

export enum NavbarMainButtonType { Burger = 1, Back, Close }

interface INavbarParams { }

interface INavbarProps extends IBaseComponentProps, RouteComponentProps<INavbarParams> {
    title?: string;
    className?: string;
    backLink?: string;
    showBurger?: boolean;
    hide?: boolean;
    mainButtonType?: NavbarMainButtonType;
    handleBackEvent?: boolean;
    backAction?: (e: MouseEvent<HTMLElement>) => void;
    onBurgerClick?: (e: MouseEvent<HTMLElement>) => void;
}

const NavBar: ComponentType<INavbarProps> = withTheme((props: INavbarProps) => {

    const pathToExitApps = ["/"];

    if (props.hide) { return null; }
    let btnClassName = "back-btn";
    if (props.mainButtonType == NavbarMainButtonType.Close) {
        btnClassName = "close-btn";
    }
    const navBtn = (props.showBurger || location.pathname == "/") && !props.backLink && !props.backAction ?
        <Burger className="nav-btn" onClick={props.onBurgerClick} /> :
        <Burger className={`nav-btn ${btnClassName}`} onClick={goBack} />;

    return (
        <div className={`navbar ${props.className}`}>
            {navBtn}
            <p className="navbar-title">{props.title || ""}</p>
            <div className="navbar-btn-group">
                {props.children}
            </div>
        </div>
    );

    function goBack(e: MouseEvent<HTMLElement>) {
        if (e) {
            e.stopPropagation();
        }
        const { backAction } = props;
        if (backAction) {
            return backAction(e);
        }
        const { history, backLink } = props;
        if (backLink) { return history.replace(backLink); }
        if (props.handleBackEvent) {
            if (pathToExitApps.indexOf(props.location.pathname) >= 0) {
                return (navigator as any).app.exitApp();
            }
        }
        if (history.length) { return history.goBack(); }
        history.replace("/");
    }
});

export const Navbar = withRouter(NavBar as ComponentType<INavbarProps>);
