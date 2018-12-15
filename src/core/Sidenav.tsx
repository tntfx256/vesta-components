import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { IBaseComponentProps, IWithTransition } from "../BaseComponent";
import Navbar, { NavBarMainButtonType } from "./Navbar";

interface ISideNavProps extends IBaseComponentProps, IWithTransition {
    open?: boolean;
    onChange?: (isOpen: boolean) => void;
}

interface ISideNavState {
}

export class Sidenav extends Component<ISideNavProps, ISideNavState> {
    public name = "";

    constructor(props: ISideNavProps) {
        super(props);
        this.state = {};
    }

    public render() {
        let navContent = null;
        const { enter = 100, leave = 100 } = this.props;
        if (this.props.open) {
            navContent = <aside className="sidenav-component">
                <Navbar className="navbar-transparent" backAction={this.close}
                    mainButtonType={NavBarMainButtonType.Close} />
                <div onClick={this.close} className="sidenav-backdrop">&nbsp;</div>
                <div className="sidenav">{this.props.children}</div>
            </aside>;
        }
        return (
            <ReactCSSTransitionGroup transitionName="sidenav" transitionEnterTimeout={enter / 2}
                transitionLeaveTimeout={leave / 2}>
                {navContent}
            </ReactCSSTransitionGroup>
        );
    }

    private close = () => {
        if (this.props.onChange) {
            this.props.onChange(false);
        }
    }

    private open = () => {
        if (this.props.onChange) {
            this.props.onChange(true);
        }
    }
}
