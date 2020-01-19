import React, { ComponentType, useEffect, useState } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { IComponentProps, IWithTransition } from "../BaseComponent";
export interface ISideNavProps extends IComponentProps, IWithTransition {
    breakWidth?: number;
    open?: boolean;
    onChange?: (isOpen: boolean) => void;
}

export const Sidenav: ComponentType<ISideNavProps> = (props: ISideNavProps) => {

    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", onWindowResize);
        return () => window.removeEventListener("resize", onWindowResize);
    }, []);

    let resizeTimer = null;
    let navContent = null;
    const { enter = 100, leave = 100, open, breakWidth } = props;
    const isStatic = breakWidth && width > breakWidth;

    if (open || isStatic) {
        navContent = (
            <aside className={`sidenav-component ${isStatic ? "sidenav-static" : ""}`}>
                <div onClick={onClose} className="sidenav-backdrop">&nbsp;</div>
                <div className="sidenav">{props.children}</div>
            </aside>);
    }

    if (isStatic) {
        return navContent;
    }

    return (
        <ReactCSSTransitionGroup transitionName="sidenav" transitionEnterTimeout={enter / 2}
            transitionLeaveTimeout={leave / 2}>
            {navContent}
        </ReactCSSTransitionGroup>
    );

    function onClose() {
        if (props.onChange) {
            props.onChange(false);
        }
    }

    function onOpen() {
        if (props.onChange) {
            props.onChange(true);
        }
    }

    function onWindowResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            setWidth(window.innerWidth);
        }, 300);
    }
}
