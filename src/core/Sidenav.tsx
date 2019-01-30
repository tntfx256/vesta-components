import React, { ComponentType } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { withTheme } from "theming";
import { IComponentProps, IWithTransition } from "../BaseComponent";

export interface ISideNavProps extends IComponentProps, IWithTransition {
    open?: boolean;
    onChange?: (isOpen: boolean) => void;
}

export const Sidenav: ComponentType<ISideNavProps> = withTheme((props: ISideNavProps) => {

    let navContent = null;
    const { enter = 100, leave = 100 } = props;
    if (props.open) {
        navContent = (
            <aside className="sidenav-component">
                <div onClick={close} className="sidenav-backdrop">&nbsp;</div>
                <div className="sidenav">{props.children}</div>
            </aside>);
    }
    return (
        <ReactCSSTransitionGroup transitionName="sidenav" transitionEnterTimeout={enter / 2}
            transitionLeaveTimeout={leave / 2}>
            {navContent}
        </ReactCSSTransitionGroup>
    );

    function close() {
        if (props.onChange) {
            props.onChange(false);
        }
    }

    function open() {
        if (props.onChange) {
            props.onChange(true);
        }
    }
});
