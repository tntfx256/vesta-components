import { Dispatcher } from "@vesta/core";
import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { IBaseComponentProps } from "../BaseComponent";
import Navbar, { NavbarMainButtonType } from "./Navbar";

export interface ISideNavProps extends IBaseComponentProps {
    enterDuration?: number;
    leaveDuration?: number;
    name: string;
}

export interface ISideNavState {
    open: boolean;
}

export class Sidenav extends Component<ISideNavProps, ISideNavState> {
    public name = "";
    private dispatcher = Dispatcher.getInstance();

    constructor(props: ISideNavProps) {
        super(props);
        this.state = { open: false };
    }

    public close = () => {
        this.setState({ open: false });
        (document.documentElement as HTMLElement).classList.remove("sidenav-open");
    }

    public open = () => {
        this.setState({ open: true });
        (document.documentElement as HTMLElement).classList.add("sidenav-open");
    }

    public toggle = () => {
        this.state.open ? this.close() : this.open();
    }

    public componentWillMount() {
        const name = this.props.name;
        this.dispatcher.register(`${name}-toggle`, this.toggle);
        this.dispatcher.register(`${name}-open`, this.open);
        this.dispatcher.register(`${name}-close`, this.close);
    }

    public render() {
        let navContent = null;
        const { enterDuration = 100, leaveDuration = 100 } = this.props;
        if (this.state.open) {
            navContent = <aside className="sidenav-component">
                <Navbar className="navbar-transparent" backAction={this.close}
                    mainButtonType={NavbarMainButtonType.Close} />
                <div onClick={this.close} className="sidenav-backdrop">&nbsp;</div>
                <div className="sidenav">{this.props.children}</div>
            </aside>;
        }
        return (
            <ReactCSSTransitionGroup transitionName="sidenav" transitionEnterTimeout={enterDuration / 2}
                transitionLeaveTimeout={leaveDuration / 2}>
                {navContent}
            </ReactCSSTransitionGroup>
        );
    }
}
