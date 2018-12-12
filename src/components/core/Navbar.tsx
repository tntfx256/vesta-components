import React, { MouseEvent, ComponentType } from "react";
import { withRouter } from "react-router";
import { IBaseComponentWithRouteProps } from "../BaseComponent";
import { Burger } from "./Burger";

export enum NavbarMainButtonType { Burger = 1, Back, Close }

interface INavbarProps extends IBaseComponentWithRouteProps<any> {
    title?: string;
    backLink?: string;
    showBurger?: boolean;
    hide?: boolean;
    mainButtonType?: NavbarMainButtonType;
    backAction?: (e: MouseEvent<HTMLElement>) => void;
}

function Navbar(props: INavbarProps) {

    if (props.hide) { return null; }
    let btnClassName = "back-btn";
    if (props.mainButtonType == NavbarMainButtonType.Close) {
        btnClassName = "close-btn";
    }
    const navBtn = (props.showBurger || location.pathname == "/") && !props.backLink && !props.backAction ?
        <Burger className="nav-btn" event="main-sidenav-toggle" /> :
        <Burger className={`nav-btn ${btnClassName}`} onClick={goBack} />;

    return (
        <div className={`navbar ${props.className}`}>
            {navBtn}
            <p className="nav-title">{props.title || ""}</p>
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
        if (props.backLink) { return props.history.replace(props.backLink); }
        if (history.length) { return props.history.goBack(); }
        props.history.replace("/");
    }
}

export default withRouter<any>(Navbar as ComponentType<INavbarProps>);
